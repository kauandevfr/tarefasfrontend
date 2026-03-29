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

            const html = document.querySelector("html");
            html.setAttribute("data-theme", data.theme);

        } catch (error) {
            return console.error(error)
        }
    }

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

    return (
        <UserContext.Provider value={{
            listUser,
            user,
            photoSteps,
            setPhotoSteps,
            photoInfos,
            setPhotoInfos,
            initialPhotoInfos
        }}>
            {children}
        </UserContext.Provider>
    );
};