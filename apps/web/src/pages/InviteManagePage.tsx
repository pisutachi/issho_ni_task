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
import { formatInviteStatus } from "../lib/locale";
import { useApiData } from "../lib/useApiData";

export default function InviteManagePage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const invitesQuery = useApiData(useCallback(() => apiClient.listInvites(teamId), [teamId]));

  return (
    <Stack spacing={3}>
      <PageHeader
        title="招待"
        subtitle="招待リンクを発行して管理"
        actions={<Button variant="contained">招待を作成</Button>}
      />

      <StatusBanner
        status={invitesQuery.status}
        error={invitesQuery.error}
        onRetry={invitesQuery.reload}
      />

      <SectionCard title="招待一覧" subtitle="状態と有効期限">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>招待先</TableCell>
              <TableCell>状態</TableCell>
              <TableCell>有効期限</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitesQuery.data?.data.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell>{invite.email}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={formatInviteStatus(invite.status)}
                    color={invite.status === "active" ? "secondary" : "default"}
                  />
                </TableCell>
                <TableCell>{invite.expiresAt}</TableCell>
                <TableCell align="right">
                  <Button size="small" variant="text">
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </Stack>
  );
}
