import React from "react";
// Custom react hook, empieza siempre con use

function useLocalStorage(itemName, initialValue) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);
  
  
    React.useEffect(() => {
      setTimeout(() => {
        try {
          // creo el localstorage
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
  
          if(!localStorageItem){ //si esta vacio, llamo al local y inserto un array vacio
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
          } else { //sino, traigo a los que estan cargados
            parsedItem = JSON.parse(localStorageItem);
          }
        
          setItem(parsedItem);
          setLoading(false);
  
        } catch(error){
          setError(error)
        }
      }, 1000)
    });
    
    // funcion de puente, entre complete,delete y localst
    const saveItem = (newItem) => {
      try {
        const stringifiedItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifiedItem);
        setItem(newItem);
      } catch(error){
        setError(error)
      }
    };
   
  
    return {
      item,
      saveItem,
      loading,
      error,
    };
}

export { useLocalStorage };