import { createContext, useContext, useState } from "react";
import instance from "../services/instance";

export const TaskContext = createContext({});

export const useTask = () => {
    return useContext(TaskContext);
};

export function TasksProvider({ children }) {

    const [tasks, setTasks] = useState({
        loading: true,
        items: []
    });

    const listTasks = async date => {

        try {
            const { data } = await instance.get('/tasks', { params: { date } })
            setTasks({
                loading: false,
                items: data,
                total: data.length
            });
        } catch (error) {
            console.error({ ...error });
        }
    };

    return (
        <TaskContext.Provider
            value={{ listTasks, tasks }}
        >
            {children}
        </TaskContext.Provider>
    );
}