import { useState } from "react";
import "./App.css";
import { useMemo } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Apprendre React", completed: false },
    { id: 2, text: "Apprendre Vite", completed: false },
    { id: 3, text: "Apprendre VueJS", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleTodoChange = (e) => {
    setNewTodo(e.target.value);
  };
  const onNewTodo = () => {
    if (!newTodo.trim()) return; // ignore les taches vides
    if (todos.find((todo) => todo.text === newTodo.trim())) return; // ignore les taches en double
    todos.push({ id: todos.length + 1, text: newTodo, completed: false });
    setTodos([...todos]);
    setNewTodo("");
  };

  const toDoList = todos.map((todo) => (
    <li
      key={todo.id}
      style={{ textDecoration: todo.completed ? "line-through" : "none" }}
    >
      {todo.text}
      <button
        className="btn"
        onClick={() => {
          setTodos(
            todos.map((t) =>
              t.id === todo.id ? { ...t, completed: !t.completed } : t
            )
          );
        }}
      >
        {todo.completed ? "Annuler" : "Terminer"}
      </button>
    </li>
  ));

  // memoiser le test de complétion de toutes les taches
  const allDone = useMemo(() => {
    return todos.every((todo) => todo.completed);
  }, [todos]);

  return (
    <>
      <h1>Super Todo App</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Ajouter une nouvelle tache"
          value={newTodo}
          onChange={handleTodoChange}
          maxLength="50"
        />
        <button className="btn" onClick={onNewTodo}>
          Ajouter
        </button>
      </div>

      {allDone ? (
        <p>Félicitations ! Toutes les tâches sont terminées.</p>
      ) : (
        <div>
          <ul>{toDoList}</ul>
        </div>
      )}
    </>
  );
}

export default App;
