import { z } from "zod";

export const TaskLogSchema = z.object({
  id: z.string().min(1),
  teamId: z.string().min(1),
  userId: z.string().min(1),
  taskMasterId: z.string().min(1),
  pointsSnapshot: z.number().int().min(1).max(99),
  performerNicknameSnapshot: z.string().trim().min(1),
  performedAt: z.string().datetime(),
  memo: z.string().nullable(),
});

export const CreateTaskLogSchema = z.object({
  taskMasterId: z.string().min(1),
  performedAt: z.string().datetime().optional(),
  memo: z.string().optional().nullable(),
});

export const UpdateTaskLogSchema = z.object({
  taskMasterId: z.string().min(1).optional(),
  performedAt: z.string().datetime().optional(),
  memo: z.string().optional().nullable(),
});

export type TaskLog = z.infer<typeof TaskLogSchema>;
export type CreateTaskLog = z.infer<typeof CreateTaskLogSchema>;
export type UpdateTaskLog = z.infer<typeof UpdateTaskLogSchema>;
