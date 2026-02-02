export type MockTaskMaster = {
  id: string;
  teamId: string;
  type: "housework" | "event";
  name: string;
  points: number;
  isActive: boolean;
  sortOrder: number;
};

export const taskMasters: MockTaskMaster[] = [
  {
    id: "tm_laundry",
    teamId: "team_aurora",
    type: "housework",
    name: "洗濯",
    points: 3,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "tm_dishes",
    teamId: "team_aurora",
    type: "housework",
    name: "食器洗い",
    points: 2,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "tm_grocery",
    teamId: "team_aurora",
    type: "event",
    name: "買い出し",
    points: 5,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "tm_plants",
    teamId: "team_aurora",
    type: "event",
    name: "植物の世話",
    points: 4,
    isActive: false,
    sortOrder: 4,
  },
  {
    id: "tm_cleaning",
    teamId: "team_lotus",
    type: "housework",
    name: "スタジオ清掃",
    points: 6,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "tm_meeting",
    teamId: "team_lotus",
    type: "event",
    name: "週次ミーティング",
    points: 2,
    isActive: true,
    sortOrder: 2,
  },
];
