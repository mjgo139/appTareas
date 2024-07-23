import { createContext, useContext, useEffect, useState } from "react";
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTask deberia de estar dentro del TaskProvider')
    }

    return context;
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }

    const updateTask = async (id, updatedTask) => {
        try {
            const res = await updateTaskRequest(id, updatedTask)
            console.log(res)
            getTasks()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
            console.log(error)

        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return (res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask, getTasks, getTask }}>
            {children}
        </TaskContext.Provider>
    )
}