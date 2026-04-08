import { createContext, useContext, useEffect, useState } from "react";
import instance from "../services/instance";
import { useGlobal } from "./globalContext";

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {

    const { showError } = useGlobal()

    const [user, setUser] = useState({ data: {}, loading: true })

    const [photoSteps, setPhotoSteps] = useState('')

    const initialPhotoInfos = {
        fileRaw: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        brightness: 100,
        imageForCrop: null,
        name: null,
        croppedAreaPixels: { x: 0, y: 0, width: 260, height: 260 }, // 👈 fallback
    }

    const [photoInfos, setPhotoInfos] = useState(initialPhotoInfos);

    const [isAuthenticated, setIsAuthenticated] = useState(null)

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
            setIsAuthenticated(true) // 👈 adiciona

            const html = document.querySelector("html");
            html.setAttribute("data-theme", data.theme);

        } catch (error) {
            setIsAuthenticated(false) // 👈 adiciona
            return showError(error)
        }
    }

    useEffect(() => {
        listUser()
    }, []);

    const initialConfirmActionInfos = {
        open: false,
        type: null
    }

    const [confirmActionInfos, setConfirmActionInfos] = useState(initialConfirmActionInfos)

    return (
        <UserContext.Provider value={{
            listUser,
            user,
            setUser,
            photoSteps,
            setPhotoSteps,
            photoInfos,
            setPhotoInfos,
            initialPhotoInfos,
            isAuthenticated,
            setIsAuthenticated,
            confirmActionInfos,
            setConfirmActionInfos,
            initialConfirmActionInfos
        }}>
            {children}
        </UserContext.Provider>
    );
};