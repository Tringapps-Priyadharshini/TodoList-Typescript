import { useState } from "react";
import DisplayTask from './DisplayTask';
import '../assets/TodoList.css';
import { Button } from "@mui/material";
import React from 'react';

type AddTaskType = {
        todo:string,
        completed:boolean,
        edit:boolean,
}[]

const App = () => {
    const [task,setTask]  = useState('');
    const [addTask,setAddTask] = useState<AddTaskType>([]);
    function handleTask(event:React.ChangeEvent<HTMLInputElement>){
       setTask(event.target.value) 
    }

    function handleAddTask(event:any){
        event.preventDefault();
        if(task.length === 0){
            alert("enter the task to be done");
        }
        else{
            setAddTask(addTask => [...addTask,{todo:task.trim(),completed:false,edit:false}]);
            setTask('');
        }
        
    }
   
    return (
        <div className = "todo">
            <h2>THINGS TO DO:</h2>
            {(addTask.length === 0) ? <p className="para">Looks Like You are absolutely free today</p> :
            <DisplayTask addTask = {addTask} setAddTask = {setAddTask}  />}
            <form onSubmit={handleAddTask}>
            <input type = "text" placeholder = "Enter New Task" value = {task} onChange={handleTask} required/>
            <Button variant="contained" type = "submit" sx = {{marginLeft:'30px',height: '45px'}}>Add Task</Button>
            
            </form>
        </div>
    );
};

export default App;

