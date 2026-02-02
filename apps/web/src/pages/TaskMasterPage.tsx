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
        title="Task masters"
        subtitle="Manage housework and event master list"
        actions={<Button variant="contained">New master</Button>}
      />

      <StatusBanner
        status={taskMastersQuery.status}
        error={taskMastersQuery.error}
        onRetry={taskMastersQuery.reload}
      />

      <SectionCard title="Registered masters" subtitle="Points and status overview">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskMastersQuery.data?.data.map((task) => (
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
