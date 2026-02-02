import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import { taskLogs } from "../mocks/data/taskLogs";
import { taskMasters } from "../mocks/data/taskMasters";
import { users } from "../mocks/data/users";

const taskMap = new Map(taskMasters.map((task) => [task.id, task]));
const userMap = new Map(users.map((user) => [user.id, user]));

export default function TaskLogHistoryPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="履歴"
        subtitle="過去の実績を時系列で確認"
      />

      <SectionCard title="実績履歴" subtitle="ページングはPhase 5で対応">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>日時</TableCell>
              <TableCell>タスク</TableCell>
              <TableCell>担当</TableCell>
              <TableCell align="right">ポイント</TableCell>
              <TableCell>メモ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskLogs.map((log) => {
              const task = taskMap.get(log.taskMasterId);
              const user = userMap.get(log.userId);
              return (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.performedAt).toLocaleString()}</TableCell>
                  <TableCell>{task?.name ?? "Task"}</TableCell>
                  <TableCell>{user?.nickname ?? "User"}</TableCell>
                  <TableCell align="right">{log.pointsSnapshot}</TableCell>
                  <TableCell>
                    {log.memo ? <Chip size="small" label={log.memo} /> : "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SectionCard>
    </Stack>
  );
}
