import type { ReactElement } from "react";
import AuditLogsRoundedIcon from "@mui/icons-material/FactCheckRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";

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
  section: "体験" | "実績" | "管理";
};

export const defaultRoute = "/task-log";

export const appRoutes: AppRoute[] = [
  {
    path: "login",
    label: "ログイン",
    description: "SupabaseログインのUIを想定したモック",
    element: <LoginPage />,
    icon: <LoginRoundedIcon />,
    section: "体験",
  },
  {
    path: "onboarding",
    label: "オンボーディング",
    description: "ニックネーム登録と初期体験の導線",
    element: <OnboardingPage />,
    icon: <PersonRoundedIcon />,
    section: "体験",
  },
  {
    path: "team-switch",
    label: "チーム切替",
    description: "所属チームの切替と新規作成",
    element: <TeamSwitchPage />,
    icon: <SwapHorizRoundedIcon />,
    section: "体験",
  },
  {
    path: "task-log",
    label: "実績入力",
    description: "最短導線で実績を入力する画面",
    element: <TaskLogEntryPage />,
    icon: <TaskRoundedIcon />,
    section: "実績",
  },
  {
    path: "history",
    label: "履歴",
    description: "過去の実績ログを一覧で確認",
    element: <TaskLogHistoryPage />,
    icon: <HistoryRoundedIcon />,
    section: "実績",
  },
  {
    path: "summary",
    label: "集計",
    description: "メンバー別の今期ポイント集計",
    element: <SummaryPage />,
    icon: <DashboardRoundedIcon />,
    section: "実績",
  },
  {
    path: "task-masters",
    label: "マスタ管理",
    description: "家事・イベントのマスタを編集",
    element: <TaskMasterPage />,
    icon: <ViewListRoundedIcon />,
    section: "管理",
  },
  {
    path: "invites",
    label: "招待管理",
    description: "招待リンクの発行と履歴",
    element: <InviteManagePage />,
    icon: <MailOutlineRoundedIcon />,
    section: "管理",
  },
  {
    path: "members",
    label: "メンバー",
    description: "チームメンバーの一覧",
    element: <MembersPage />,
    icon: <GroupRoundedIcon />,
    section: "管理",
  },
  {
    path: "settings",
    label: "設定",
    description: "精算周期やチーム設定",
    element: <TeamSettingsPage />,
    icon: <SettingsRoundedIcon />,
    section: "管理",
  },
  {
    path: "audit-logs",
    label: "監査ログ",
    description: "変更履歴や操作ログの確認",
    element: <AuditLogsPage />,
    icon: <AuditLogsRoundedIcon />,
    section: "管理",
  },
];

export const navigationSections = ["体験", "実績", "管理"].map((section) => ({
  label: section,
  items: appRoutes.filter((route) => route.section === section),
}));
