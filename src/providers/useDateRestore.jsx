import { create } from 'zustand'

const today = () => new Date().toISOString().split('T')[0]

const getInitialDate = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('date') || today()
}

export const useDateStore = create(set => ({
    date: getInitialDate(),
    setDate: date => set({ date }),
    prevDay: () => set(state => {
        const d = new Date(state.date)
        d.setDate(d.getDate() - 1)
        return { date: d.toISOString().split('T')[0] }
    }),
    nextDay: () => set(state => {
        const d = new Date(state.date)
        d.setDate(d.getDate() + 1)
        return { date: d.toISOString().split('T')[0] }
    }),
    resetDate: () => set({ date: today() }),
}))