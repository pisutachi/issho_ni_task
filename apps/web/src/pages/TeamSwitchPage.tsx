import { Button, Card, CardActions, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import { defaultTeamId, teams } from "../mocks/data/teams";

export default function TeamSwitchPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="チーム切替"
        subtitle="現在の所属チームを確認し、切替や新規作成を行います"
        actions={<Button variant="contained">新規チーム作成</Button>}
      />

      <SectionCard title="所属チーム" subtitle="クリックしてアクティブ化">
        <Grid container spacing={2}>
          {teams.map((team) => (
            <Grid item xs={12} md={6} key={team.id}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6">{team.name}</Typography>
                      {team.id === defaultTeamId && (
                        <Chip label="Current" color="secondary" size="small" />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Role: {team.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Members: {team.memberCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Settlement: {team.settlementCycle}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button variant="outlined" size="small">
                    このチームに切替
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
