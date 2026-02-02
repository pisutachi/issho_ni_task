import { type HealthResponse, HealthResponseSchema } from "@issho/shared";

const FALLBACK_API_BASE_URL = "http://localhost:8787";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? FALLBACK_API_BASE_URL;

export async function fetchHealth(
  signal?: AbortSignal,
): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`, { signal });
  const payload = await response.json();

  if (!response.ok) {
    const message =
      typeof payload?.error?.message === "string"
        ? payload.error.message
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  const parsed = HealthResponseSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error("Invalid response from API");
  }

  return parsed.data;
}

export { API_BASE_URL };
