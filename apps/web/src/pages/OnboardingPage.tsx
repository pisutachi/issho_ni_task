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
        title="オンボーディング"
        subtitle="ニックネーム登録と初期チーム設定のステップ"
        actions={<Button variant="contained">次へ進む</Button>}
      />

      <StatusBanner
        status={profileQuery.status}
        error={profileQuery.error}
        onRetry={profileQuery.reload}
      />

      {saveState === "saved" && <Alert severity="success">プロフィールを保存しました。</Alert>}
      {saveState === "error" && <Alert severity="error">保存に失敗しました。</Alert>}

      <SectionCard
        title="プロフィール"
        subtitle="メンバーに表示されるニックネームを登録"
      >
        <Stack spacing={2}>
          <TextField
            label="ニックネーム"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            helperText="2-12文字で入力"
            fullWidth
          />
          <TextField
            label="自己紹介（任意）"
            placeholder="家事の得意分野や共有したいこと"
            multiline
            minRows={3}
            fullWidth
          />
          <Button variant="outlined" onClick={handleSave} disabled={saveState === "saving"}>
            ニックネームを保存
          </Button>
        </Stack>
      </SectionCard>

      <SectionCard
        title="チームの初期設定"
        subtitle="オンボーディング完了時に最初のチームを作成"
      >
        <Stack spacing={2}>
          <TextField label="チーム名" defaultValue="Aurora House" fullWidth />
          <TextField
            label="招待したいメンバー"
            placeholder="メールアドレスをカンマ区切りで入力"
            fullWidth
          />
          <Button variant="outlined">招待メールを送信</Button>
        </Stack>
      </SectionCard>
    </Stack>
  );
}
