import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { format, getDay, getDaysInMonth, isToday, startOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useTask } from '../../providers/taskContext'
import { useDateStore } from '../../providers/useDateRestore'
import instance from '../../services/instance'
import ProgressBar from '../ProgressBar'
import { useSetView } from '../../providers/useViewStore'
import { useGlobal } from '../../providers/globalContext'
import './styles.scss'

const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function TaskPill({ task }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id })

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`cal-pill ${task.priority} ${task.completed ? 'done' : ''} ${isDragging ? 'dragging' : ''}`}
            title={task.title}
        >
            <span className='cal-pill-dot' />
            <span className='cal-pill-text'>{task.title}</span>
        </div>
    )
}

function DroppableDay({ fullDate, isSelected, isCurrentDay, dayTasks, day, onDayClick }) {
    const { setNodeRef, isOver } = useDroppable({ id: fullDate })

    const visible = dayTasks.slice(0, 3)
    const overflow = dayTasks.length - visible.length
    const completed = dayTasks.filter(t => t.completed).length
    const total = dayTasks.length

    return (
        <div
            ref={setNodeRef}
            className={`cal-day vertical between ${isSelected ? 'selected' : ''} ${isCurrentDay ? 'today' : ''} ${isOver ? 'drop-over' : ''}`}
            onClick={() => onDayClick(day)}
        >
            <span className='cal-day-num'>{day}</span>

            <div className='cal-pills vertical'>
                {visible.map(task => (
                    <TaskPill key={task.id} task={task} />
                ))}
                {overflow > 0 && (
                    <span className='cal-overflow'>+{overflow} mais</span>
                )}
            </div>

            {total > 0 && (
                <div className='vertical'>
                    <span className='cal-day-num'>{completed}/{total}</span>
                    <ProgressBar completed={completed} total={total} />
                </div>
            )}
        </div>
    )
}

export default function Calendar() {
    const { date, setDate } = useDateStore()
    const setView = useSetView()
    const { setShowTask } = useTask()
    const { showError } = useGlobal()

    const [viewDate, setViewDate] = useState(() => {
        const d = new Date(date + 'T12:00:00')
        return { year: d.getFullYear(), month: d.getMonth() }
    })

    const [calendarTasks, setCalendarTasks] = useState([])
    const [activeTask, setActiveTask] = useState(null)

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

    const prevMonth = () => setViewDate(prev => {
        const d = new Date(prev.year, prev.month - 1, 1)
        return { year: d.getFullYear(), month: d.getMonth() }
    })

    const nextMonth = () => setViewDate(prev => {
        const d = new Date(prev.year, prev.month + 1, 1)
        return { year: d.getFullYear(), month: d.getMonth() }
    })

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

    const fetchMonthTasks = async () => {
        const year = viewDate.year
        const month = String(viewDate.month + 1).padStart(2, '0')
        const { data } = await instance.get('/tasks', {
            params: { month: `${year}-${month}` }
        })
        setCalendarTasks(data)
    }

    useEffect(() => {
        fetchMonthTasks()
    }, [viewDate])

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
    )

    const handleDragStart = ({ active }) => {
        const task = calendarTasks.find(t => t.id === active.id)
        setActiveTask(task)
    }

    const handleDragEnd = async ({ active, over }) => {
        setActiveTask(null)
        if (!over || !active) return

        const task = calendarTasks.find(t => t.id === active.id)
        const newDate = over.id

        if (!task || task.createdat.split('T')[0] === newDate) return

        setCalendarTasks(prev =>
            prev.map(t => t.id === task.id ? { ...t, createdat: newDate } : t)
        )

        try {
            await instance.put(`/task/${task.id}`, { createdat: newDate })
        } catch (error) {
            setCalendarTasks(prev =>
                prev.map(t => t.id === task.id ? { ...t, createdat: task.createdat } : t)
            )
            showError(error)
        }
    }

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className='content-width horizontal between ai-center'>
                <div className='vertical g1'>
                    <h1 className='title'>Calendário</h1>
                    <p className='subtitle'>
                        {(() => { const s = format(new Date(date + 'T12:00:00'), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }); return s.charAt(0).toUpperCase() + s.slice(1) })()}
                    </p>
                </div>
                <button className='button' type='button' onClick={() => setShowTask({ open: true, data: {}, type: 'add' })}>
                    <svg width='14' height='14' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'><path d='M12 5v14M5 12h14'></path></svg>
                    Nova Tarefa
                </button>
            </div>

            <section className='surface g4 vertical'>
                <div className='calendar-header horizontal ai-center between w100 wrap g1'>
                    <div className='title'>
                        {(() => { const s = format(currentDate, "MMMM 'de' yyyy", { locale: ptBR }); return s.charAt(0).toUpperCase() + s.slice(1) })()}
                    </div>
                    <div className='buttons horizontal g2'>
                        <button className='button secondary' onClick={prevMonth}>
                            <svg width='14' height='14' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'><path d='M15 18l-6-6 6-6' /></svg>
                        </button>
                        <button className='button secondary' onClick={resetToday}>Hoje</button>
                        <button className='button secondary' onClick={nextMonth}>
                            <svg width='14' height='14' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'><path d='M9 18l6-6-6-6' /></svg>
                        </button>
                    </div>
                </div>

                <div className='cal-grid'>
                    {DAYS_OF_WEEK.map(d => (
                        <div key={d} className='cal-dow'>{d}</div>
                    ))}
                    {prevMonthDays.map(day => (
                        <div key={`prev-${day}`} className='cal-day muted' onClick={prevMonth}>
                            <span className='cal-day-num'>{day}</span>
                        </div>
                    ))}
                    {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => {
                        const year = currentDate.getFullYear()
                        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
                        const dayStr = String(day).padStart(2, '0')
                        const fullDate = `${year}-${month}-${dayStr}`

                        return (
                            <DroppableDay
                                key={day}
                                day={day}
                                fullDate={fullDate}
                                isSelected={fullDate === date}
                                isCurrentDay={isToday(new Date(fullDate + 'T12:00:00'))}
                                dayTasks={calendarTasks.filter(t => t.createdat.split('T')[0] === fullDate)}
                                onDayClick={handleDayClick}
                            />
                        )
                    })}
                    {nextMonthDays.map(day => (
                        <div key={`next-${day}`} className='cal-day muted' onClick={nextMonth}>
                            <span className='cal-day-num'>{day}</span>
                        </div>
                    ))}
                </div>
            </section>

            <DragOverlay>
                {activeTask && (
                    <div className={`cal-pill ${activeTask.priority} overlay`}>
                        <span className='cal-pill-dot' />
                        <span className='cal-pill-text'>{activeTask.title}</span>
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    )
}