import { z } from "zod";

export const TaskMasterTypeSchema = z.enum(["housework", "event"]);

export const TaskMasterSchema = z.object({
  id: z.string().min(1),
  teamId: z.string().min(1),
  type: TaskMasterTypeSchema,
  name: z.string().trim().min(1),
  points: z.number().int().min(1).max(99),
  isActive: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
});

export const CreateTaskMasterSchema = z.object({
  type: TaskMasterTypeSchema,
  name: z.string().trim().min(1),
  points: z.number().int().min(1).max(99),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
});

export const UpdateTaskMasterSchema = z.object({
  type: TaskMasterTypeSchema.optional(),
  name: z.string().trim().min(1).optional(),
  points: z.number().int().min(1).max(99).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
});

export type TaskMaster = z.infer<typeof TaskMasterSchema>;
export type CreateTaskMaster = z.infer<typeof CreateTaskMasterSchema>;
export type UpdateTaskMaster = z.infer<typeof UpdateTaskMasterSchema>;
