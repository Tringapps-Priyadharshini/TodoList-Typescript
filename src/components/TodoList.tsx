import { useState } from "react";
import DisplayTask from './DisplayTask';
import '../assets/TodoList.css';
import {TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
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
            <h1>TODO LIST</h1>
            <TextField
            id="outlined-textarea"
            label="Enter a task"
            value = {task}
            onChange={handleTask}
            className = "taskBox"
            multiline
            />
            <Fab color="primary" aria-label="add" type = "submit" sx = {{marginLeft : '10px'}} onClick = {handleAddTask} >
                <AddIcon  />
            </Fab>
            <DisplayTask addTask = {addTask} setAddTask = {setAddTask}  />
        </div>
    );
};

export default App;

