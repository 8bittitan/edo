import { useQueryClient, createMutation } from "@tanstack/solid-query";

import "./Todo.css";
import { completeTodo, deleteTodo } from "../data/todos";

type Props = {
  todo: {
    text: string;
    completed: boolean;
    id: number;
  };
};

export default function Todo({ todo }: Props) {
  const queryClient = useQueryClient();
  const toggleTodoCompleteMutation = createMutation(() => ({
    mutationKey: ["toggleTodoComplete", todo.id],
    mutationFn: completeTodo,
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ["todos"],
      });
    },
  }));
  const deleteTodoMutation = createMutation(() => ({
    mutationKey: ["deleteTodo", todo.id],
    mutationFn: deleteTodo,
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ["todos"],
      });
    },
  }));

  function handleToggleTodoComplete() {
    toggleTodoCompleteMutation.mutate(todo.id);
  }

  function handleDeleteTodo() {
    deleteTodoMutation.mutate(todo.id);
  }

  return (
    <div class="todo">
      <span>{todo.text}</span>
      <input
        type="checkbox"
        checked={todo.completed}
        onClick={handleToggleTodoComplete}
      />
      <button class="danger" onClick={handleDeleteTodo}>
        X
      </button>
    </div>
  );
}
