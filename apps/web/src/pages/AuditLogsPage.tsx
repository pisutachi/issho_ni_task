import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useCallback } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { formatAuditAction } from "../lib/locale";
import { useApiData } from "../lib/useApiData";

export default function AuditLogsPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const auditQuery = useApiData(useCallback(() => apiClient.listAuditLogs(teamId), [teamId]));

  return (
    <Stack spacing={3}>
      <PageHeader title="監査ログ" subtitle="最近の操作とシステムイベント" />

      <StatusBanner
        status={auditQuery.status}
        error={auditQuery.error}
        onRetry={auditQuery.reload}
      />

      <SectionCard title="アクティビティ" subtitle="最新アクション">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>時刻</TableCell>
              <TableCell>実行者</TableCell>
              <TableCell>操作</TableCell>
              <TableCell>対象</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditQuery.data?.data.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.createdAt}</TableCell>
                <TableCell>{log.actor}</TableCell>
                <TableCell>
                  <Chip label={formatAuditAction(log.action)} size="small" />
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
