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

export default function InviteManagePage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const invitesQuery = useApiData(useCallback(() => apiClient.listInvites(teamId), [teamId]));

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Invites"
        subtitle="Issue and track invite links"
        actions={<Button variant="contained">Create invite</Button>}
      />

      <StatusBanner
        status={invitesQuery.status}
        error={invitesQuery.error}
        onRetry={invitesQuery.reload}
      />

      <SectionCard title="Invite list" subtitle="Status and expiration">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Invitee</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                    Details
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
