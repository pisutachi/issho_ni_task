<!--
Sync Impact Report
- Version change: N/A -> 1.0.0
- Modified principles:
  - PRINCIPLE_1_NAME (placeholder) -> I. MVP最速で価値を出す
  - PRINCIPLE_2_NAME (placeholder) -> II. Workersファーストで設計する
  - PRINCIPLE_3_NAME (placeholder) -> III. セキュリティ境界はRLSで固定する
  - PRINCIPLE_4_NAME (placeholder) -> IV. Schema Firstで型を共有する
  - PRINCIPLE_5_NAME (placeholder) -> V. 観測可能性と品質ゲートを優先する
- Added sections: 技術・アーキテクチャ規約, 開発・運用ルール
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md: updated
  - .specify/templates/spec-template.md: updated
  - .specify/templates/tasks-template.md: updated
- Follow-up TODOs: None
-->
# いっしょにタスク (issho_ni_task) Constitution

## Core Principles

### I. MVP最速で価値を出す
- ルール:
  - MUST: P1ユーザーストーリーから着手し、MVPに不要な機能は実装しない。
  - MUST: 迷ったらスコープ削減/後回し/分割を選ぶ。
  - MUST: 1 PR = 1目的、差分はレビュー可能な最小単位にする。
- 理由: 早期リリースと検証速度を最大化するため。

### II. Workersファーストで設計する
- ルール:
  - MUST: Node.js専用APIに依存しない。
  - MUST: nodejs_compatは原則OFF。ONにする場合は理由と影響範囲をdocs/に記録する。
  - MUST: 大きなpayloadを前提にしない。
  - MUST: 外部API呼び出しはtimeout/retry/失敗時挙動を設計に明示する。
  - MUST: ローカルはwrangler dev、本番はwrangler deploy。Dockerは使わない。
- 理由: 本番がCloudflare Workersであり互換性が最重要だから。

### III. セキュリティ境界はRLSで固定する
- ルール:
  - MUST: Supabase Auth + RLSを必須とし、チーム境界・権限制御はDBで強制する。
  - MUST: アプリ側の条件分岐だけで境界を守らない。RLS未設定のテーブルは作らない。
  - MUST: service_role相当の権限使用は最小限にし、用途と影響を明示する。
- 理由: 実装漏れを防ぎ、MVPでも安全性を保つため。

### IV. Schema Firstで型を共有する
- ルール:
  - MUST: API入出力はZod Schemaを単一ソースとする。
  - MUST: packages/sharedの同一Schemaからフロント/バックで型推論して利用する。
  - MUST: webとapi間で型をコピペしない。
  - MUST: 外部入力はZodでparse/safeParseし、parse済みデータのみ内部処理へ渡す。
- 理由: 型の二重管理を排除し、変更に強くするため。

### V. 観測可能性と品質ゲートを優先する
- ルール:
  - MUST: ESLint/PrettierとテストをCIで実行し、失敗した変更はマージしない。
  - MUST: 例外は握り潰さず統一エラーに変換する。
  - MUST: ログはdebug/info/warn/errorを使い、PIIは出力しない。
- 理由: MVPでも障害調査と品質維持を可能にするため。

## 技術・アーキテクチャ規約

- **技術スタック (固定)**:
  - フロント: React + TypeScript + Vite, MUI, React Router, React Hook Form + Zod, dayjs,
    TanStack Query。
  - バックエンド: TypeScript, Cloudflare Workers, Hono, Zod + @hono/zod-validator。
  - データストア/認証: Supabase Auth + RLS (必須)。
- **実行・運用**:
  - Docker/Composeは使わない。ホストOS上で直接実行する。
  - フロント: Vite dev server。バックエンド: wrangler dev / wrangler deploy。
- **Cloudflare Workers制約**:
  - Node専用API依存は不可。nodejs_compatは原則OFF。
  - payloadは小さく。巨大リクエスト/レスポンスを前提にしない。
  - 外部APIはtimeout/retry/失敗時挙動を設計に明記する。
- **モノレポ構成 (固定)**:
  ```text
  apps/
    web/        # React (Vite)
    api/        # Hono + Cloudflare Workers
  packages/
    shared/     # 共通型・共通Zodスキーマ・共通ユーティリティ
  docs/
  .github/
  ```
  - 禁止: webとapi間の型コピペ、API入出力型の再定義。
- **API設計**:
  - ルーティングはREST基本・複数形リソース (例: `GET /teams`, `POST /teams/:teamId/task-logs`)。
  - 成功レスポンスは統一フォーマット。
  - エラーレスポンスは `code/message/details` を必ず返す。
  - 例:
    ```json
    {"data":{"id":"team_123"},"meta":{"request_id":"req_abc"}}
    ```
    ```json
    {"error":{"code":"FORBIDDEN","message":"権限がありません","details":{"team_id":"team_123"}}}
    ```
- **入力バリデーション**:
  - params/query/bodyすべてをZodで検証する。
  - Honoでは `@hono/zod-validator` を使用する。
  - フォームは React Hook Form + Zod Resolver で統一する。
- **型共有 (Schema First)**:
  - 共有Schemaは `packages/shared/schema/` に配置する。
  - 例: `packages/shared/schema/user.ts` に `UserSchema`, `CreateUserRequestSchema` を定義し、
    `z.infer` で型を生成する。
- **OpenAPI (推奨)**:
  - `@hono/zod-openapi` で仕様生成し、`docs/openapi.json` に出力する。
  - 仕様と実装の差分はPRで必ずレビュー・修正する。
- **キャッシュ**:
  - MVPでは正しさ優先でキャッシュを積極利用しない。
  - 例外でサマリ系GETをキャッシュする場合:
    - キャッシュキーに `user_id` / `team_id` / `period` を含める。
    - TTLは30〜120秒。
    - 登録/更新後は必ず再取得 (TanStack Queryのinvalidateで吸収)。

## 開発・運用ルール

- **Lint / Format (必須)**:
  - ESLint + Prettierを採用し、CIでチェックする。
  - ルールは自動整形に寄せる (import順, 未使用, any, 暗黙の型変換を禁止)。
- **TypeScript基本方針 (必須)**:
  - `strict: true` を前提とする。
  - `any` は原則禁止。例外はコメントで理由を明記する。
  - 型の境界は「API」「外部入力」「DBレスポンス」で必ず作る。
- **テスト方針**:
  - フロント: 単体(表示条件/フォーム/状態遷移)、結合(主要画面フロー)、E2Eは最小限。
  - バックエンド: 単体(バリデーション/認可/ビジネスロジック)、
    結合(ルーティング/ミドルウェア/DB)。
  - エラーケース(権限不足/期限切れ/無効入力)は必ず含める。
- **ログ / エラーハンドリング**:
  - 例外は握り潰さない。統一エラー型 -> HTTPエラー変換の責務を明確化する。
  - 4xxはユーザー起因、5xxはシステム起因として整理する。
  - ログレベルは debug/info/warn/error。
  - PII (メール, 招待トークン等) はログ出力禁止。
  - request_id / team_id を可能な範囲で付与する。
- **ブランチ運用 / PRルール**:
  - `main` は常にデプロイ可能な状態を保つ。
  - ブランチ命名: `feat/xxx`, `fix/xxx`, `chore/xxx`。
  - PRは小さく、差分の目的は1つにする。
  - マージはSquashを基本とする。
  - レビュー観点チェックリスト: 仕様/型/例外/境界/権限/ログ。
- **依存関係とバージョン管理**:
  - Node: 20 LTS、パッケージ管理: pnpm。
  - lockfileは必ずコミットする。
  - 依存更新は小さく頻繁に。破壊的変更は別PR。
  - Workers互換性に影響する更新は特に慎重に扱う。

## Governance

- すべての変更は本Constitutionに従う。矛盾がある場合は本書が優先される。
- 改定はPRで行い、変更理由・影響範囲・移行対応を明記する。
- バージョンはSemantic Versioningを採用する。
  - MAJOR: 互換性を壊す原則変更、原則の削除/大幅変更。
  - MINOR: 原則や規約の追加、運用ルールの大幅拡張。
  - PATCH: 明確化や文言修正などの非本質変更。
- すべてのPR/レビューでConstitution準拠を確認する
  (特にRLS/Workers/Schema First/ログ/テスト)。
- 例外が必要な場合は理由・期限・代替策を明記し、最小範囲で承認する。

**Version**: 1.0.0 | **Ratified**: 2026-01-20 | **Last Amended**: 2026-01-20
