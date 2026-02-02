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
    name: "Laundry",
    points: 3,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "tm_dishes",
    teamId: "team_aurora",
    type: "housework",
    name: "Dishes",
    points: 2,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "tm_grocery",
    teamId: "team_aurora",
    type: "event",
    name: "Grocery Run",
    points: 5,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "tm_plants",
    teamId: "team_aurora",
    type: "event",
    name: "Plant Care",
    points: 4,
    isActive: false,
    sortOrder: 4,
  },
  {
    id: "tm_cleaning",
    teamId: "team_lotus",
    type: "housework",
    name: "Studio Cleaning",
    points: 6,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "tm_meeting",
    teamId: "team_lotus",
    type: "event",
    name: "Weekly Meeting",
    points: 2,
    isActive: true,
    sortOrder: 2,
  },
];
