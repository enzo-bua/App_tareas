import React from "react";
import { useLocalStorage } from "./useLocalStorage";


const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter(todo => !!todo.completed).length; //cuenta los todos completados
  const totalTodos = todos.length; //total de todos

  let searchedTodos = [];

  if (!searchValue.length >= 1) { // Si el input esta vacio muestro todos los todos 
    searchedTodos = todos;
  } else { //sino, voy mostrando lo q va escribiendo, sea en may o min
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase(); //lo que va busacndo
      return todoText.includes(searchText);  //si va incluyendo lo q va escribiendo
    });
  }

  const addTodo = (text) => {
    const newTodos = [...todos]; //cargo todos en una nueva lista para poder hacer el render
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos); //asigno la nueva lista modificada, cammbio el estado
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };
  
  return (
    <TodoContext.Provider value={{
      loading,
      error,
      totalTodos,
      completedTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      addTodo,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal,
    }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
