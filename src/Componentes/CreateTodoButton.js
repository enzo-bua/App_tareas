import React from "react";
import '../Styles/CreateTodoButton.css';

function CreateTodoButton(props) {

  const onClickButton = () => {
    props.setOpenModal(prevState => !prevState); //si el modal esta abierto es true y sino folse
  }
  
  return(
    // lo que empiece con on, recibe los eventos de los usuarios
    <button 
    className="CreateTodoButton"
    onClick={onClickButton}
    >
      +
    </button>
  );
}

export { CreateTodoButton };