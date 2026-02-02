import {
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import { taskLogs } from "../mocks/data/taskLogs";
import { users } from "../mocks/data/users";

const totals = users.map((user) => {
  const totalPoints = taskLogs
    .filter((log) => log.userId === user.id)
    .reduce((sum, log) => sum + log.pointsSnapshot, 0);

  return {
    user,
    totalPoints,
  };
});

const maxPoints = Math.max(...totals.map((item) => item.totalPoints), 1);

export default function SummaryPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="集計"
        subtitle="今期のメンバー別ポイントを確認"
      />

      <SectionCard
        title="メンバー別合計"
        subtitle="今期のポイント合計と進捗率"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>メンバー</TableCell>
              <TableCell>合計ポイント</TableCell>
              <TableCell>進捗</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totals.map((item) => (
              <TableRow key={item.user.id}>
                <TableCell>{item.user.nickname}</TableCell>
                <TableCell>
                  <Typography fontWeight={600}>{item.totalPoints} pt</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 200 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(item.totalPoints / maxPoints) * 100}
                    sx={{ height: 8, borderRadius: 999 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </Stack>
  );
}
