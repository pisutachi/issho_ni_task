import { z } from "zod";

export const MemberRoleSchema = z.enum(["owner", "member"]);
export const MemberStatusSchema = z.enum(["active", "removed", "deleted"]);

export const MemberSchema = z.object({
  id: z.string().min(1),
  nickname: z.string().trim().min(1),
  email: z.string().email(),
  role: MemberRoleSchema,
  status: MemberStatusSchema,
  avatarColor: z.string().min(1),
});

export type Member = z.infer<typeof MemberSchema>;
