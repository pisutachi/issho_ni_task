import { z } from "zod";

export const PeriodSchema = z.object({
  teamId: z.string().min(1),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
});

export type Period = z.infer<typeof PeriodSchema>;
