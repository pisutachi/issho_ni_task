import { Alert, Button, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { useApiData } from "../lib/useApiData";

export default function OnboardingPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const profile = profileQuery.data?.data;
  const [nickname, setNickname] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (profile?.nickname) {
      setNickname(profile.nickname);
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      setSaveState("saving");
      await apiClient.updateProfile({ nickname });
      setSaveState("saved");
      profileQuery.reload();
    } catch {
      setSaveState("error");
    }
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Onboarding"
        subtitle="Nickname and starter team setup"
        actions={<Button variant="contained">Continue</Button>}
      />

      <StatusBanner
        status={profileQuery.status}
        error={profileQuery.error}
        onRetry={profileQuery.reload}
      />

      {saveState === "saved" && <Alert severity="success">Profile saved.</Alert>}
      {saveState === "error" && <Alert severity="error">Failed to save profile.</Alert>}

      <SectionCard title="Profile" subtitle="Pick a nickname visible to your team">
        <Stack spacing={2}>
          <TextField
            label="Nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            helperText="2-12 characters"
            fullWidth
          />
          <TextField
            label="Bio (optional)"
            placeholder="Add a short intro"
            multiline
            minRows={3}
            fullWidth
          />
          <Button variant="outlined" onClick={handleSave} disabled={saveState === "saving"}>
            Save nickname
          </Button>
        </Stack>
      </SectionCard>

      <SectionCard title="Team bootstrap" subtitle="Create your first team on completion">
        <Stack spacing={2}>
          <TextField label="Team name" defaultValue="Aurora House" fullWidth />
          <TextField
            label="Invite teammates"
            placeholder="Add emails separated by commas"
            fullWidth
          />
          <Button variant="outlined">Send invites</Button>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
