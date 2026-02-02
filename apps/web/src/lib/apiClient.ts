const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

type ApiMeta = {
  request_id: string;
};

export type ApiResponse<T> = {
  data: T;
  meta: ApiMeta;
};

export type UserProfile = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  role: "owner" | "member";
  avatarColor: string;
  currentTeamId: string;
};

export type Team = {
  id: string;
  name: string;
  role: "owner" | "member";
  memberCount: number;
  settlementCycle: "week" | "month";
  createdAt: string;
};

export type TaskMaster = {
  id: string;
  teamId: string;
  type: "housework" | "event";
  name: string;
  points: number;
  isActive: boolean;
  sortOrder: number;
};

export type TaskLog = {
  id: string;
  teamId: string;
  userId: string;
  taskMasterId: string;
  pointsSnapshot: number;
  performerNicknameSnapshot: string;
  performedAt: string;
  memo: string | null;
};

export type SummaryRow = {
  userId: string;
  nickname: string;
  totalPoints: number;
  breakdown: {
    housework: number;
    event: number;
  };
};

export type Summary = {
  teamId: string;
  periodLabel: string;
  totalPoints: number;
  rows: SummaryRow[];
};

export type Invite = {
  id: string;
  email: string;
  status: "active" | "sent" | "revoked";
  expiresAt: string;
};

export type Member = {
  id: string;
  nickname: string;
  email: string;
  role: "owner" | "member";
  status: "active" | "removed" | "deleted";
  avatarColor: string;
};

export type AuditLog = {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
};

export type TeamSettings = {
  teamId: string;
  name: string;
  settlementCycle: "week" | "month";
  ownerName: string;
};

type ApiErrorPayload = {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
};

const buildUrl = (path: string) => {
  const base = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isApiResponse = <T>(value: unknown): value is ApiResponse<T> => {
  if (!isRecord(value)) {
    return false;
  }

  if (!("meta" in value) || !("data" in value)) {
    return false;
  }

  const meta = value.meta;
  return isRecord(meta) && typeof meta.request_id === "string";
};

const extractErrorMessage = (payload: unknown, status: number) => {
  if (!isRecord(payload)) {
    return `リクエストに失敗しました (${status})`;
  }

  const errorPayload = payload as ApiErrorPayload;
  if (errorPayload.error && typeof errorPayload.error.message === "string") {
    return errorPayload.error.message;
  }

  return `リクエストに失敗しました (${status})`;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const response = await fetch(buildUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const payload = (await response.json()) as unknown;

  if (!response.ok) {
    throw new Error(extractErrorMessage(payload, response.status));
  }

  if (!isApiResponse<T>(payload)) {
    throw new Error("APIレスポンスの形式が不正です");
  }

  return payload;
}

export const apiClient = {
  getProfile: () => request<UserProfile>("/me"),
  updateProfile: (payload: { nickname: string }) =>
    request<UserProfile>("/me", {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  listTeams: () => request<Team[]>("/teams"),
  switchTeam: (teamId: string) =>
    request<UserProfile>(`/teams/${teamId}/switch`, {
      method: "POST",
    }),
  listTaskMasters: (teamId: string) => request<TaskMaster[]>(`/teams/${teamId}/task-masters`),
  listTaskLogs: (teamId: string) => request<TaskLog[]>(`/teams/${teamId}/task-logs`),
  createTaskLog: (
    teamId: string,
    payload: { taskMasterId: string; performedAt: string; memo?: string | null },
  ) =>
    request<TaskLog>(`/teams/${teamId}/task-logs`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getSummary: (teamId: string) => request<Summary>(`/teams/${teamId}/summary`),
  listInvites: (teamId: string) => request<Invite[]>(`/teams/${teamId}/invites`),
  listMembers: (teamId: string) => request<Member[]>(`/teams/${teamId}/members`),
  getSettings: (teamId: string) => request<TeamSettings>(`/teams/${teamId}/settings`),
  updateSettings: (teamId: string, payload: Partial<TeamSettings>) =>
    request<TeamSettings>(`/teams/${teamId}/settings`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  listAuditLogs: (teamId: string) => request<AuditLog[]>(`/teams/${teamId}/audit-logs`),
};

export { API_BASE_URL };
