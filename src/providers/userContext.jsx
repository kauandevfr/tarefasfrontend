import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {

    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    );
};