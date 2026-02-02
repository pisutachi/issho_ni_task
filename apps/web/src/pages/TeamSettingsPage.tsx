import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";

export default function TeamSettingsPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="設定"
        subtitle="精算周期やチーム情報の管理"
        actions={<Button variant="contained">設定を保存</Button>}
      />

      <SectionCard title="チーム情報" subtitle="基本情報の確認">
        <Stack spacing={2}>
          <TextField label="チーム名" defaultValue="Aurora House" fullWidth />
          <TextField label="オーナー" defaultValue="Koharu" fullWidth />
        </Stack>
      </SectionCard>

      <SectionCard title="精算周期" subtitle="週次・月次を切替">
        <FormControl>
          <RadioGroup defaultValue="week">
            <FormControlLabel value="week" control={<Radio />} label="週次" />
            <FormControlLabel value="month" control={<Radio />} label="月次" />
          </RadioGroup>
        </FormControl>
      </SectionCard>
    </Stack>
  );
}
