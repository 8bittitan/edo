import { Switch, Match } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import "./App.css";
import api from "./lib/api";

function App() {
  const todos = createQuery(() => ({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data, error } = await api.todos.get();

      if (error) {
        throw error.value;
      }

      return data;
    },
  }));

  return (
    <Switch>
      <Match when={todos.isPending}>Loading...</Match>
      <Match when={todos.error}>An error has occured</Match>
      <Match when={todos.data !== undefined}>{todos.data?.todos[0].text}</Match>
    </Switch>
  );
}

export default App;
