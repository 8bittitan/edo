import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import api from "./api";

const app = new Elysia()
  .use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE"],
    }),
  )
  .use(api)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.url}`);

export type App = typeof app;
