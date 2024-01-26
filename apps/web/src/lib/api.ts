import { edenTreaty } from "@elysiajs/eden";
import type { App } from "@edo/api";

const api = edenTreaty<App>(
  import.meta.env.VITE_API_URL ?? "http://localhost:3000",
);

export default api;
