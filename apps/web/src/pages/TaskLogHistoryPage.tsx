import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback, useMemo } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { useApiData } from "../lib/useApiData";

export default function TaskLogHistoryPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const taskMastersQuery = useApiData(
    useCallback(() => apiClient.listTaskMasters(teamId), [teamId]),
  );
  const logsQuery = useApiData(
    useCallback(() => apiClient.listTaskLogs(teamId), [teamId]),
  );

  const taskMap = useMemo(
    () => new Map(taskMastersQuery.data?.data.map((task) => [task.id, task]) ?? []),
    [taskMastersQuery.data?.data],
  );

  return (
    <Stack spacing={3}>
      <PageHeader title="履歴" subtitle="過去の実績を時系列で確認" />

      <StatusBanner
        status={logsQuery.status}
        error={logsQuery.error}
        onRetry={logsQuery.reload}
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
            {logsQuery.data?.data.map((log) => {
              const task = taskMap.get(log.taskMasterId);
              return (
                <TableRow key={log.id}>
                  <TableCell>{new Date(log.performedAt).toLocaleString()}</TableCell>
                  <TableCell>{task?.name ?? "Task"}</TableCell>
                  <TableCell>{log.performerNicknameSnapshot}</TableCell>
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
