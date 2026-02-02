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
        title="初期設定"
        subtitle="ニックネームと最初のチームを設定"
        actions={<Button variant="contained">次へ</Button>}
      />

      <StatusBanner
        status={profileQuery.status}
        error={profileQuery.error}
        onRetry={profileQuery.reload}
      />

      {saveState === "saved" && <Alert severity="success">プロフィールを保存しました。</Alert>}
      {saveState === "error" && <Alert severity="error">プロフィールの保存に失敗しました。</Alert>}

      <SectionCard title="プロフィール" subtitle="チームで表示するニックネームを設定します">
        <Stack spacing={2}>
          <TextField
            label="ニックネーム"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            helperText="2〜12文字"
            fullWidth
          />
          <TextField
            label="自己紹介（任意）"
            placeholder="簡単な紹介文を入力"
            multiline
            minRows={3}
            fullWidth
          />
          <Button variant="outlined" onClick={handleSave} disabled={saveState === "saving"}>
            ニックネームを保存
          </Button>
        </Stack>
      </SectionCard>

      <SectionCard title="チーム作成" subtitle="完了時に最初のチームを作成します">
        <Stack spacing={2}>
          <TextField label="チーム名" defaultValue="オーロラハウス" fullWidth />
          <TextField
            label="メンバー招待"
            placeholder="メールアドレスをカンマ区切りで入力"
            fullWidth
          />
          <Button variant="outlined">招待を送信</Button>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
