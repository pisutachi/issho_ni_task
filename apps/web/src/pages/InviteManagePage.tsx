import { Button, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";

const invites = [
  {
    id: "inv_001",
    email: "newmember@example.com",
    status: "active",
    expiresAt: "2026-02-10",
  },
  {
    id: "inv_002",
    email: "pending@example.com",
    status: "sent",
    expiresAt: "2026-02-07",
  },
  {
    id: "inv_003",
    email: "archived@example.com",
    status: "revoked",
    expiresAt: "2026-01-28",
  },
];

export default function InviteManagePage() {
  return (
    <Stack spacing={3}>
      <PageHeader
        title="招待管理"
        subtitle="招待リンクの発行とステータス管理"
        actions={<Button variant="contained">新規招待を発行</Button>}
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
            {invites.map((invite) => (
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
