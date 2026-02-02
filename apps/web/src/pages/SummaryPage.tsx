import {
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCallback } from "react";

import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import StatusBanner from "../components/StatusBanner";
import { apiClient } from "../lib/apiClient";
import { useApiData } from "../lib/useApiData";

export default function SummaryPage() {
  const profileQuery = useApiData(useCallback(() => apiClient.getProfile(), []));
  const teamId = profileQuery.data?.data.currentTeamId ?? "";
  const summaryQuery = useApiData(useCallback(() => apiClient.getSummary(teamId), [teamId]));
  const summary = summaryQuery.data?.data;
  const maxPoints = Math.max(...(summary?.rows.map((row) => row.totalPoints) ?? [1]));

  return (
    <Stack spacing={3}>
      <PageHeader title="集計" subtitle="現在期間のメンバー別ポイント" />

      <StatusBanner
        status={summaryQuery.status}
        error={summaryQuery.error}
        onRetry={summaryQuery.reload}
      />

      <SectionCard
        title="メンバー合計"
        subtitle={summary ? `期間: ${summary.periodLabel}` : "現在期間の合計ポイント"}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>メンバー</TableCell>
              <TableCell>合計ポイント</TableCell>
              <TableCell>進捗</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summary?.rows.map((item) => (
              <TableRow key={item.userId}>
                <TableCell>{item.nickname}</TableCell>
                <TableCell>
                  <Typography fontWeight={600}>{item.totalPoints} 点</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 200 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(item.totalPoints / maxPoints) * 100}
                    sx={{ height: 8, borderRadius: 999 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </Stack>
  );
}
