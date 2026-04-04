import { createContext, useCallback, useContext, useState } from "react";
export const GlobalContext = createContext({});

export const useGlobal = () => {
    return useContext(GlobalContext);
};

export function GlobalProvider({ children }) {

    const [hideAside, setHideAside] = useState(true)

    const initialAlertInfos = {
        open: false,
        message: null,
        type: null
    }

    const genId = () =>
        (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`);

    const [alertInfos, _setAlertInfos] = useState(initialAlertInfos)

    const setAlertInfos = useCallback((next) => {
        _setAlertInfos(prev => {
            const resolved = typeof next === "function" ? next(prev) : next;
            if (resolved?.open) {
                return { id: genId(), tag: "success", message: "", onClose: null, ...resolved };
            }
            return resolved;
        });
    }, []);

    const showError = error => {

        const data = error.response?.data;

        console.error(error);


        return setAlertInfos({
            open: true,
            message: data.message,
            type: "error"
        });

    };


    return (
        <GlobalContext.Provider
            value={{
                hideAside, setHideAside,
                alertInfos, setAlertInfos,
                initialAlertInfos, showError
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}