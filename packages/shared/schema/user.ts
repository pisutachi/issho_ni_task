import { z } from "zod";

const ControlCharsPattern = /[\u0000-\u001F\u007F]/;

export const UserRoleSchema = z.enum(["owner", "member"]);

export const NicknameSchema = z
  .string()
  .trim()
  .min(1)
  .max(20)
  .refine((value) => !ControlCharsPattern.test(value), {
    message: "Nickname contains control characters",
  });

export const UserProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  nickname: NicknameSchema,
  email: z.string().email(),
  role: UserRoleSchema,
  avatarColor: z.string().min(1),
  currentTeamId: z.string().min(1).nullable(),
});

export const UpdateUserProfileSchema = z.object({
  nickname: NicknameSchema,
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UpdateUserProfile = z.infer<typeof UpdateUserProfileSchema>;
