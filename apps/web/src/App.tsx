import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <TodoList />
      <AddTodo />
    </div>
  );
}

export default App;
