import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider (props) {

    const {
        item: todos, //renombro 
        saveItem: saveTodos, 
        loading,
        error,
    } = useLocalStorage('TODOS_V1', []);
    const [searchValue, useSearch] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    const completedTodos = todos.filter(todo => !!todo.completed).length; //cuenta los todos completados
    const totalTodos = todos.length; //total de todos
    
    // FILTRAR BUSQUEDA DE TODOS
    let searchedTodos = [];
    
    if (!searchValue.length >= 1) {   // Si el input esta vacio muestro todos los todos 
        searchedTodos = todos;
    } else { //sino, voy mostrando lo q va escribiendo, sea en may o min
        searchedTodos = todos.filter(todo => {
            const todosText = todo.text.toLowerCase();
            const searchText = searchValue.toLocaleLowerCase(); //lo que va busacndo
            return todosText.includes(searchText) //si va incluyendo lo q va escribiendo
        });
    }

    const addTodo = (text) => {
        const newTodos = [...todos]; //cargo todos en una nueva lista para poder hacer el render
        newTodos.push({
            completed: false,
            text,
        });
        saveTodos(newTodos); //asigno la nueva lista modificada, cammbio el estado
    }
    
    
    const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text); //obitnene la posicion del todo buscado
        const newTodos = [...todos]; //cargo todos en una nueva lista para poder hacer el render
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos); //asigno la nueva lista modificada, cammbio el estado
    }
    
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text); //obitnene la posicion del todo buscado
        const newTodos = [...todos]; //cargo todos en una nueva lista para poder hacer el render
        newTodos.splice(todoIndex,1 ); //elimina, desde donde, hasta cuantos
        saveTodos(newTodos); //asigno la nueva lista modificada, cammbio el estado
    }

    return(
        
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            useSearch,
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

export { TodoContext, TodoProvider }
