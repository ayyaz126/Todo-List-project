import React, { useEffect, useState } from 'react';

function Todo() {
    //hook for holding all the taks;
    const[todos,setTodos] = useState([]);

    //hook for getting the values from input fields;
    const[newTodo, setNewTodo]= useState();
    
    //

    //function for saing the data into local storage of browser;
    const saveData = (newTodos) =>{
       localStorage.setItem("tasks", JSON.stringify(newTodos));   
    }
     // code for showing all the data uaing useEffect

     useEffect(() => {
         if(localStorage.getItem("tasks")){
             setTodos(JSON.parse(localStorage.getItem("tasks")));
         }
     },[])
    // function for getting the data from input fields and assign the data to the hook.
    const AddTodo = () => {
 
         let newTodos = [...todos, {todo: newTodo.trim(), id: Date.now() }]
        
         setTodos(newTodos);
         setNewTodo("");
         saveData(newTodos);
    }

    //function  for deleteing the taks
    const deleteTodo = (id) =>{
        let  newTodos = todos . filter((todo) =>  todo.id !==id);
        setTodos(newTodos);

       //also update ing localStorage
       saveData(newTodos); 
    }

  return (
    <div className='container' >
       <h1 className='text-center dispaly-3'> Enter Tasks  </h1>
       <form  onSubmit={(e) => {
           e.preventDefault();
       }}>
             <div className='form-group'>
                <label>Enter Task: </label>
                <input type = "text"  value={newTodo}  onChange={(e)=> setNewTodo(e.target.value)}  className='form-control'  />     
            </div>  

            <div className='form-group'>
                <button  onClick={AddTodo} className='btn btn-outline-Danger'> Save Tasks </button>   
            </div>    
       </form> 
       <hr/>
       <table className='table table-bordered' >
          <tr>
              <th>  All Tasks </th>
              <th>  ID </th>
              <th>  Delete </th>
         </tr>
              {
                  todos.map((tod) => (
                      <tr>
                          <td> {tod.id} </td>
                          <td> {tod.todo} </td>
                          <td>  <button  onClick={()=> deleteTodo(tod.id)}   className=' btn btn-outline info'> Delete Taks </button> </td>
                   </tr>
                  ))
              }
          

       </table>
    </div>
  )
}

export default Todo;