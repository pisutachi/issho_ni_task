import { Avatar, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import { users } from "../mocks/data/users";

export default function MembersPage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="メンバー"
        subtitle="チームメンバーの一覧と役割"
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
            {users.map((user) => (
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
                  <Chip label="active" size="small" color="secondary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </Stack>
  );
}
