import { createContext, useContext, useState } from "react";
import instance from "../services/instance";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ data: {}, loading: true })

    const listUser = async () => {
        try {
            const { data } = await instance.get('/user')

            const initials = data.name
                .trim()
                .split(' ')
                .filter(word => word.length > 0)
                .slice(0, 2)
                .map(word => word[0].toUpperCase())
                .join('')

            setUser({ data: { ...data, initials }, loading: false })

            console.log(data)

            const html = document.querySelector("html");
            html.setAttribute("data-theme", data.theme);

        } catch (error) {
            return console.log(error)
        }
    }

    const [photoSteps, setPhotoSteps] = useState('')

    return (
        <UserContext.Provider value={{ listUser, user, photoSteps, setPhotoSteps }}>
            {children}
        </UserContext.Provider>
    );
};