import { format, getDay, getDaysInMonth, isToday, startOfMonth } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { useTask } from "../../providers/taskContext"
import { useDateStore } from "../../providers/useDateRestore"
import instance from "../../services/instance"
import "./styles.scss"

import ProgressBar from "../ProgressBar"
import { useSetView } from "../../providers/useViewStore"

const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function Calendar() {
    const { date, setDate } = useDateStore()
    const setView = useSetView()

    const { setShowTask } = useTask()

    const [viewDate, setViewDate] = useState(() => {
        const d = new Date(date + 'T12:00:00')
        return { year: d.getFullYear(), month: d.getMonth() }
    })

    const currentDate = new Date(viewDate.year, viewDate.month, 1)
    const totalDays = getDaysInMonth(currentDate)
    const firstDayOfWeek = getDay(startOfMonth(currentDate))

    const prevMonthDate = new Date(viewDate.year, viewDate.month - 1, 1)
    const totalDaysPrevMonth = getDaysInMonth(prevMonthDate)
    const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) =>
        totalDaysPrevMonth - firstDayOfWeek + 1 + i
    )

    const totalCells = Math.ceil((firstDayOfWeek + totalDays) / 7) * 7
    const nextMonthDaysCount = totalCells - firstDayOfWeek - totalDays
    const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) => i + 1)

    const prevMonth = () => {
        setViewDate(prev => {
            const d = new Date(prev.year, prev.month - 1, 1)
            return { year: d.getFullYear(), month: d.getMonth() }
        })
    }

    const nextMonth = () => {
        setViewDate(prev => {
            const d = new Date(prev.year, prev.month + 1, 1)
            return { year: d.getFullYear(), month: d.getMonth() }
        })
    }

    const resetToday = () => {
        const today = new Date()
        setViewDate({ year: today.getFullYear(), month: today.getMonth() })
        setDate(today.toISOString().split('T')[0])
    }

    const handleDayClick = (day) => {
        const year = viewDate.year
        const month = String(viewDate.month + 1).padStart(2, '0')
        const d = String(day).padStart(2, '0')
        setDate(`${year}-${month}-${d}`)
        setView('list')
    }

    const [calendarTasks, setCalendarTasks] = useState([])

    useEffect(() => {
        const fetchMonthTasks = async () => {
            const year = viewDate.year
            const month = String(viewDate.month + 1).padStart(2, '0')
            const { data } = await instance.get('/tasks', {
                params: { month: `${year}-${month}` }
            })

            console.log(data)
            setCalendarTasks(data)
        }
        fetchMonthTasks()
    }, [viewDate])

    return (
        <>
            <div className="content-width horizontal between ai-center">
                <div className="vertical g1">
                    <h1 className="title">Calendário</h1>
                    <p className="subtitle">
                        {(() => { const s = format(new Date(date + 'T12:00:00'), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }); return s.charAt(0).toUpperCase() + s.slice(1) })()}
                    </p>
                </div>
                <button className="button" type="button" onClick={() => setShowTask({ open: true, data: {}, type: 'add' })}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
                    Nova Tarefa
                </button>
            </div>

            <section className="surface g4 vertical">
                <div className="calendar-header horizontal ai-center between w100 wrap g1">
                    <div className="title">
                        {(() => { const s = format(currentDate, "MMMM 'de' yyyy", { locale: ptBR }); return s.charAt(0).toUpperCase() + s.slice(1) })()}
                    </div>
                    <div className="buttons horizontal g2">
                        <button className="button secondary" onClick={prevMonth}>
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        <button className="button secondary" onClick={resetToday}>Hoje</button>
                        <button className="button secondary" onClick={nextMonth}>
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>

                <div className="cal-grid">
                    {DAYS_OF_WEEK.map(d => (
                        <div key={d} className="cal-dow">{d}</div>
                    ))}

                    {prevMonthDays.map(day => (
                        <div key={`prev-${day}`} className="cal-day muted" onClick={prevMonth}>
                            <span className="cal-day-num">{day}</span>
                        </div>
                    ))}

                    {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => {
                        const year = currentDate.getFullYear()
                        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
                        const dayStr = String(day).padStart(2, '0')
                        const fullDate = `${year}-${month}-${dayStr}`
                        const isSelected = fullDate === date
                        const isCurrentDay = isToday(new Date(fullDate + 'T12:00:00'))

                        const dayTasks = calendarTasks.filter(task =>
                            task.createdat.split('T')[0] === fullDate
                        )
                        const completed = dayTasks.filter(t => t.completed).length
                        const total = dayTasks.length

                        return (
                            <div
                                key={day}
                                className={`cal-day vertical between ${isSelected ? 'selected' : ''} ${isCurrentDay ? 'today' : ''}`}
                                onClick={() => handleDayClick(day)}
                            >
                                <span className="cal-day-num">{day}</span>

                                {total && completed ?
                                    <div className="vertical">
                                        <span className="cal-day-num">{total}/{completed}</span>
                                        <ProgressBar completed={completed} total={total} />
                                    </div>
                                    : ''}
                            </div>
                        )
                    })}

                    {nextMonthDays.map(day => (
                        <div key={`next-${day}`} className="cal-day muted" onClick={nextMonth}>
                            <span className="cal-day-num">{day}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}