import { createContext, useContext } from "react";

export const TaskContext = createContext({});

export const useTask = () => {
    return useContext(TaskContext);
};

export function TasksProvider({ children }) {

    return (
        <TaskContext.Provider
            value={{}}
        >
            {children}
        </TaskContext.Provider>
    );
}