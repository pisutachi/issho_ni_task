import { Button, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useCallback } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { useApiData } from "../lib/useApiData";

export default function InviteManagePage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const invitesQuery = useApiData(
    useCallback(() => apiClient.listInvites(teamId), [teamId]),
  );

  return (
    <Stack spacing={3}>
      <PageHeader
        title="招待管理"
        subtitle="招待リンクの発行とステータス管理"
        actions={<Button variant="contained">新規招待を発行</Button>}
      />

      <StatusBanner
        status={invitesQuery.status}
        error={invitesQuery.error}
        onRetry={invitesQuery.reload}
      />

      <SectionCard title="招待一覧" subtitle="リンクの有効期限と状態">
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
                    label={invite.status}
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
