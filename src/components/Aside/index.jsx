import { useState } from 'react'
import './styles.scss'
import { useTask } from '../../providers/taskContext'
import { useViewStore } from '../../providers/useViewStore'

export default function Aside() {
    const { view, setView } = useViewStore()

    const [hideAside, setHideAside] = useState(true)

    const { tasks } = useTask()


    return (
        <aside className={`main-aside p2 vertical g1 ${hideAside && 'hide'}`}>

            <button className="button secondary sidebar-toggle" id="sidebar-toggle-btn" title="Fechar menu" type='button'
                onClick={() => setHideAside(!hideAside)}
            >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>

            <span className="sidebar-label">Visualização</span>
            <button className="button between" type='button' onClick={() => setView('list')}>
                <div className="horizontal g1">
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"></path></svg>
                    <span>Lista</span>
                </div>
                <span className="badge">{tasks.total}</span>
            </button>
            <button className="button" type='button' onClick={() => setView('calendar')}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>
                <span>Calendário</span>
            </button>

            <span className="sidebar-label">Filtrar</span>
            <button className="button" >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                <span>Todas</span>
            </button>
            <button className="button">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                <span>Pendentes</span>
            </button>
            <button className="button" >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>
                <span>Concluídas</span>
            </button>

            <span className="sidebar-label">Prioridade</span>
            <button className="button">
                <div className='sidebar-dot high' />
                <span>Alta</span>
            </button>
            <button className="button" >
                <div className='sidebar-dot medium' />
                <span>Média</span>
            </button>
            <button className="button">
                <div className='sidebar-dot low' />
                <span>Baixa</span>
            </button>

        </aside>
    )
}