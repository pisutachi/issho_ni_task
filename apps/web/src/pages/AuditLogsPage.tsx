import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useCallback } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { useApiData } from "../lib/useApiData";

export default function AuditLogsPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const auditQuery = useApiData(useCallback(() => apiClient.listAuditLogs(teamId), [teamId]));

  return (
    <Stack spacing={3}>
      <PageHeader title="Audit logs" subtitle="Recent actions and system events" />

      <StatusBanner
        status={auditQuery.status}
        error={auditQuery.error}
        onRetry={auditQuery.reload}
      />

      <SectionCard title="Activity" subtitle="Latest actions">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Actor</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Target</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditQuery.data?.data.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.createdAt}</TableCell>
                <TableCell>{log.actor}</TableCell>
                <TableCell>
                  <Chip label={log.action} size="small" />
                </TableCell>
                <TableCell>{log.target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </Stack>
  );
}
