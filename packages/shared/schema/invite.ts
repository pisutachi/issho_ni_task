import { z } from "zod";

export const InviteStatusSchema = z.enum(["active", "sent", "revoked"]);

export const InviteSchema = z.object({
  id: z.string().min(1),
  email: z.string().email().nullable().optional(),
  status: InviteStatusSchema,
  expiresAt: z.string().min(1),
});

export const CreateInviteSchema = z.object({
  email: z.string().email().optional().nullable(),
});

export type Invite = z.infer<typeof InviteSchema>;
export type CreateInvite = z.infer<typeof CreateInviteSchema>;
