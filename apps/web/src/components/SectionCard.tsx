import { Box, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function SectionCard({ title, subtitle, actions, children }: SectionCardProps) {
  return (
    <Paper className="app-surface" sx={{ p: { xs: 2, md: 3 } }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions ? <Stack direction="row" spacing={1}>{actions}</Stack> : null}
        </Stack>
        {children}
      </Stack>
    </Paper>
  );
}
