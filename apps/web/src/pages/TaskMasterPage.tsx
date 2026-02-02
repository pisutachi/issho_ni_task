import {
  Button,
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
import { taskMasters } from "../mocks/data/taskMasters";

export default function TaskMasterPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="マスタ管理"
        subtitle="家事・イベントマスタの登録と無効化を確認"
        actions={<Button variant="contained">新規マスタ</Button>}
      />

      <SectionCard title="登録済みマスタ" subtitle="ポイントと状態を一覧で管理">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>タスク名</TableCell>
              <TableCell>種別</TableCell>
              <TableCell align="right">ポイント</TableCell>
              <TableCell>状態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskMasters.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.type}</TableCell>
                <TableCell align="right">{task.points}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={task.isActive ? "Active" : "Inactive"}
                    color={task.isActive ? "secondary" : "default"}
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
