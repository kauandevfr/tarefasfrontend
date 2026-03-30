import { create } from 'zustand'

const getInitialView = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('view') || 'list'
}

export const useViewStore = create(set => ({
    view: getInitialView(),
    setView: (view) => set({ view }),
}))