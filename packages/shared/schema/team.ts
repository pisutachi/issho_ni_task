import { z } from "zod";

export const TeamRoleSchema = z.enum(["owner", "member"]);
export const SettlementCycleSchema = z.enum(["week", "month"]);

export const TeamSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  role: TeamRoleSchema,
  memberCount: z.number().int().nonnegative(),
  settlementCycle: SettlementCycleSchema,
  createdAt: z.string().datetime(),
});

export const CreateTeamSchema = z.object({
  name: z.string().trim().min(1),
  settlementCycle: SettlementCycleSchema.optional(),
});

export const TeamSettingsSchema = z.object({
  teamId: z.string().min(1),
  name: z.string().trim().min(1),
  settlementCycle: SettlementCycleSchema,
  ownerName: z.string().min(1),
});

export const UpdateTeamSettingsSchema = z.object({
  name: z.string().trim().min(1).optional(),
  settlementCycle: SettlementCycleSchema.optional(),
});

export type Team = z.infer<typeof TeamSchema>;
export type CreateTeam = z.infer<typeof CreateTeamSchema>;
export type TeamSettings = z.infer<typeof TeamSettingsSchema>;
export type UpdateTeamSettings = z.infer<typeof UpdateTeamSettingsSchema>;
