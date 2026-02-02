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
import { useCallback } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { formatTaskType } from "../lib/locale";
import { useApiData } from "../lib/useApiData";

export default function TaskMasterPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const taskMastersQuery = useApiData(
    useCallback(() => apiClient.listTaskMasters(teamId), [teamId]),
  );

  return (
    <Stack spacing={3}>
      <PageHeader
        title="タスクマスター"
        subtitle="家事とイベントのマスター一覧を管理"
        actions={<Button variant="contained">新規作成</Button>}
      />

      <StatusBanner
        status={taskMastersQuery.status}
        error={taskMastersQuery.error}
        onRetry={taskMastersQuery.reload}
      />

      <SectionCard title="登録済みタスク" subtitle="ポイントと状態の一覧">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>タスク</TableCell>
              <TableCell>種別</TableCell>
              <TableCell align="right">ポイント</TableCell>
              <TableCell>状態</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskMastersQuery.data?.data.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{formatTaskType(task.type)}</TableCell>
                <TableCell align="right">{task.points}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={task.isActive ? "有効" : "無効"}
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
