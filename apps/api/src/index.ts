import { Hono } from "hono";
import { cors } from "hono/cors";
import { HealthResponseSchema } from "@issho/shared";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/health", (c) => {
  const response = HealthResponseSchema.parse({
    data: {
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString(),
    },
    meta: {
      request_id: crypto.randomUUID(),
    },
  });

  return c.json(response);
});

app.notFound((c) => {
  return c.json(
    {
      error: {
        code: "NOT_FOUND",
        message: "Not Found",
        details: {},
      },
    },
    404,
  );
});

app.onError((err, c) => {
  console.error(err);
  return c.json(
    {
      error: {
        code: "INTERNAL",
        message: "Internal Server Error",
        details: {},
      },
    },
    500,
  );
});

export default app;
