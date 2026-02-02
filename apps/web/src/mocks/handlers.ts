import { http, HttpResponse } from "msw";

import type {
  AuditLog,
  Invite,
  Member,
  Summary,
  TaskLog,
  TeamSettings,
  UserProfile,
} from "../lib/apiClient";
import { taskLogs } from "./data/taskLogs";
import { taskMasters } from "./data/taskMasters";
import { teams } from "./data/teams";
import { users } from "./data/users";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

const buildUrl = (path: string) => {
  const base = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
};

const createMeta = () => ({
  request_id: `req_${crypto.randomUUID()}`,
});

const ok = <T,>(data: T) =>
  HttpResponse.json({
    data,
    meta: createMeta(),
  });

const errorResponse = (status: number, code: string, message: string) =>
  HttpResponse.json(
    {
      error: {
        code,
        message,
        details: {},
      },
    },
    { status },
  );

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const resolveParam = (value: string | readonly string[] | undefined) =>
  Array.isArray(value) ? value[0] : value ?? "";

let currentUserId = users[0].id;
let currentTeamId = teams[0].id;
let userStore = [...users];
let teamStore = [...teams];
let taskLogStore: TaskLog[] = [...taskLogs];

let inviteStore: Invite[] = [
  {
    id: "inv_001",
    email: "newmember@example.com",
    status: "active",
    expiresAt: "2026-02-10",
  },
  {
    id: "inv_002",
    email: "pending@example.com",
    status: "sent",
    expiresAt: "2026-02-07",
  },
  {
    id: "inv_003",
    email: "archived@example.com",
    status: "revoked",
    expiresAt: "2026-01-28",
  },
];

const auditLogStore: AuditLog[] = [
  {
    id: "audit_001",
    actor: "Koharu",
    action: "task_master.updated",
    target: "Laundry",
    createdAt: "2026-02-01 09:10",
  },
  {
    id: "audit_002",
    actor: "Ren",
    action: "task_log.created",
    target: "Dishes",
    createdAt: "2026-02-01 19:15",
  },
  {
    id: "audit_003",
    actor: "Mika",
    action: "invite.revoked",
    target: "pending@example.com",
    createdAt: "2026-01-30 18:20",
  },
];

const taskMasterMap = new Map(taskMasters.map((task) => [task.id, task]));

const buildProfile = (): UserProfile => {
  const currentUser = userStore.find((user) => user.id === currentUserId) ?? userStore[0];
  return {
    ...currentUser,
    currentTeamId,
  };
};

const buildMembers = (): Member[] =>
  userStore.map((user) => ({
    id: user.id,
    nickname: user.nickname,
    email: user.email,
    role: user.role,
    status: "active",
    avatarColor: user.avatarColor,
  }));

const buildSummary = (teamId: string): Summary => {
  const logs = taskLogStore.filter((log) => log.teamId === teamId);
  const rows = userStore.map((user) => {
    const userLogs = logs.filter((log) => log.userId === user.id);
    const breakdown = userLogs.reduce(
      (acc, log) => {
        const task = taskMasterMap.get(log.taskMasterId);
        if (task?.type === "event") {
          acc.event += log.pointsSnapshot;
        } else {
          acc.housework += log.pointsSnapshot;
        }
        return acc;
      },
      { housework: 0, event: 0 },
    );

    return {
      userId: user.id,
      nickname: user.nickname,
      totalPoints: breakdown.housework + breakdown.event,
      breakdown,
    };
  });

  const totalPoints = rows.reduce((sum, row) => sum + row.totalPoints, 0);

  return {
    teamId,
    periodLabel: "2026-01-29 ~ 2026-02-04",
    totalPoints,
    rows,
  };
};

export const handlers = [
  http.get(buildUrl("/health"), () =>
    ok({
      status: "ok",
      service: "mock-api",
      timestamp: new Date().toISOString(),
    }),
  ),
  http.get(buildUrl("/me"), () => ok(buildProfile())),
  http.patch(buildUrl("/me"), async ({ request }) => {
    const payload = await request.json();
    if (!isRecord(payload) || typeof payload.nickname !== "string") {
      return errorResponse(400, "VALIDATION_ERROR", "nickname is required");
    }

    userStore = userStore.map((user) =>
      user.id === currentUserId ? { ...user, nickname: payload.nickname } : user,
    );

    return ok(buildProfile());
  }),
  http.get(buildUrl("/teams"), () => ok(teamStore)),
  http.post(buildUrl("/teams/:teamId/switch"), ({ params }) => {
    const teamId = resolveParam(params.teamId);
    const exists = teamStore.some((team) => team.id === teamId);
    if (!exists) {
      return errorResponse(404, "NOT_FOUND", "Team not found");
    }
    currentTeamId = teamId;
    return ok(buildProfile());
  }),
  http.get(buildUrl("/teams/:teamId/task-masters"), ({ params }) => {
    const teamId = resolveParam(params.teamId);
    return ok(taskMasters.filter((task) => task.teamId === teamId));
  }),
  http.get(buildUrl("/teams/:teamId/task-logs"), ({ params }) => {
    const teamId = resolveParam(params.teamId);
    const logs = taskLogStore
      .filter((log) => log.teamId === teamId)
      .sort((a, b) => b.performedAt.localeCompare(a.performedAt));
    return ok(logs);
  }),
  http.post(buildUrl("/teams/:teamId/task-logs"), async ({ params, request }) => {
    const teamId = resolveParam(params.teamId);
    const payload = await request.json();
    if (!isRecord(payload) || typeof payload.taskMasterId !== "string") {
      return errorResponse(400, "VALIDATION_ERROR", "taskMasterId is required");
    }

    const taskMaster = taskMasters.find((task) => task.id === payload.taskMasterId);
    if (!taskMaster) {
      return errorResponse(404, "NOT_FOUND", "Task master not found");
    }

    const currentUser = userStore.find((user) => user.id === currentUserId) ?? userStore[0];
    const performedAt =
      typeof payload.performedAt === "string"
        ? payload.performedAt
        : new Date().toISOString();

    const newLog: TaskLog = {
      id: `log_${crypto.randomUUID()}`,
      teamId,
      userId: currentUser.id,
      taskMasterId: taskMaster.id,
      pointsSnapshot: taskMaster.points,
      performerNicknameSnapshot: currentUser.nickname,
      performedAt,
      memo: typeof payload.memo === "string" ? payload.memo : null,
    };

    taskLogStore = [newLog, ...taskLogStore];
    return ok(newLog);
  }),
  http.get(buildUrl("/teams/:teamId/summary"), ({ params }) => {
    const teamId = resolveParam(params.teamId);
    return ok(buildSummary(teamId));
  }),
  http.get(buildUrl("/teams/:teamId/invites"), () => ok(inviteStore)),
  http.get(buildUrl("/teams/:teamId/members"), () => ok(buildMembers())),
  http.get(buildUrl("/teams/:teamId/settings"), ({ params }) => {
    const teamId = resolveParam(params.teamId);
    const team = teamStore.find((item) => item.id === teamId) ?? teamStore[0];
    const owner = userStore.find((user) => user.role === "owner") ?? userStore[0];

    const settings: TeamSettings = {
      teamId: team.id,
      name: team.name,
      settlementCycle: team.settlementCycle,
      ownerName: owner.nickname,
    };

    return ok(settings);
  }),
  http.patch(buildUrl("/teams/:teamId/settings"), async ({ params, request }) => {
    const teamId = resolveParam(params.teamId);
    const payload = await request.json();
    if (!isRecord(payload)) {
      return errorResponse(400, "VALIDATION_ERROR", "payload is required");
    }

    teamStore = teamStore.map((team) =>
      team.id === teamId
        ? {
            ...team,
            name: typeof payload.name === "string" ? payload.name : team.name,
            settlementCycle:
              payload.settlementCycle === "week" || payload.settlementCycle === "month"
                ? payload.settlementCycle
                : team.settlementCycle,
          }
        : team,
    );

    const updatedTeam = teamStore.find((team) => team.id === teamId) ?? teamStore[0];
    const owner = userStore.find((user) => user.role === "owner") ?? userStore[0];

    return ok({
      teamId: updatedTeam.id,
      name: updatedTeam.name,
      settlementCycle: updatedTeam.settlementCycle,
      ownerName: owner.nickname,
    });
  }),
  http.get(buildUrl("/teams/:teamId/audit-logs"), () => ok(auditLogStore)),
];
