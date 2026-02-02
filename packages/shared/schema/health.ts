import { z } from "zod";

export const ApiMetaSchema = z.object({
  request_id: z.string().min(1),
});

export const HealthDataSchema = z.object({
  status: z.literal("ok"),
  service: z.string().min(1),
  timestamp: z.string().datetime(),
});

export const HealthResponseSchema = z.object({
  data: HealthDataSchema,
  meta: ApiMetaSchema,
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;