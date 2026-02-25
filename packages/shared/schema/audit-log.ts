import { z } from "zod";

export const AuditLogSchema = z.object({
  id: z.string().min(1),
  actor: z.string().min(1),
  action: z.string().min(1),
  target: z.string().min(1),
  createdAt: z.string().min(1),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;
