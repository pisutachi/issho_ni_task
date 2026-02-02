import type { Invite, Member, TaskMaster, Team } from "./apiClient";

const roleLabels: Record<Team["role"], string> = {
  owner: "オーナー",
  member: "メンバー",
};

const settlementCycleLabels: Record<Team["settlementCycle"], string> = {
  week: "週次",
  month: "月次",
};

const taskTypeLabels: Record<TaskMaster["type"], string> = {
  housework: "家事",
  event: "イベント",
};

const inviteStatusLabels: Record<Invite["status"], string> = {
  active: "有効",
  sent: "送信済み",
  revoked: "無効",
};

const memberStatusLabels: Record<Member["status"], string> = {
  active: "在籍",
  removed: "退会",
  deleted: "削除",
};

const auditActionLabels: Record<string, string> = {
  "task_master.updated": "タスクマスターを更新",
  "task_log.created": "タスク記録を作成",
  "invite.revoked": "招待を取り消し",
};

export const formatRole = (role: Team["role"] | Member["role"]) => roleLabels[role];

export const formatSettlementCycle = (cycle: Team["settlementCycle"]) =>
  settlementCycleLabels[cycle];

export const formatTaskType = (type: TaskMaster["type"]) => taskTypeLabels[type];

export const formatInviteStatus = (status: Invite["status"]) => inviteStatusLabels[status];

export const formatMemberStatus = (status: Member["status"]) => memberStatusLabels[status];

export const formatAuditAction = (action: string) => auditActionLabels[action] ?? action;
