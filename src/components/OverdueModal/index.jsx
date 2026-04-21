import { AnimatePresence, motion } from 'framer-motion'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect } from 'react'
import { useTask } from '../../providers/taskContext'
import { useDateStore } from '../../providers/useDateRestore'
import { useSetView } from '../../providers/useViewStore'
import ModalBase from '../ModalBase'
import Checkbox from '../Checkbox'
import Badge from '../Badge'
import './styles.scss'

export default function OverdueModal() {
    const {
        overdueModalOpen,
        setOverdueModalOpen,
        overdueDetails,
        listOverdueDetails,
        completeOverdueTask,
        overdueTasks,
    } = useTask()

    useEffect(() => {
        if (overdueModalOpen) listOverdueDetails()
    }, [overdueModalOpen])

    useEffect(() => {
        if (overdueModalOpen && overdueDetails.length === 0 && overdueTasks.length === 0) {
            setOverdueModalOpen(false)
        }
    }, [overdueDetails, overdueTasks])

    const { setDate } = useDateStore()
    const setView = useSetView()

    const total = overdueDetails.reduce((acc, g) => acc + g.tasks.length, 0)

    const handleDayClick = (date) => {
        setDate(date)
        setView('list')
        setOverdueModalOpen(false)
    }

    return (
        <ModalBase
            isOpen={overdueModalOpen}
            onClose={() => setOverdueModalOpen(false)}
            layoutId='overdue-section'
            title={
                <div className='vertical'>
                    <span className='overdue-modal-title font-title'>Tarefas Atrasadas</span>
                    <span className='subtitle'>
                        {total} tarefa{total !== 1 ? 's' : ''} em {overdueDetails.length} dia{overdueDetails.length !== 1 ? 's' : ''}
                    </span>
                </div>
            }
        >
            <div className='overdue-modal-body vertical'>
                {overdueDetails.length === 0 ? (
                    <div className='overdue-modal-empty center'>
                        <span className='subtitle'>Carregando...</span>
                    </div>
                ) : (
                    overdueDetails.map(({ date, tasks }) => (
                        <div key={date} className='overdue-group vertical'>
                            <button
                                type='button'
                                className='overdue-group-label horizontal ai-center g1'
                                onClick={() => handleDayClick(date)}
                            >
                                <svg width='12' height='12' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                                    <rect x='3' y='4' width='18' height='18' rx='2' />
                                    <path d='M16 2v4M8 2v4M3 10h18' />
                                </svg>
                                <span>{format(new Date(date + 'T12:00:00'), "dd 'de' MMMM", { locale: ptBR })}</span>
                                <span className='badge badge--red'>{tasks.length}</span>
                            </button>

                            <AnimatePresence>
                                {tasks.map(task => (
                                    <motion.div
                                        key={task.id}
                                        layout
                                        initial={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className='overdue-task-row horizontal between ai-center'
                                    >
                                        <div className='horizontal g2 ai-center'>
                                            <Checkbox
                                                checked={false}
                                                onChange={() => completeOverdueTask(task.id)}
                                            />
                                            <div className='vertical g1'>
                                                <span className='text-base'>{task.title}</span>
                                                <div className='horizontal g1'>
                                                    <Badge priority={task.priority} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ))
                )}
            </div>
        </ModalBase>
    )
}