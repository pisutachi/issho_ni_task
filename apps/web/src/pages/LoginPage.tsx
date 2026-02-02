import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useCallback } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { useApiData } from "../lib/useApiData";

export default function LoginPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const profile = profileQuery.data?.data;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="ログイン"
        subtitle="Supabaseログインフローのモック画面"
        actions={<Button variant="contained">モックでログイン</Button>}
      />

      <StatusBanner
        status={profileQuery.status}
        error={profileQuery.error}
        onRetry={profileQuery.reload}
      />

      <SectionCard title="ログイン情報" subtitle="認証連携はフェーズ3で実装予定です">
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="メールアドレス"
              defaultValue={profile?.email ?? "demo@example.com"}
              helperText="Supabase Authで使用するメールアドレス"
            />
            <TextField
              fullWidth
              label="パスワード"
              type="password"
              defaultValue="********"
              helperText="パスワードはモックです"
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
            <Button variant="contained">メールアドレスでログイン</Button>
            <Button variant="outlined">Googleで続行</Button>
            <Button variant="outlined">Appleで続行</Button>
          </Stack>
        </Stack>
      </SectionCard>

      <SectionCard title="セッション確認" subtitle="モックユーザー情報">
        <Stack spacing={1}>
          <Typography variant="body2">ユーザーID: {profile?.id ?? "-"}</Typography>
          <Typography variant="body2">名前: {profile?.name ?? "-"}</Typography>
          <Typography variant="body2">ニックネーム: {profile?.nickname ?? "-"}</Typography>
          <Divider />
          <Typography variant="caption" color="text.secondary">
            Supabaseセッションの詳細がここに表示されます。
          </Typography>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
