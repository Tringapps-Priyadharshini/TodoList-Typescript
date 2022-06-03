import { useState } from "react";
import '../assets/DisplayTask.css';
import { Checkbox } from "@mui/material";
type Task = {
    todo:string,
    completed:boolean,
    edit:boolean,
}
type taskType = {
    addTask:Task[],
    setAddTask:(TaskSet: Task[]) => void
}

export default function DisplayTask({addTask,setAddTask}:taskType){
    let [count,setCount] = useState(0);
    
    function handleComplete(task:Task,completed:boolean){
        task.completed = !completed;
        setAddTask([...addTask]);
        (task.completed === true) ? setCount(++count) : setCount(--count);

    }
    function handleDelete(index:number){
        addTask.splice(index,1);
        setAddTask([...addTask]);
    }

    function handleEdit(task:Task,edit:boolean){
        task.edit = !edit;
        setAddTask([...addTask]);
    }

    function handleUpdate(event:React.ChangeEvent<HTMLInputElement>,task:Task){
        task.todo = event.target.value;
        setAddTask([...addTask]);
    }
    return(
        <>
            {
                addTask.map((task,index)=>{
                    console.log('edit',task.edit);
                    return(
                        <div key = {index} className = "todoStyle">
                            <div className = "todoDisplay">
                            <Checkbox
                            onClick={()=>{handleComplete(task,task.completed)}} 
                            className = "checked" 
                            disabled = {task.edit} 
                            checked = {task.completed}
                            />
                             {task.completed ? <input type="text" value={task.todo}  className = 'completedTask' disabled = {task.completed}/> : <input type = "text" value={task.todo} className = {task.edit ? 'displayEdit':'displayTask'} onChange = {(event)=>handleUpdate(event,task)} readOnly = {!task.edit}/>}
                             <button type="submit" disabled = {task.completed || task.edit} className = {task.completed ? 'check' : ''} onClick={() => handleDelete(index)} >x</button>
                             <button type = "submit" disabled = {task.completed} onClick = {()=>handleEdit(task,task.edit)} className = {task.completed ? 'check' : ''}>{task.edit ? 'SAVE' : 'EDIT'}</button>
                            </div>
                        </div>
                    )
                })                
            }
             <div className="completeCount">DONE : {count}</div>
        </>
    )
}
