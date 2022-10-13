import React from "react";
import '../Styles/TodoSearch.css';
import { TodoContext } from "../TodoContext";

function TodoSearch() {
  const { searchValue, setSearch } = React.useContext(TodoContext);
  
  const onSerchValueChange = (event) =>{
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  return(
    <input 
    className="TodoSearch" 
    placeholder="Buscar tarea"
    value={searchValue}
    onChange={onSerchValueChange}
    />
  );
}

export { TodoSearch }; 