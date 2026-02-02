import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { formatRole, formatSettlementCycle } from "../lib/locale";
import { useApiData } from "../lib/useApiData";

export default function TeamSwitchPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamsQuery = useApiData(useCallback(() => apiClient.listTeams(), []));
  const currentTeamId = profileQuery.data?.data.currentTeamId;
  const [switchingId, setSwitchingId] = useState<string | null>(null);

  const handleSwitch = async (teamId: string) => {
    try {
      setSwitchingId(teamId);
      await apiClient.switchTeam(teamId);
      profileQuery.reload();
    } finally {
      setSwitchingId(null);
    }
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="チーム切替"
        subtitle="所属チームを確認して切り替えます"
        actions={<Button variant="contained">チームを作成</Button>}
      />

      <StatusBanner
        status={teamsQuery.status === "success" ? profileQuery.status : teamsQuery.status}
        error={teamsQuery.error ?? profileQuery.error}
        onRetry={() => {
          teamsQuery.reload();
          profileQuery.reload();
        }}
      />

      <SectionCard title="あなたのチーム" subtitle="タップで有効化">
        <Grid container spacing={2}>
          {teamsQuery.data?.data.map((team) => (
            <Grid item xs={12} md={6} key={team.id}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6">{team.name}</Typography>
                      {team.id === currentTeamId && (
                        <Chip label="現在" color="secondary" size="small" />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      役割: {formatRole(team.role)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      メンバー数: {team.memberCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      集計周期: {formatSettlementCycle(team.settlementCycle)}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={switchingId === team.id}
                    onClick={() => handleSwitch(team.id)}
                  >
                    このチームに切り替える
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>
    </Stack>
  );
}
