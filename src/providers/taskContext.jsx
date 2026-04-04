import { createContext, useContext, useState } from "react";
import instance from "../services/instance";
import { useGlobal } from "./globalContext";

export const TaskContext = createContext({});

export const useTask = () => {
    return useContext(TaskContext);
};

export function TasksProvider({ children }) {

    const { showError } = useGlobal()

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
            return showError(error)
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

    const [filter, setFilter] = useState({ status: 'all', priority: null })

    const filteredTasks = tasks.items.filter(task => {
        const statusMatch =
            filter.status === 'all' ? true :
                filter.status === 'pending' ? !task.completed :
                    filter.status === 'completed' ? task.completed : true

        const priorityMatch = filter.priority
            ? task.priority === filter.priority
            : true

        return statusMatch && priorityMatch
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
                setDeleteTask,
                filter, setFilter,
                filteredTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}