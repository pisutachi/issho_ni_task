import { Avatar, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useCallback } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { useApiData } from "../lib/useApiData";

export default function MembersPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const membersQuery = useApiData(
    useCallback(() => apiClient.listMembers(teamId), [teamId]),
  );

  return (
    <Stack spacing={3}>
      <PageHeader title="メンバー" subtitle="チームメンバーの一覧と役割" />

      <StatusBanner
        status={membersQuery.status}
        error={membersQuery.error}
        onRetry={membersQuery.reload}
      />

      <SectionCard title="メンバー一覧" subtitle="ロールとステータスを表示">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>メンバー</TableCell>
              <TableCell>ロール</TableCell>
              <TableCell>ステータス</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {membersQuery.data?.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: user.avatarColor }}>
                      {user.nickname.slice(0, 1)}
                    </Avatar>
                    <Stack>
                      <strong>{user.nickname}</strong>
                      <span>{user.email}</span>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip label={user.status} size="small" color="secondary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </Stack>
  );
}
