import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { useApiData } from "../lib/useApiData";

export default function TeamSettingsPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const settingsQuery = useApiData(useCallback(() => apiClient.getSettings(teamId), [teamId]));
  const settings = settingsQuery.data?.data;

  const [name, setName] = useState("");
  const [cycle, setCycle] = useState<"week" | "month">("week");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (settings) {
      setName(settings.name);
      setCycle(settings.settlementCycle);
    }
  }, [settings]);

  const handleSave = async () => {
    if (!teamId) {
      return;
    }
    try {
      setSaveState("saving");
      await apiClient.updateSettings(teamId, {
        name,
        settlementCycle: cycle,
      });
      setSaveState("saved");
      settingsQuery.reload();
    } catch {
      setSaveState("error");
    }
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Settings"
        subtitle="Settlement cycle and team info"
        actions={
          <Button variant="contained" onClick={handleSave} disabled={saveState === "saving"}>
            Save settings
          </Button>
        }
      />

      <StatusBanner
        status={settingsQuery.status}
        error={settingsQuery.error}
        onRetry={settingsQuery.reload}
      />

      {saveState === "saved" && <Alert severity="success">Settings saved.</Alert>}
      {saveState === "error" && <Alert severity="error">Failed to save settings.</Alert>}

      <SectionCard title="Team info" subtitle="Basic profile">
        <Stack spacing={2}>
          <TextField
            label="Team name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <TextField label="Owner" value={settings?.ownerName ?? "-"} fullWidth />
        </Stack>
      </SectionCard>

      <SectionCard title="Settlement cycle" subtitle="Switch between weekly and monthly">
        <FormControl>
          <RadioGroup
            value={cycle}
            onChange={(event) => setCycle(event.target.value as "week" | "month")}
          >
            <FormControlLabel value="week" control={<Radio />} label="Weekly" />
            <FormControlLabel value="month" control={<Radio />} label="Monthly" />
          </RadioGroup>
        </FormControl>
      </SectionCard>
    </Stack>
  );
}
