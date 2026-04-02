import { create } from 'zustand'
import { useGlobal } from './globalContext'

const getInitialView = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('view') || 'list'
}

export const useViewStore = create(set => ({
    view: getInitialView(),
    setView: (view) => set({ view }),
}))

export const useSetView = () => {
    const setView = useViewStore(s => s.setView)
    const { setHideAside } = useGlobal()

    return (view) => {
        setView(view)
        setHideAside(true)
    }
}