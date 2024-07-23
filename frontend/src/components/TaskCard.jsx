import { Link } from "react-router-dom";
import { useTask } from "../context/TasksContext"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TaskCard({ task }) {
    const { deleteTask, updateTask } = useTask();

    const handleStatusChange = (event) => {
        const updatedTask = { ...task, completed: event.target.checked };
        updateTask(updatedTask._id, updatedTask);
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md flex flex-col justify-between h-full">
    <div>
        <header className="flex justify-between">
            <h1 className="text-2xl font-bold">{task.title}</h1>
        </header>
        <p className="text-slate-300">{task.description}</p>
        <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
    <div className="mt-4 flex items-center justify-between">
        <input
            type="checkbox"
            checked={task.completed}
            onChange={handleStatusChange}
            className="form-checkbox h-8 w-8"
        />
        <button onClick={() => { deleteTask(task._id) }} className="bg-red-500 hover:bg-red-600 text-white h-8 p-1 rounded-md">Delete</button>
        <Link to={`/tasks/${task._id}`} className="bg-blue-500 hover:bg-blue-600 text-white h-8 p-1 rounded-md">Edit</Link>
    </div>
</div>


    )
}

export default TaskCard