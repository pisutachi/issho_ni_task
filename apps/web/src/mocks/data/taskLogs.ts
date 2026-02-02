export type MockTaskLog = {
  id: string;
  teamId: string;
  userId: string;
  taskMasterId: string;
  pointsSnapshot: number;
  performerNicknameSnapshot: string;
  performedAt: string;
  memo: string | null;
};

export const taskLogs: MockTaskLog[] = [
  {
    id: "log_001",
    teamId: "team_aurora",
    userId: "user_001",
    taskMasterId: "tm_laundry",
    pointsSnapshot: 3,
    performerNicknameSnapshot: "Koharu",
    performedAt: "2026-02-01T08:20:00+09:00",
    memo: "Early morning load",
  },
  {
    id: "log_002",
    teamId: "team_aurora",
    userId: "user_002",
    taskMasterId: "tm_dishes",
    pointsSnapshot: 2,
    performerNicknameSnapshot: "Ren",
    performedAt: "2026-02-01T19:10:00+09:00",
    memo: "After dinner",
  },
  {
    id: "log_003",
    teamId: "team_aurora",
    userId: "user_003",
    taskMasterId: "tm_grocery",
    pointsSnapshot: 5,
    performerNicknameSnapshot: "Mika",
    performedAt: "2026-01-31T18:00:00+09:00",
    memo: "Weekend restock",
  },
  {
    id: "log_004",
    teamId: "team_lotus",
    userId: "user_002",
    taskMasterId: "tm_cleaning",
    pointsSnapshot: 6,
    performerNicknameSnapshot: "Ren",
    performedAt: "2026-02-01T15:30:00+09:00",
    memo: "Studio refresh",
  },
  {
    id: "log_005",
    teamId: "team_lotus",
    userId: "user_001",
    taskMasterId: "tm_meeting",
    pointsSnapshot: 2,
    performerNicknameSnapshot: "Koharu",
    performedAt: "2026-01-30T10:00:00+09:00",
    memo: null,
  },
];
