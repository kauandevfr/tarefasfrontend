import { createContext, useContext, useState } from "react";
export const GlobalContext = createContext({});

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export function GlobalProvider({ children }) {

    const [hideAside, setHideAside] = useState(true)

    return (
        <GlobalContext.Provider
            value={{ hideAside, setHideAside }}
        >
            {children}
        </GlobalContext.Provider>
    );
}