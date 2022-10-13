import React from "react";
import { TodoContext } from "../TodoContext";
import '../Styles/TodoForm.css'

function TodoForm() {
  const [newTodoValue, setNewTodoValue] = React.useState('');
  const {
    addTodo,
    setOpenModal,
  } = React.useContext(TodoContext)

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  }
  
  const onCancel = () => {
    setOpenModal(false);
  }

  const onSubmite = (event) => {
    event.preventDefault(); //no recarga la pagina o envia datos a algun lado
    addTodo(newTodoValue)
    setOpenModal(false);
  }

  return(
    <form onSubmit={onSubmite}>
      <label>Escribe tu nueva tarea</label>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="ingrese"
      />
      <div className="TodoForm-buttonContainer">
        <button 
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="TodoForm-button TodoForm-button--add"
        >
          Añadir
        </button>
      </div>
    </form>
  );
}

export { TodoForm };