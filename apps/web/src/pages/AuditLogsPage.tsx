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
  const auditQuery = useApiData(
    useCallback(() => apiClient.listAuditLogs(teamId), [teamId]),
  );

  return (
    <Stack spacing={3}>
      <PageHeader title="監査ログ" subtitle="操作履歴とアクション種別の確認" />

      <StatusBanner status={auditQuery.status} error={auditQuery.error} onRetry={auditQuery.reload} />

      <SectionCard title="アクティビティ" subtitle="最新の操作ログ">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>日時</TableCell>
              <TableCell>アクター</TableCell>
              <TableCell>アクション</TableCell>
              <TableCell>対象</TableCell>
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
