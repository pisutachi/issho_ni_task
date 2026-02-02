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
  section: "Explore" | "Activity" | "Admin";
};

export const defaultRoute = "/task-log";

export const appRoutes: AppRoute[] = [
  {
    path: "login",
    label: "Login",
    description: "Mock Supabase login UI",
    element: <LoginPage />,
    icon: <LoginRoundedIcon />,
    section: "Explore",
  },
  {
    path: "onboarding",
    label: "Onboarding",
    description: "Nickname and starter setup",
    element: <OnboardingPage />,
    icon: <PersonRoundedIcon />,
    section: "Explore",
  },
  {
    path: "team-switch",
    label: "Team Switch",
    description: "Switch or create teams",
    element: <TeamSwitchPage />,
    icon: <SwapHorizRoundedIcon />,
    section: "Explore",
  },
  {
    path: "task-log",
    label: "Log Entry",
    description: "Fast logging flow",
    element: <TaskLogEntryPage />,
    icon: <TaskRoundedIcon />,
    section: "Activity",
  },
  {
    path: "history",
    label: "History",
    description: "Past task logs",
    element: <TaskLogHistoryPage />,
    icon: <HistoryRoundedIcon />,
    section: "Activity",
  },
  {
    path: "summary",
    label: "Summary",
    description: "Member totals",
    element: <SummaryPage />,
    icon: <DashboardRoundedIcon />,
    section: "Activity",
  },
  {
    path: "task-masters",
    label: "Task Masters",
    description: "Manage master list",
    element: <TaskMasterPage />,
    icon: <ViewListRoundedIcon />,
    section: "Admin",
  },
  {
    path: "invites",
    label: "Invites",
    description: "Invite links",
    element: <InviteManagePage />,
    icon: <MailOutlineRoundedIcon />,
    section: "Admin",
  },
  {
    path: "members",
    label: "Members",
    description: "Team roster",
    element: <MembersPage />,
    icon: <GroupRoundedIcon />,
    section: "Admin",
  },
  {
    path: "settings",
    label: "Settings",
    description: "Settlement cycle + team settings",
    element: <TeamSettingsPage />,
    icon: <SettingsRoundedIcon />,
    section: "Admin",
  },
  {
    path: "audit-logs",
    label: "Audit Logs",
    description: "Activity timeline",
    element: <AuditLogsPage />,
    icon: <AuditLogsRoundedIcon />,
    section: "Admin",
  },
];

export const navigationSections = ["Explore", "Activity", "Admin"].map((section) => ({
  label: section,
  items: appRoutes.filter((route) => route.section === section),
}));
