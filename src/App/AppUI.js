import React from "react";
import {TodoContext} from '../TodoContext';
import {TodoCounter} from '../Componentes/TodoCounter';
import {TodoSearch} from '../Componentes/TodoSearch';
import {TodoList} from '../Componentes/TodoList';
import {TodoItem} from '../Componentes/TodoItem';
import { CreateTodoButton } from '../Componentes/CreateTodoButton';
import { Modal } from "../Modal";
import { TodoForm } from "../TodoForm";

function AppUI () {
  const { 
    error, 
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo ,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);

  return ( 
    <React.Fragment> 
    
      <TodoCounter/>
    
      <TodoSearch />
  
      <TodoList>
        {error && <p>Hubo un error...</p>}
        {loading && <p>Cargando...</p>}
        {(!loading && !searchedTodos.length) && <p>Crea tu primer Tarea!</p>}
        
        {searchedTodos.map(todo => (
          <TodoItem 
            key={todo.text} 
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {openModal && (
        <Modal>
          <TodoForm></TodoForm>
        </Modal>
        )}
          
      <CreateTodoButton 
        setOpenModal={setOpenModal}
      />
    </React.Fragment>
     );
}
 
export { AppUI };