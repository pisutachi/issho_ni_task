import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AuditLogsRoundedIcon from "@mui/icons-material/FactCheckRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import type { ReactElement } from "react";

import AuditLogsPage from "../pages/AuditLogsPage";
import InviteManagePage from "../pages/InviteManagePage";
import LoginPage from "../pages/LoginPage";
import MembersPage from "../pages/MembersPage";
import OnboardingPage from "../pages/OnboardingPage";
import SummaryPage from "../pages/SummaryPage";
import TaskLogEntryPage from "../pages/TaskLogEntryPage";
import TaskLogHistoryPage from "../pages/TaskLogHistoryPage";
import TaskMasterPage from "../pages/TaskMasterPage";
import TeamSettingsPage from "../pages/TeamSettingsPage";
import TeamSwitchPage from "../pages/TeamSwitchPage";

export type AppRoute = {
  path: string;
  label: string;
  description: string;
  element: ReactElement;
  icon?: ReactElement;
  section: "setup" | "activity" | "admin";
};

export const defaultRoute = "/task-log";

export const appRoutes: AppRoute[] = [
  {
    path: "login",
    label: "ログイン",
    description: "Supabaseログインのモック画面",
    element: <LoginPage />,
    icon: <LoginRoundedIcon />,
    section: "setup",
  },
  {
    path: "onboarding",
    label: "初期設定",
    description: "ニックネームと初期セットアップ",
    element: <OnboardingPage />,
    icon: <PersonRoundedIcon />,
    section: "setup",
  },
  {
    path: "team-switch",
    label: "チーム切替",
    description: "チームの切替と作成",
    element: <TeamSwitchPage />,
    icon: <SwapHorizRoundedIcon />,
    section: "setup",
  },
  {
    path: "task-log",
    label: "タスク記録",
    description: "素早い記録フロー",
    element: <TaskLogEntryPage />,
    icon: <TaskRoundedIcon />,
    section: "activity",
  },
  {
    path: "history",
    label: "履歴",
    description: "過去のタスク記録",
    element: <TaskLogHistoryPage />,
    icon: <HistoryRoundedIcon />,
    section: "activity",
  },
  {
    path: "summary",
    label: "集計",
    description: "メンバー別合計ポイント",
    element: <SummaryPage />,
    icon: <DashboardRoundedIcon />,
    section: "activity",
  },
  {
    path: "task-masters",
    label: "タスクマスター",
    description: "マスター一覧を管理",
    element: <TaskMasterPage />,
    icon: <ViewListRoundedIcon />,
    section: "admin",
  },
  {
    path: "invites",
    label: "招待",
    description: "招待リンク管理",
    element: <InviteManagePage />,
    icon: <MailOutlineRoundedIcon />,
    section: "admin",
  },
  {
    path: "members",
    label: "メンバー",
    description: "チームメンバー一覧",
    element: <MembersPage />,
    icon: <GroupRoundedIcon />,
    section: "admin",
  },
  {
    path: "settings",
    label: "設定",
    description: "集計周期とチーム設定",
    element: <TeamSettingsPage />,
    icon: <SettingsRoundedIcon />,
    section: "admin",
  },
  {
    path: "audit-logs",
    label: "監査ログ",
    description: "操作タイムライン",
    element: <AuditLogsPage />,
    icon: <AuditLogsRoundedIcon />,
    section: "admin",
  },
];

const navigationSectionLabels: Record<AppRoute["section"], string> = {
  setup: "セットアップ",
  activity: "アクティビティ",
  admin: "管理",
};

export const navigationSections = (
  Object.keys(navigationSectionLabels) as AppRoute["section"][]
).map((section) => ({
  label: navigationSectionLabels[section],
  items: appRoutes.filter((route) => route.section === section),
}));
