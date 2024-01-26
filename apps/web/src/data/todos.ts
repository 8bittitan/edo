import api from "../lib/api";

export async function getTodos() {
  const { data, error } = await api.todos.get();

  if (error) {
    throw error.value;
  }

  return data.todos;
}

export async function addTodo(text: string) {
  const { data, error } = await api.todos.post({ text });

  if (error) {
    throw error.value;
  }

  return data.todos;
}

export async function completeTodo(id: number) {
  const { data, error } = await api.todo[id].put();

  if (error) {
    throw error.value;
  }

  return data?.todos;
}

export async function deleteTodo(id: number) {
  const { data, error } = await api.todo[id].delete();

  if (error) {
    throw error.value;
  }

  return data.todos;
}
