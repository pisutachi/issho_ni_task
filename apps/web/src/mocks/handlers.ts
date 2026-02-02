import { http, HttpResponse } from "msw";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

const buildUrl = (path: string) => {
  const base = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
};

const createMeta = () => ({
  request_id: `req_${crypto.randomUUID()}`,
});

export const handlers = [
  http.get(buildUrl("/health"), () =>
    HttpResponse.json({
      data: {
        status: "ok",
        service: "mock-api",
        timestamp: new Date().toISOString(),
      },
      meta: createMeta(),
    }),
  ),
];
