import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGlobal } from '../../providers/globalContext'
import { useTask } from '../../providers/taskContext'
import { useDateStore } from '../../providers/useDateRestore'
import { useSetView } from '../../providers/useViewStore'
import './styles.scss'

export default function Aside() {

    const setView = useSetView()
    const { hideAside } = useGlobal()
    const { tasks, setFilter, overdueTasks, listOverdueTasks, setOverdueModalOpen } = useTask()
    const { setDate } = useDateStore()

    useEffect(() => {
        listOverdueTasks()
    }, [])

    function handleOverdueClick(date) {
        setDate(date)
        setView('list')
    }

    return (
        <aside className={`main-aside p2 vertical g1 ${hideAside && 'hide'}`}>

            <span className="sidebar-label">Visualização</span>
            <button className="button between" type='button' onClick={() => setView('list')}>
                <div className="horizontal g1">
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"></path></svg>
                    <span>Lista</span>
                </div>
                <span className="badge">{tasks.total}</span>
            </button>
            <button data-tutorial="calendar-btn" className="button" type='button' onClick={() => setView('calendar')}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>
                <span>Calendário</span>
            </button>

            <span className="sidebar-label">Filtrar</span>
            <button className="button" type='button' onClick={() => setFilter({ status: 'all', priority: null })}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                <span>Todas</span>
            </button>
            <button className="button" type='button' onClick={() => setFilter(f => ({ ...f, status: 'pending' }))}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                <span>Pendentes</span>
            </button>
            <button className="button" type='button' onClick={() => setFilter(f => ({ ...f, status: 'completed' }))}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>
                <span>Concluídas</span>
            </button>

            <span className="sidebar-label">Prioridade</span>
            <button className="button" type='button' onClick={() => setFilter(f => ({ ...f, priority: f.priority === 'high' ? null : 'high' }))}>
                <div className='sidebar-dot high' />
                <span>Alta</span>
            </button>
            <button className="button" type='button' onClick={() => setFilter(f => ({ ...f, priority: f.priority === 'medium' ? null : 'medium' }))}>
                <div className='sidebar-dot medium' />
                <span>Média</span>
            </button>
            <button className="button" type='button' onClick={() => setFilter(f => ({ ...f, priority: f.priority === 'low' ? null : 'low' }))}>
                <div className='sidebar-dot low' />
                <span>Baixa</span>
            </button>

            {overdueTasks.length > 0 && (
                <motion.div layoutId='overdue-section' className='overdue-section vertical'>
                    <button
                        className='overdue-section-trigger horizontal between ai-center w100'
                        type='button'
                        onClick={() => setOverdueModalOpen(true)}
                    >
                        <span className="sidebar-label sidebar-label--overdue" style={{ marginTop: 0 }}>
                            Atrasadas
                        </span>
                        <span className='badge badge--red'>
                            {overdueTasks.reduce((acc, t) => acc + Number(t.count), 0)}
                        </span>
                    </button>
                    <div className='overdue-list g1'>
                        {overdueTasks.map(({ date, count }) => (
                            <button
                                key={date}
                                className="button between overdue-item"
                                type='button'
                                onClick={() => handleOverdueClick(date)}
                            >
                                <span>{format(new Date(date + 'T12:00:00'), "dd 'de' MMM", { locale: ptBR })}</span>
                                <span className='badge badge--red'>{count}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

        </aside>
    )
}