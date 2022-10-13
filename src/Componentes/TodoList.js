import React, { Children } from "react";

function TodoList(props) {
  return(
    <section>
      <ul>
        {props.children}
      </ul>
    </section>
    );
}

export { TodoList };