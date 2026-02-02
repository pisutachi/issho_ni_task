import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
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
  const logsQuery = useApiData(useCallback(() => apiClient.listTaskLogs(teamId), [teamId]));

  const taskMap = useMemo(
    () => new Map(taskMastersQuery.data?.data.map((task) => [task.id, task]) ?? []),
    [taskMastersQuery.data?.data],
  );

  return (
    <Stack spacing={3}>
      <PageHeader title="History" subtitle="Browse past task logs" />

      <StatusBanner status={logsQuery.status} error={logsQuery.error} onRetry={logsQuery.reload} />

      <SectionCard title="Log history" subtitle="Paging planned in Phase 5">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Member</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell>Memo</TableCell>
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
                  <TableCell>{log.memo ? <Chip size="small" label={log.memo} /> : "-"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SectionCard>
    </Stack>
  );
}
