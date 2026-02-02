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

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import { taskLogs } from "../mocks/data/taskLogs";
import { taskMasters } from "../mocks/data/taskMasters";
import { users } from "../mocks/data/users";

const recentLogs = [...taskLogs]
  .sort((a, b) => b.performedAt.localeCompare(a.performedAt))
  .slice(0, 4);

const taskMap = new Map(taskMasters.map((task) => [task.id, task]));
const userMap = new Map(users.map((user) => [user.id, user]));

export default function TaskLogEntryPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="実績入力"
        subtitle="最短導線でタスクを記録する入力画面"
        actions={<Button variant="contained">今日の実績を保存</Button>}
      />

      <SectionCard
        title="タスクを選ぶ"
        subtitle="ボタンからワンタップで記録できます"
      >
        <Grid container spacing={2}>
          {taskMasters.map((task) => (
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
                  <Button size="small" variant="outlined">
                    このタスクを記録
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      <SectionCard title="最近の記録" subtitle="直近の入力履歴">
        <List>
          {recentLogs.map((log) => {
            const task = taskMap.get(log.taskMasterId);
            const user = userMap.get(log.userId);
            return (
              <ListItem key={log.id} divider>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: user?.avatarColor ?? "#94a3b8" }}>
                    {user?.nickname.slice(0, 1) ?? "?"}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${task?.name ?? "Task"} ・ ${log.pointsSnapshot}pt`}
                  secondary={`${user?.nickname ?? "User"} ・ ${new Date(
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
