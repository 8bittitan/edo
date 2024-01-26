import { Elysia, t } from "elysia";

type Todo = {
  text: string;
  completed: boolean;
  id: number;
};

let todos: Record<number, Todo> = {
  1: { id: 1, text: "First todo", completed: false },
  2: { id: 2, text: "Second todo", completed: true },
};

function newTodoIndex() {
  return Object.keys(todos).length + 1;
}

function mapTodosToReturn() {
  return Object.entries(todos).map(([id, todo]) => ({
    ...todo,
    id: parseInt(id),
  }));
}

const api = new Elysia({
  name: "@router/api",
})
  .get("/todos", () => ({ todos: mapTodosToReturn() }), {
    detail: { tags: ["Todos"] },
  })
  .post(
    "/todos",
    ({ body }) => {
      const idx = newTodoIndex();
      const newTodo = {
        text: body.text,
        completed: false,
        id: idx,
      };

      todos = {
        ...todos,
        [idx]: newTodo,
      };

      return {
        todos: mapTodosToReturn(),
      };
    },
    {
      body: t.Object({
        text: t.String(),
      }),
    },
  )
  .put(
    "/todo/:id",
    ({ params, set }) => {
      const todoToChange = todos[params.id];
      if (!todoToChange) {
        set.status = 404;
        return;
      }

      todos[params.id] = {
        ...todoToChange,
        completed: !todoToChange.completed,
      };

      return {
        todos: mapTodosToReturn(),
      };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    },
  )
  .delete(
    "/todo/:id",
    ({ params }) => {
      delete todos[params.id];

      return {
        todos: mapTodosToReturn(),
      };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    },
  );

export default api;
