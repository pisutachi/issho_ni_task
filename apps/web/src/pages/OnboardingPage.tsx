import { Button, Stack, TextField } from "@mui/material";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import { users } from "../mocks/data/users";

const currentUser = users[0];

export default function OnboardingPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="オンボーディング"
        subtitle="ニックネーム登録と初期チーム設定のステップ"
        actions={<Button variant="contained">次へ進む</Button>}
      />

      <SectionCard
        title="プロフィール"
        subtitle="メンバーに表示されるニックネームを登録"
      >
        <Stack spacing={2}>
          <TextField
            label="ニックネーム"
            defaultValue={currentUser.nickname}
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
        </Stack>
      </SectionCard>

      <SectionCard
        title="チームの初期設定"
        subtitle="オンボーディング完了時に最初のチームを作成"
      >
        <Stack spacing={2}>
          <TextField
            label="チーム名"
            defaultValue="Aurora House"
            fullWidth
          />
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
