import { createContext, useContext } from "react";
export const GlobalContext = createContext({});

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export function GlobalProvider({ children }) {

    return (
        <GlobalContext.Provider
            value={{}}
        >
            {children}
        </GlobalContext.Provider>
    );
}