import { useState } from "react";
import '../assets/DisplayTask.css';

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
                             <input type = "checkbox" onClick = {()=>{handleComplete(task,task.completed)}} className = "checked" disabled = {task.edit}></input> 
                             {task.completed ? <input type="text" value={task.todo}  className = 'completedTask' disabled = {task.completed}/> : <input type = "text" value={task.todo} className = {task.edit ? 'displayEdit':'displayTask'} onChange = {(event)=>handleUpdate(event,task)} readOnly = {!task.edit}/>}
                             <button type="submit" disabled = {task.completed || task.edit} onClick={() => handleDelete(index)}>x</button>
                             <button type = "submit" disabled = {task.completed} onClick = {()=>handleEdit(task,task.edit)}>{task.edit ? 'SAVE' : 'EDIT'}</button>
                            </div>
                        </div>
                        
                    )
                })                
            }
            <p className="completeCount">DONE : {count}</p>
            {console.log(addTask)}
        </>
    )
}