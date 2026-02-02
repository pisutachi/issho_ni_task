export type MockTeam = {
  id: string;
  name: string;
  role: "owner" | "member";
  memberCount: number;
  settlementCycle: "week" | "month";
  createdAt: string;
};

export const teams: MockTeam[] = [
  {
    id: "team_aurora",
    name: "オーロラハウス",
    role: "owner",
    memberCount: 3,
    settlementCycle: "week",
    createdAt: "2025-12-05T09:00:00+09:00",
  },
  {
    id: "team_lotus",
    name: "ロータススタジオ",
    role: "member",
    memberCount: 5,
    settlementCycle: "month",
    createdAt: "2025-10-15T09:00:00+09:00",
  },
];

export const defaultTeamId = teams[0].id;
