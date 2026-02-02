import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";

const auditLogs = [
  {
    id: "audit_001",
    actor: "Koharu",
    action: "task_master.updated",
    target: "Laundry",
    createdAt: "2026-02-01 09:10",
  },
  {
    id: "audit_002",
    actor: "Ren",
    action: "task_log.created",
    target: "Dishes",
    createdAt: "2026-02-01 19:15",
  },
  {
    id: "audit_003",
    actor: "Mika",
    action: "invite.revoked",
    target: "pending@example.com",
    createdAt: "2026-01-30 18:20",
  },
];

export default function AuditLogsPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="監査ログ"
        subtitle="操作履歴とアクション種別の確認"
      />

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
            {auditLogs.map((log) => (
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
