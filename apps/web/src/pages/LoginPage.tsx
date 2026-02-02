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
        title="Login"
        subtitle="Mock screen for the Supabase login flow"
        actions={<Button variant="contained">Login with mock</Button>}
      />

      <StatusBanner
        status={profileQuery.status}
        error={profileQuery.error}
        onRetry={profileQuery.reload}
      />

      <SectionCard title="Login details" subtitle="Auth wiring lands in Phase 3">
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Email"
              defaultValue={profile?.email ?? "demo@example.com"}
              helperText="Email used for Supabase Auth"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              defaultValue="********"
              helperText="Password is mocked"
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
            <Button variant="contained">Login with email</Button>
            <Button variant="outlined">Continue with Google</Button>
            <Button variant="outlined">Continue with Apple</Button>
          </Stack>
        </Stack>
      </SectionCard>

      <SectionCard title="Session preview" subtitle="Mock user info">
        <Stack spacing={1}>
          <Typography variant="body2">User ID: {profile?.id ?? "-"}</Typography>
          <Typography variant="body2">Name: {profile?.name ?? "-"}</Typography>
          <Typography variant="body2">Nickname: {profile?.nickname ?? "-"}</Typography>
          <Divider />
          <Typography variant="caption" color="text.secondary">
            Supabase session details will appear here.
          </Typography>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
