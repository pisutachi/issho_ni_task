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
        title="設定"
        subtitle="集計周期とチーム情報"
        actions={
          <Button variant="contained" onClick={handleSave} disabled={saveState === "saving"}>
            設定を保存
          </Button>
        }
      />

      <StatusBanner
        status={settingsQuery.status}
        error={settingsQuery.error}
        onRetry={settingsQuery.reload}
      />

      {saveState === "saved" && <Alert severity="success">設定を保存しました。</Alert>}
      {saveState === "error" && <Alert severity="error">設定の保存に失敗しました。</Alert>}

      <SectionCard title="チーム情報" subtitle="基本プロフィール">
        <Stack spacing={2}>
          <TextField
            label="チーム名"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <TextField label="オーナー" value={settings?.ownerName ?? "-"} fullWidth />
        </Stack>
      </SectionCard>

      <SectionCard title="集計周期" subtitle="週次と月次を切り替え">
        <FormControl>
          <RadioGroup
            value={cycle}
            onChange={(event) => setCycle(event.target.value as "week" | "month")}
          >
            <FormControlLabel value="week" control={<Radio />} label="週次" />
            <FormControlLabel value="month" control={<Radio />} label="月次" />
          </RadioGroup>
        </FormControl>
      </SectionCard>
    </Stack>
  );
}
