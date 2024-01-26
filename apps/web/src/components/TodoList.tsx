import { createQuery } from "@tanstack/solid-query";
import { Switch, Match, For } from "solid-js";
import { getTodos } from "../data/todos";

import "./TodoList.css";
import Todo from "./Todo";

export default function TodoList() {
  const todos = createQuery(() => ({
    queryKey: ["todos"],
    queryFn: getTodos,
  }));

  return (
    <Switch>
      <Match when={todos.isPending}>Loading...</Match>
      <Match when={todos.error}>An error has occured</Match>
      <Match when={todos.data !== undefined}>
        <div class="todoList">
          <For each={todos.data}>{(todo) => <Todo todo={todo} />}</For>
        </div>
      </Match>
    </Switch>
  );
}
