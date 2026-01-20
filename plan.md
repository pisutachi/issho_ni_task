# 技術設計（plan.md）

本書は「迷ったら従う」判断基準。Constitution と spec.md を優先する。

## ゴール（MVP）
- モバイルでの実績登録を10秒以内で完了できる導線。
- JST基準の周期境界（period_start <= t < period_end）を厳守。
- Supabase Auth + RLSで権限制御をDBで強制。
- Schema First（Zod）でAPI入出力と型を単一ソース化。

## 技術スタック（固定）
フロント:
- React + TypeScript + Vite
- MUI（Material UI）
- React Router
- React Hook Form + Zod Resolver
- TanStack Query
- dayjs（timezone/plugin + JST）

バックエンド:
- TypeScript on Cloudflare Workers
- Hono
- Zod + @hono/zod-validator
- @hono/zod-openapi

共通:
- packages/shared にZodスキーマと共通ユーティリティ

認証/DB:
- Supabase Auth + Postgres + RLS

Lint/Format:
- ESLint + Prettier（web/api共通）

## UIデザインガイド（Material Modern）
参照:
- `.claude/skills/design-style-guide/google-material-modern-design/SKILL.md`

必須ルール:
- Material Design 3 準拠（Elevation、Ripple/State Layer、意味のある動き）。
- 8dpグリッド、48x48タッチターゲット。
- 色はMaterial 3パレットから選定（紫固定は避け、ブランド色で生成）。
- タイポグラフィはMaterialのスケールに沿う。

フォント:
- 日本語対応かつデフォルトスタックを避ける。
  例: "Noto Sans JP", "Noto Sans", sans-serif

## 全体アーキテクチャ
Web（Vite/React） <-> API（Hono/Workers） <-> Supabase（Auth + Postgres + RLS）

フロー:
1) WebがSupabase Authでログイン
2) WebがAPIへAuthorization: Bearer <access_token>で呼び出し
3) APIがJWT検証、Zod検証、SupabaseへRLS前提でクエリ

## Cloudflare Workers前提
- Node.js専用APIは使用しない。
- nodejs_compatは原則OFF（ONにする場合はdocs/に理由と影響を記録）。
- Web標準APIのみ利用（fetch, URL, crypto.subtle, AbortController）。
- payloadは小さく設計。
- 外部API呼び出しはtimeout/retry/失敗時挙動を必ず明記。

## リポジトリ構成
```text
apps/
  web/
    src/
      components/
      pages/
      routes/
      hooks/
      lib/
      styles/
      main.tsx
  api/
    src/
      routes/
      middleware/
      services/
      lib/
      index.ts
packages/
  shared/
    schema/
    src/
docs/
```

決定事項:
- API入出力型は `packages/shared/schema` のZodから生成。
- web/api間の型コピペ禁止。

## データ構造・永続化（Supabase）
主要テーブル（必須カラムのみ記載。created_at/updated_atは必要に応じ追加）:

- user_profiles
  - user_id (PK)
  - nickname
  - nickname_normalized（ASCII英字のみ小文字化）

- teams
  - id (PK)
  - name
  - owner_user_id (FK)
  - settlement_cycle ("week" | "month")

- team_members
  - team_id (FK)
  - user_id (FK)
  - role ("owner" | "member")
  - status ("active" | "removed" | "deleted")
  - joined_at
  - left_at (nullable)

- task_masters
  - id (PK)
  - team_id (FK)
  - type ("housework" | "event")
  - name（チーム内一意）
  - points（1-99）
  - is_active
  - sort_order

- task_logs
  - id (PK)
  - team_id (FK)
  - user_id (FK)
  - task_master_id (FK)
  - points_snapshot
  - performer_nickname_snapshot
  - performed_at (timestamptz)
  - memo (nullable)

- team_invites
  - id (PK)
  - team_id (FK)
  - token_hash
  - invite_email (nullable)
  - expires_at
  - accepted_by_user_id (nullable)
  - revoked_at (nullable)

- audit_logs
  - id (PK)
  - team_id (FK)
  - actor_user_id (FK)
  - actor_nickname_snapshot
  - action_type
  - target_type
  - target_id
  - metadata_json (jsonb)
  - created_at

インデックス:
- task_logs (team_id, performed_at desc)
- task_logs (team_id, user_id, performed_at desc)
- task_masters (team_id, name unique)
- team_members (team_id, user_id unique)

ニックネーム一意性:
- team_membersに正規化ニックネームを持たせるか、
  user_profilesのnickname_normalizedを参照する複合一意制約を用意する。
- 大文字小文字同一視（ASCII英字のみ）で一意を担保。

期間計算:
- DBはUTC保管、計算はJST（Asia/Tokyo）で行う。
- 常に half-open: period_start <= t < period_end。

## RLS方針（Supabase）
必須:
- すべてのテーブルでRLSを有効化。
- RLS未設定のテーブルは禁止。

ヘルパ関数（例）:
- is_team_member(team_id)
- is_team_owner(team_id)
- is_task_log_editable(task_log_id, now_jst)

RLS例（方針を示すためのサンプル）:
```sql
create policy team_members_select on team_members
for select using (is_team_member(team_id));

create policy task_masters_insert on task_masters
for insert with check (is_team_owner(team_id));
create policy task_masters_update on task_masters
for update using (is_team_owner(team_id));

create policy task_logs_select on task_logs
for select using (is_team_member(team_id));
create policy task_logs_insert on task_logs
for insert with check (auth.uid() = user_id and is_team_member(team_id));
create policy task_logs_update on task_logs
for update using (
  (auth.uid() = user_id or is_team_owner(team_id))
  and is_task_log_editable(id, now() at time zone 'Asia/Tokyo')
);
create policy task_logs_delete on task_logs
for delete using (
  (auth.uid() = user_id or is_team_owner(team_id))
  and is_task_log_editable(id, now() at time zone 'Asia/Tokyo')
);
```

編集/削除の時間制限:
- 当期内のみ + period_endから24時間（JST）まで猶予。

## API設計（Schema First）
単一ソース:
- `packages/shared/schema` のZodが真実。
- APIはparams/query/body全てZodで検証。
- Webはz.inferで型生成。

レスポンス統一:
- 成功:
```json
{ "data": { ... }, "meta": { "request_id": "req_123" } }
```
- 失敗:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": { "field": "nickname" }
  }
}
```

エラーコード（固定）:
- UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT, VALIDATION_ERROR, INTERNAL

例: POST /teams/:teamId/task-logs
Request:
```json
{ "task_master_id": "tm_123", "performed_at": "2026-01-20T10:00:00+09:00", "memo": "..." }
```
Response:
```json
{ "data": { "id": "log_123" }, "meta": { "request_id": "req_abc" } }
```

OpenAPI:
- @hono/zod-openapiで生成。
- `docs/openapi.json` に出力してレビュー対象にする。

ページング:
- Cursorベース（performed_at + id）。
- 例: GET /teams/:teamId/task-logs?limit=50&cursor=...

## APIエンドポイント（MVP）
- 認証/プロフィール: GET /me/profile, PATCH /me/profile
- チーム: GET /teams, POST /teams
- メンバー: GET /teams/:teamId/members, DELETE /teams/:teamId/members/:userId
- 招待: POST /teams/:teamId/invites, POST /teams/:teamId/invites/:token/revoke,
  POST /invites/:token/accept
- マスタ: GET /teams/:teamId/task-masters, POST /teams/:teamId/task-masters,
  PATCH /task-masters/:id
- 実績: GET /teams/:teamId/task-logs, POST /teams/:teamId/task-logs,
  PATCH /task-logs/:id, DELETE /task-logs/:id
- 集計: GET /teams/:teamId/summary, GET /teams/:teamId/periods
- 設定: PATCH /teams/:teamId/settings
- 監査ログ: GET /teams/:teamId/audit-logs

## Supabaseアクセス方針
- APIはAuthorizationヘッダのJWTでSupabaseへアクセス（RLS前提）。
- service_roleは原則使わない。
- 複合操作はRPC化（チーム作成、招待受諾、オーナー移譲）。
- 例外でservice_roleが必要な場合はdocs/に理由と影響を記録。

## 開発/本番構成（Docker無し）
開発:
- Web: Vite dev server
- API: wrangler dev
- Supabase: hosted devプロジェクト利用（ローカルdocker無し）

本番:
- Web: 静的配信（Cloudflare Pagesなど）
- API: wrangler deploy（Workers）
- Supabase: managed

## Workers設定
- nodejs_compat: OFF（原則）
- compatibility_date: 明示的に固定し、更新時は検証
- wrangler.tomlには非機密のみ
- 機密は `wrangler secret put`

## 環境変数・シークレット
Web（公開）:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_API_BASE_URL

API（WorkersのSecret）:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY（必要時のみ）
- OPENAI_API_KEY（使用時のみ）

運用ルール:
- service_role / OpenAIキーは絶対にブラウザへ出さない。
- Gitにコミット禁止。
- 漏洩時は即ローテーションし、利用ログを確認。

## ログ/観測
- JSON構造化ログ。
- request_id / team_id を可能な範囲で付与。
- レベル: debug/info/warn/error。
- PII（メール/招待トークン）はログ出力禁止。
- 例外は統一エラーフォーマットへ変換。

## テスト方針
フロント:
- Unit: Vitest + React Testing Library（フォーム/バリデーション/状態遷移）
- Integration: 主要画面フロー（ログイン→チーム→実績→集計）
- E2E: Playwrightで最低限のスモーク

バックエンド:
- Unit: バリデーション/認可ロジック
- Integration: ルーティング + RLS挙動（Supabase devプロジェクト）
- エラーケースは必須（権限/期限/無効入力）

## キャッシュ方針
- MVPはキャッシュOFF（正しさ優先）。
- 例外でサマリ系GETにキャッシュ導入する場合:
  - Keyに user_id / team_id / period を含める。
  - TTL 30-120秒。
  - 更新後は必ず再取得（invalidate）。

## 外部API（OpenAIなど）
- Workersからのみ呼び出す。
- timeout（例: 10-15秒）、retry（最大1回）、失敗時挙動を定義。
- 失敗時は EXTERNAL_API_ERROR を返す。

## 具体例（迷いが出やすい箇所）
共有スキーマ配置:
```text
packages/shared/schema/
  team.ts
  task-log.ts
  invite.ts
```

APIでのスキーマ利用:
```ts
import { CreateTaskLogSchema } from "@shared/schema/task-log";
app.post("/teams/:teamId/task-logs", zValidator("json", CreateTaskLogSchema), ...)
```

RLS方針例:
- チーム設定/マスタ/招待/監査ログはオーナーのみ。
- メンバーは読み取り可能、書き込みは許可された範囲のみ。

## 未確定事項
- なし。新たな曖昧点が出たら本書を更新してから実装する。
