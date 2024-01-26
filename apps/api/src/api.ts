import { Elysia } from "elysia";

let todos = [{ text: "First todo", completed: false }];

const api = new Elysia({
  name: "@router/api",
})
  .get("/todos", () => ({ todos }), { detail: { tags: ["Todos"] } })
  .post("/todos", () => ({ created: false }));

export default api;
