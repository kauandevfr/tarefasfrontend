import { createContext, useContext, useState } from "react";
import instance from "../services/instance";

export const TaskContext = createContext({});

export const useTask = () => {
    return useContext(TaskContext);
};

export function TasksProvider({ children }) {

    const initialTasks = {
        loading: true,
        items: [],
        total: null,
        completed: null
    }

    const [tasks, setTasks] = useState(initialTasks);

    const listTasks = async date => {
        setTasks(initialTasks);
        try {
            const { data } = await instance.get('/tasks', { params: { date } })
            setTasks({
                loading: false,
                items: data,
                total: data.length,
                completed: data.filter(t => t.completed).length
            });
        } catch (error) {
            console.error({ ...error });
        }
    };

    const initialTask = {
        open: false,
        data: {},
        type: ''
    }

    const [showTask, setShowTask] = useState(initialTask)

    const [deleteTask, setDeleteTask] = useState({
        open: false,
        id: null
    })

    return (
        <TaskContext.Provider
            value={{
                listTasks,
                tasks,
                showTask,
                setShowTask,
                initialTask,
                deleteTask,
                setDeleteTask
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}