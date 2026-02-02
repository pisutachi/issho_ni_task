export type MockUser = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  role: "owner" | "member";
  avatarColor: string;
};

export const users: MockUser[] = [
  {
    id: "user_001",
    name: "Koharu Fujita",
    nickname: "Koharu",
    email: "koharu@example.com",
    role: "owner",
    avatarColor: "#38bdf8",
  },
  {
    id: "user_002",
    name: "Ren Kato",
    nickname: "Ren",
    email: "ren@example.com",
    role: "member",
    avatarColor: "#f59e0b",
  },
  {
    id: "user_003",
    name: "Mika Sugimoto",
    nickname: "Mika",
    email: "mika@example.com",
    role: "member",
    avatarColor: "#22c55e",
  },
];

export const currentUserId = users[0].id;
