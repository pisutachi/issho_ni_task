import { z } from "zod";

export const SummaryBreakdownSchema = z.object({
  housework: z.number().int().nonnegative(),
  event: z.number().int().nonnegative(),
});

export const SummaryRowSchema = z.object({
  userId: z.string().min(1),
  nickname: z.string().trim().min(1),
  totalPoints: z.number().int().nonnegative(),
  breakdown: SummaryBreakdownSchema,
});

export const SummarySchema = z.object({
  teamId: z.string().min(1),
  periodLabel: z.string().min(1),
  totalPoints: z.number().int().nonnegative(),
  rows: z.array(SummaryRowSchema),
});

export type SummaryBreakdown = z.infer<typeof SummaryBreakdownSchema>;
export type SummaryRow = z.infer<typeof SummaryRowSchema>;
export type Summary = z.infer<typeof SummarySchema>;
