import { useEffect } from "react";
import { useTask } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";


function CompletedTasksPage() {
  const { getTasks, tasks } = useTask();

  useEffect(() => {
    getTasks();
  }, []);
  
  const completedTasks = tasks.filter(task => task.completed);

  if (completedTasks.length === 0) return (<h1 className="text-center">No hay tareas completadas :( </h1>);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {completedTasks.map(task => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default CompletedTasksPage;
