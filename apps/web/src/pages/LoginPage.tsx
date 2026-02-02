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
        subtitle="SupabaseログインのUIを想定したモック画面"
        actions={<Button variant="contained">モックでログイン</Button>}
      />

      <StatusBanner
        status={profileQuery.status}
        error={profileQuery.error}
        onRetry={profileQuery.reload}
      />

      <SectionCard
        title="ログイン情報"
        subtitle="実際の認証連携はPhase 3で実装予定"
      >
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Email"
              defaultValue={profile?.email ?? "demo@example.com"}
              helperText="Supabase Authで利用するメールアドレス"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              defaultValue="********"
              helperText="パスワードはモック固定"
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
            <Button variant="contained">Emailでログイン</Button>
            <Button variant="outlined">Googleで続ける</Button>
            <Button variant="outlined">Appleで続ける</Button>
          </Stack>
        </Stack>
      </SectionCard>

      <SectionCard title="セッションプレビュー" subtitle="モックユーザーの情報">
        <Stack spacing={1}>
          <Typography variant="body2">User ID: {profile?.id ?? "-"}</Typography>
          <Typography variant="body2">Name: {profile?.name ?? "-"}</Typography>
          <Typography variant="body2">Nickname: {profile?.nickname ?? "-"}</Typography>
          <Divider />
          <Typography variant="caption" color="text.secondary">
            ここにSupabaseのセッション情報が表示される想定です。
          </Typography>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
