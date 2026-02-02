# Tasks

## Phase 1: セットアップ & 最優先モック
- [X] フェーズ完了
- [X] T001 最優先: 「各画面とAPIの動作確認を、テストデータを用いて行えるフロントエンドモックの完成」（apps/web/src/mocks/, apps/web/src/pages/, apps/web/src/routes/, apps/web/src/lib/apiClient.ts）
- [X] [P] T002 依存関係インストール（package.json, pnpm-lock.yaml, apps/web/package.json, apps/api/package.json, packages/shared/package.json）
- [X] [P] T003 環境変数の雛形作成と型追加（apps/web/.env.local, apps/api/.dev.vars, apps/web/src/env.d.ts）
- [X] T004 ローカル起動確認（package.json, apps/web/vite.config.ts, apps/api/wrangler.toml）
- [X] [P] T005 ESLint/Prettierの実行コマンド整備（package.json, apps/web/eslint.config.js, apps/api/eslint.config.js, apps/web/.prettierrc.json, apps/api/.prettierrc.json）
- [X] T006 ESLint/Prettierを実行して指摘を修正（apps/web/eslint.config.js, apps/api/eslint.config.js, package.json）
- [X] T007 CIにLint/Formatを組み込み（.github/workflows/ci.yml, package.json）
- [X] [P] T008 MUIテーマ/フォント/グローバルスタイルの土台（apps/web/src/styles/theme.ts, apps/web/src/styles/global.css, apps/web/src/main.tsx）
- [X] [P] T009 画面ルーティングとレイアウト骨格（apps/web/src/App.tsx, apps/web/src/routes/*, apps/web/src/components/Layout.tsx）
- [X] [P] T010 モックAPI基盤（MSW等）を追加（apps/web/src/mocks/browser.ts, apps/web/src/mocks/handlers.ts, apps/web/src/main.tsx）
- [X] [P] T011 テストデータ定義（apps/web/src/mocks/data/users.ts, apps/web/src/mocks/data/teams.ts, apps/web/src/mocks/data/taskMasters.ts, apps/web/src/mocks/data/taskLogs.ts）
- [X] [P] T012 画面スタブ作成（ログイン/オンボーディング/チーム切替/マスタ/実績入力/集計/招待/メンバー/履歴/設定/監査）（apps/web/src/pages/*.tsx）

## Phase 2: 基盤整備（Schema / API / Web 共通）
- [ ] [P] T020 Web必須依存の追加（React Hook Form, Zod, TanStack Query, dayjs, Supabase）（apps/web/package.json）
- [ ] [P] T021 API必須依存の追加（Zod, @hono/zod-validator, @hono/zod-openapi, Supabase SDK）（apps/api/package.json）
- [ ] [P] T022 共有Zodスキーマの整備（packages/shared/schema/user.ts, packages/shared/schema/team.ts, packages/shared/schema/member.ts, packages/shared/schema/task-master.ts, packages/shared/schema/task-log.ts, packages/shared/schema/invite.ts, packages/shared/schema/summary.ts, packages/shared/schema/period.ts, packages/shared/schema/audit-log.ts）
- [ ] [P] T023 共通レスポンス/エラー型の定義（packages/shared/schema/api.ts, packages/shared/src/index.ts）
- [ ] [P] T024 API構成の分割（routes/middleware/services/lib）（apps/api/src/routes/*.ts, apps/api/src/middleware/*.ts, apps/api/src/services/*.ts）
- [ ] T025 API共通ミドルウェア（認証/リクエストID/エラーハンドリング/ログ）（apps/api/src/middleware/auth.ts, apps/api/src/middleware/error.ts, apps/api/src/middleware/logging.ts, apps/api/src/index.ts）
- [ ] [P] T026 Supabaseクライアントの整備（apps/api/src/lib/supabase.ts, apps/web/src/lib/supabaseClient.ts）
- [ ] [P] T027 JST周期計算ユーティリティ（packages/shared/src/period.ts, apps/api/src/lib/period.ts, apps/web/src/lib/period.ts）
- [ ] [P] T028 DBスキーマ/関数/RLS SQLの作成（docs/db/schema.sql, docs/db/functions.sql, docs/db/rls.sql）
- [ ] T029 OpenAPI生成の仕組み追加（apps/api/src/openapi.ts, docs/openapi.json）
- [ ] [P] T030 Web基盤（QueryClient/フォーム検証/共通APIクライアント）（apps/web/src/lib/queryClient.ts, apps/web/src/lib/validators.ts, apps/web/src/lib/apiClient.ts）
- [ ] [P] T031 テスト基盤導入（Vitest/RTL/Playwright）（apps/web/vitest.config.ts, apps/web/tests/setup.ts, apps/web/playwright.config.ts, apps/api/tests/setup.ts）

## Phase 3: P1 ユーザーストーリー（実績登録と今期集計）
- [ ] [P] T100 P1 APIコントラクトテスト（プロフィール/チーム/マスタ/実績/集計）（apps/api/tests/contract/me.test.ts, apps/api/tests/contract/teams.test.ts, apps/api/tests/contract/task-masters.test.ts, apps/api/tests/contract/task-logs.test.ts, apps/api/tests/contract/summary.test.ts）
- [ ] [P] T101 P1 API統合テスト（RLS含む）（apps/api/tests/integration/p1-flow.test.ts, apps/api/tests/fixtures/*.ts）
- [ ] [P] T102 P1 Web単体テスト（フォーム/バリデーション）（apps/web/tests/unit/onboarding.test.tsx, apps/web/tests/unit/task-log-form.test.tsx）
- [ ] [P] T103 P1 Web結合テスト（ログイン→チーム→実績→集計）（apps/web/tests/integration/p1-flow.test.tsx）
- [ ] T110 SupabaseログインUI/セッション（apps/web/src/pages/LoginPage.tsx, apps/web/src/lib/supabaseClient.ts, apps/web/src/routes/*）
- [ ] T111 プロフィール取得/更新API（apps/api/src/routes/me.ts, apps/api/src/services/profile.ts, packages/shared/schema/user.ts）
- [ ] T112 ニックネーム登録UI/検証（apps/web/src/pages/OnboardingPage.tsx, apps/web/src/lib/validators.ts）
- [ ] T113 チーム作成/一覧/切替API（apps/api/src/routes/teams.ts, apps/api/src/services/teams.ts, packages/shared/schema/team.ts）
- [ ] T114 チーム切替UI（apps/web/src/pages/TeamSwitchPage.tsx, apps/web/src/components/TeamSwitcher.tsx）
- [ ] T115 マスタ登録/更新/無効化API（apps/api/src/routes/taskMasters.ts, apps/api/src/services/taskMasters.ts, packages/shared/schema/task-master.ts）
- [ ] T116 マスタ管理UI（apps/web/src/pages/TaskMasterPage.tsx, apps/web/src/components/TaskMasterForm.tsx）
- [ ] T117 実績登録API（スナップショット/バリデーション）（apps/api/src/routes/taskLogs.ts, apps/api/src/services/taskLogs.ts, packages/shared/schema/task-log.ts）
- [ ] T118 実績入力UI（最短導線/即時反映）（apps/web/src/pages/TaskLogEntryPage.tsx, apps/web/src/components/TaskLogForm.tsx, apps/web/src/lib/queryClient.ts）
- [ ] T119 今期集計API（apps/api/src/routes/summary.ts, apps/api/src/services/summary.ts, packages/shared/schema/summary.ts）
- [ ] T120 今期集計UI（メンバー別合計/内訳）（apps/web/src/pages/SummaryPage.tsx, apps/web/src/components/SummaryTable.tsx）
- [ ] T121 モック⇄実API切替フラグ（apps/web/src/lib/apiClient.ts, apps/web/.env.local, apps/web/src/env.d.ts）
- [ ] T122 エラー表示とユーザー向けメッセージ（apps/web/src/components/Toast.tsx, apps/web/src/lib/errorMapper.ts）

## Phase 4: P2 ユーザーストーリー（招待とチーム利用）
- [ ] [P] T200 招待/メンバーAPIコントラクトテスト（apps/api/tests/contract/invites.test.ts, apps/api/tests/contract/members.test.ts）
- [ ] [P] T201 招待フローWeb結合テスト（apps/web/tests/integration/invite-flow.test.tsx）
- [ ] T210 招待リンク発行/失効/受諾API（apps/api/src/routes/invites.ts, apps/api/src/services/invites.ts, packages/shared/schema/invite.ts）
- [ ] T211 メンバー一覧/削除API（apps/api/src/routes/members.ts, apps/api/src/services/members.ts, packages/shared/schema/member.ts）
- [ ] T212 招待受諾UI（未ログイン時の戻り含む）（apps/web/src/pages/InviteAcceptPage.tsx, apps/web/src/routes/*）
- [ ] T213 招待リンク管理UI（発行/失効）（apps/web/src/pages/InviteManagePage.tsx, apps/web/src/components/InvitePanel.tsx）
- [ ] T214 メンバー一覧UI（status表示）（apps/web/src/pages/MembersPage.tsx, apps/web/src/components/MemberList.tsx）
- [ ] T215 メンバー削除UI（オーナー限定）（apps/web/src/components/MemberRemoveDialog.tsx）

## Phase 5: P2 ユーザーストーリー（実績編集/削除と履歴）
- [ ] [P] T300 実績編集/削除/履歴APIコントラクトテスト（apps/api/tests/contract/task-logs-update.test.ts, apps/api/tests/contract/task-logs-history.test.ts）
- [ ] [P] T301 実績編集/削除/履歴Web結合テスト（apps/web/tests/integration/task-log-history.test.tsx）
- [ ] T310 実績編集/削除API（当期+24h制限）（apps/api/src/services/taskLogs.ts, apps/api/src/lib/period.ts, apps/api/src/routes/taskLogs.ts）
- [ ] T311 実績履歴API（ページング/降順）（apps/api/src/routes/taskLogs.ts, packages/shared/schema/pagination.ts）
- [ ] T312 実績履歴UI（ページング）（apps/web/src/pages/TaskLogHistoryPage.tsx, apps/web/src/components/TaskLogTable.tsx）
- [ ] T313 実績編集/削除UI（権限制御と期限表示）（apps/web/src/components/TaskLogEditDialog.tsx, apps/web/src/components/TaskLogDeleteDialog.tsx）

## Phase 6: P3 ユーザーストーリー（過去周期/設定/監査）
- [ ] [P] T400 過去周期/設定/オーナー移譲/監査ログAPIコントラクトテスト（apps/api/tests/contract/periods.test.ts, apps/api/tests/contract/settings.test.ts, apps/api/tests/contract/owner-transfer.test.ts, apps/api/tests/contract/audit-logs.test.ts）
- [ ] [P] T401 過去周期/設定/監査ログWeb結合テスト（apps/web/tests/integration/settings-periods.test.tsx, apps/web/tests/integration/audit-logs.test.tsx）
- [ ] T410 周期一覧/過去集計API（apps/api/src/routes/periods.ts, apps/api/src/services/periods.ts）
- [ ] T411 周期一覧UI（過去参照は読み取り専用）（apps/web/src/pages/PeriodsPage.tsx, apps/web/src/components/PeriodSelector.tsx）
- [ ] T412 精算周期設定API（週次/月次）（apps/api/src/routes/settings.ts, apps/api/src/services/settings.ts, packages/shared/schema/settings.ts）
- [ ] T413 精算周期設定UI（apps/web/src/pages/TeamSettingsPage.tsx）
- [ ] T414 オーナー移譲フローAPI（apps/api/src/services/ownerTransfer.ts, apps/api/src/routes/ownerTransfer.ts）
- [ ] T415 オーナー移譲UI（apps/web/src/components/OwnerTransferDialog.tsx, apps/web/src/pages/TeamSettingsPage.tsx）
- [ ] T416 監査ログAPI（apps/api/src/routes/auditLogs.ts, apps/api/src/services/auditLogs.ts, packages/shared/schema/audit-log.ts）
- [ ] T417 監査ログUI（apps/web/src/pages/AuditLogsPage.tsx, apps/web/src/components/AuditLogTable.tsx）
- [ ] T418 マスタ表示順の並び替え（API/UI）（apps/api/src/routes/taskMasters.ts, apps/web/src/components/TaskMasterSort.tsx）

## Phase 7: 仕上げ（横断対応/ドキュメント/デプロイ）
- [ ] [P] T500 E2Eスモークテスト追加（Playwright）（apps/web/tests/e2e/p1-smoke.spec.ts, apps/web/playwright.config.ts）
- [ ] [P] T501 ログ/PIIレビューと整備（apps/api/src/middleware/logging.ts, docs/logging.md）
- [ ] [P] T502 READMEと運用ドキュメント整備（README.md, docs/setup.md, docs/deploy.md, docs/mock.md）
- [ ] [P] T503 OpenAPI公開/参照ドキュメント（docs/openapi.json, docs/api.md, README.md）
- [ ] [P] T504 モバイル性能/UX最終調整（apps/web/src/pages/TaskLogEntryPage.tsx, apps/web/src/components/LoadingState.tsx, docs/performance.md）
- [ ] [P] T505 デプロイ確認と手順反映（apps/api/wrangler.toml, apps/web/vite.config.ts, docs/deploy.md）
