import { useState } from 'react'
import { useTask } from '../../providers/taskContext'
import { useUser } from '../../providers/userContext'
import './styles.scss'

export default function OverdueBanner() {
    const { overdueTasks, setOverdueModalOpen } = useTask()
    const { user } = useUser()
    const [dismissed, setDismissed] = useState(false)

    if (!user.data?.highlight_overdue) return null
    if (!overdueTasks.length || dismissed) return null

    const totalTasks = overdueTasks.reduce((acc, t) => acc + Number(t.count), 0)
    const totalDays = overdueTasks.length

    return (
        <div className='overdue-banner fade-anim horizontal between ai-center g2 content-width'>
            <div className='horizontal g2 ai-center'>
                <svg width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                    <circle cx='12' cy='12' r='10' />
                    <path d='M12 8v4M12 16h.01' />
                </svg>
                <span>
                    Você tem <strong>{totalTasks} tarefa{totalTasks > 1 ? 's' : ''} atrasada{totalTasks > 1 ? 's' : ''}</strong> em {totalDays} dia{totalDays > 1 ? 's' : ''}.
                </span>
            </div>
            <div className='horizontal g2 ai-center'>
                <button className='overdue-banner-btn' type='button' onClick={() => setOverdueModalOpen(true)}>
                    Ver agora
                </button>
                <button className='overdue-banner-close' type='button' onClick={() => setDismissed(true)}>
                    <svg width='12' height='12' fill='none' stroke='currentColor' strokeWidth='2.5' viewBox='0 0 24 24'>
                        <path d='M18 6L6 18M6 6l12 12' />
                    </svg>
                </button>
            </div>
        </div>
    )
}