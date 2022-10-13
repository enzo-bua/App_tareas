import React from "react";
import '../Styles/TodoCounter.css';
import { TodoContext } from "../TodoContext";

function TodoCounter(){
  const { totalTodos, completedTodos } = React.useContext(TodoContext);

  return (
    <h2 className="TodoCounter">Has completado {completedTodos} de {totalTodos} TAREAS</h2>
  );
}

export { TodoCounter };