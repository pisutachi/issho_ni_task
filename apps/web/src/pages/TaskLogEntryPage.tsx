import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { useApiData } from "../lib/useApiData";

export default function TaskLogEntryPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const taskMastersQuery = useApiData(
    useCallback(() => apiClient.listTaskMasters(teamId), [teamId]),
  );
  const logsQuery = useApiData(useCallback(() => apiClient.listTaskLogs(teamId), [teamId]));
  const [creatingId, setCreatingId] = useState<string | null>(null);

  const taskMap = useMemo(
    () => new Map(taskMastersQuery.data?.data.map((task) => [task.id, task]) ?? []),
    [taskMastersQuery.data?.data],
  );

  const handleCreate = async (taskMasterId: string) => {
    if (!teamId) {
      return;
    }
    try {
      setCreatingId(taskMasterId);
      await apiClient.createTaskLog(teamId, {
        taskMasterId,
        performedAt: new Date().toISOString(),
      });
      logsQuery.reload();
    } finally {
      setCreatingId(null);
    }
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Task log entry"
        subtitle="Quickly record tasks with one tap"
        actions={<Button variant="contained">Save today's logs</Button>}
      />

      <StatusBanner
        status={taskMastersQuery.status}
        error={taskMastersQuery.error}
        onRetry={taskMastersQuery.reload}
      />

      <SectionCard title="Pick a task" subtitle="Tap to record instantly">
        <Grid container spacing={2}>
          {taskMastersQuery.data?.data.map((task) => (
            <Grid item xs={12} md={6} lg={4} key={task.id}>
              <Card variant="outlined">
                <CardContent>
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="subtitle1" fontWeight={700}>
                        {task.name}
                      </Typography>
                      <Chip label={task.type} size="small" />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Points: {task.points}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={creatingId === task.id}
                    onClick={() => handleCreate(task.id)}
                  >
                    Log this task
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      <SectionCard title="Recent logs" subtitle="Latest entries">
        <StatusBanner
          status={logsQuery.status}
          error={logsQuery.error}
          onRetry={logsQuery.reload}
        />
        <List>
          {logsQuery.data?.data.slice(0, 4).map((log) => {
            const task = taskMap.get(log.taskMasterId);
            return (
              <ListItem key={log.id} divider>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#94a3b8" }}>
                    {log.performerNicknameSnapshot.slice(0, 1)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${task?.name ?? "Task"} · ${log.pointsSnapshot}pt`}
                  secondary={`${log.performerNicknameSnapshot} · ${new Date(
                    log.performedAt,
                  ).toLocaleString()}`}
                />
              </ListItem>
            );
          })}
        </List>
      </SectionCard>
    </Stack>
  );
}
