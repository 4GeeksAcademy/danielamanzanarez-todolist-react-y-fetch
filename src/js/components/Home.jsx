import React from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { useState, useEffect } from "react";
import ListaTareas from "./ListaTareas.jsx";

//create your first component
const Home = () => {
	const [tareasItems, setTareasItems] = useState([]);
  	const [newTarea, setNewTarea] = useState("");

	useEffect(() => {
		todoList()
	}, [])

	const todoList = () => {
		fetch('https://playground.4geeks.com/todo/users/reactdaniela', {
			// method: "GET",
			// body: JSON.stringify(todo),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  return resp.json(); 
		  })
		  .then(data => {
			  console.log(data);
			  setTareasItems(data.todos)
		  })
		  .catch(error => {
			  // Manejo de errores
			  console.log(error);
		  });
}
const styleBoton = {
    backgroundColor: "black",
    border: "solid 2px purple",
    color: "violet",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    width: "130px",
    padding: "5px",
    marginTop: "5px",
    marginLeft: "75px",
  };

  const craerTareaInput = () => {
	fetch('https://playground.4geeks.com/todo/todos/reactdaniela', {
		method: "POST",
		body: JSON.stringify(
			{
				label: newTarea,
				is_done: false
			  }
		),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {	todoList()
		  return resp.json(); 
	  })
	  .then(data => {
		  console.log(data);
		  setTareasItems(data.todos)
	  })
	  .catch(error => {
		  // Manejo de errores
		  console.log(error);
	  });
}

const EliminarTareaInput = (id) => {
    fetch('https://playground.4geeks.com/todo/todos/'+ id,  {
      method: "DELETE",
      })
    //   .then(resp => {	
    //     return resp.json(); 
    //   })
      .then( ()=> {
			setTareasItems(tareasItems.filter( tarea => tarea.id != id))
        // setTareasItems(data.todos);
      })
      .catch(error => {
        // Manejo de errores
        console.log(error);
      });
  }

  const crearTarea = (e) => {
	if (e.key === "Enter"){
		craerTareaInput()
	// setTareasItems([...tareasItems, { label: newTarea, done: false }]);	
	}
  };

  const botonCrearTarea = () => {
	craerTareaInput()
    // setTareasItems([...tareasItems, { label: newTarea, done: false }]);
  };
//   const botonEliminarTarea = () => {
// 	EliminarTareaInput()
// 	// setTareasItems(tareasItems.slice(0, -1));
//   };

	return (
		<div className="container">
		{/* {tareasItems.map((t) => {
			return (
				<div key={t.label}> {t.label} </div>
			)
		}
	)} */}
	   <h1>Todo List</h1>
      <button style={styleBoton} onClick={botonCrearTarea} > Agregar Tarea</button>
      {/* <button style={styleBoton} onClick={botonEliminarTarea} > Eliminar Tarea</button> */}
      <h2>Formulario de tarea:</h2>

	  <li>
	  <input
            type="text"
            placeholder="agrega una tarea"
			//crear una funcion en el onclik u onkeyD
			onChange={(e) => setNewTarea(e.target.value)}
			onKeyDown={crearTarea}
            
          />
		</li>

	  <ListaTareas eliminar={EliminarTareaInput} tareasAgregadas={tareasItems} />
	  {/* <div className="numTareas">{tareasItems.length} tareas ingresadas</div> // no se por que no me funciona con el codigo */}
		</div>
	);
};

export default Home;