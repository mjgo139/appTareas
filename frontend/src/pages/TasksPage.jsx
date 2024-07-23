import { useEffect } from "react";
import { useTask } from "../context/TasksContext"
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const {getTasks, tasks} = useTask();

  useEffect(()=>{
    getTasks()
  },[])

  const incompleteTasks  = tasks.filter(task => task.completed===false);

  if (incompleteTasks.length === 0) return (<h1 className="text-center">No hay tareas por completar :)</h1>);
  
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {incompleteTasks.map( task =>(
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  )
}

export default TasksPage