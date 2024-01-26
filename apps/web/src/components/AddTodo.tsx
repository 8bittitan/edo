import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import { addTodo } from "../data/todos";
import "./AddTodo.css";

export default function AddTodo() {
  const queryClient = useQueryClient();
  const addTodoMutation = createMutation(() => ({
    mutationKey: ["addTodo"],
    mutationFn: addTodo,
    onSuccess() {
      setAddTodoText(null);
      queryClient.refetchQueries({
        queryKey: ["todos"],
      });
    },
  }));
  const [addTodoText, setAddTodoText] = createSignal<string | null>(null);

  function handleAddTodo() {
    const text = addTodoText();
    if (!text) return;
    addTodoMutation.mutate(text);
  }

  return (
    <form
      class="addTodoForm"
      onSubmit={(e) => {
        e.preventDefault();

        handleAddTodo();
      }}
    >
      <div>
        <input
          type="text"
          name="text"
          onChange={(e) => setAddTodoText(e.target.value)}
          value={addTodoText() ?? ""}
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
}
