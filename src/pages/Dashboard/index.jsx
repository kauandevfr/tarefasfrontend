import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Aside from "../../components/Aside"
import Calendar from "../../components/Calendar"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import ModalDelete from "../../components/ModalDelete"
import ModalTask from "../../components/ModalTask"
import ProgressBar from "../../components/ProgressBar"
import TaskRow from "../../components/TaskRow"
import WithoutList from "../../components/WithoutList"
import { useGlobal } from "../../providers/globalContext"
import { useTask } from "../../providers/taskContext"
import { useDateStore } from "../../providers/useDateRestore"
import { useViewStore } from "../../providers/useViewStore"
import "./styles.scss"
import Badge from '../../components/Badge'
import AlertModal from '../../components/AlertModal'
import OverdueBanner from '../../components/OverdueBanner'
import OverdueModal from '../../components/OverdueModal'

export default function Dashboard() {
    const { date, prevDay, nextDay } = useDateStore()
    const [, setSearchParams] = useSearchParams()
    const { view } = useViewStore()

    const { listTasks, tasks, setShowTask, filteredTasks, filter, search, setSearch } = useTask()

    const { hideAside, setHideAside } = useGlobal()

    const statusLabel = { pending: 'Pendentes', completed: 'Concluídas' }

    useEffect(() => {
        setSearchParams(prev => {
            prev.set('date', date)
            prev.set('view', view)
            return prev
        })
        setSearch('')
        listTasks(date)
    }, [date, view])

    function ButtonViewSidebar() {
        return (
            <button className={`button sidebar-toggle center ${hideAside && 'rotate-svg'}`} title="Fechar menu" type='button'
                onClick={() => setHideAside(!hideAside)}
            >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>
            </button>
        )
    }

    return (
        <main>
            <Header />
            <div className="dashboard-content horizontal">
                <Aside />

                <section className="tasks-content p4 vertical ai-center g4">
                    <ButtonViewSidebar />
                    {view === 'list' ?
                        <>
                            <OverdueBanner />
                            <div className="listing-header horizontal content-width between ai-center">
                                <div className="vertical g1">
                                    <h1 className="title text-nowrap">Minhas Tarefas</h1>
                                    <p className="subtitle opacity-anim" key={date}>
                                        {format(new Date(date + 'T12:00:00'), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                    </p>
                                </div>
                                <div className="horizontal g2 ai-center">
                                    <div className="search-wrap horizontal ai-center g1">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
                                        <input
                                            className="search-input"
                                            type="text"
                                            placeholder="Buscar tarefa..."
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                        />
                                        {search && (
                                            <button className="search-clear" type="button" onClick={() => setSearch('')}>
                                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                                            </button>
                                        )}
                                    </div>
                                    <button data-tutorial="new-task" className="button" type="button" onClick={() => setShowTask({ open: true, data: {}, type: 'add' })}>
                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
                                        Nova Tarefa
                                    </button>
                                </div>
                            </div>

                            <div className="date-nav surface ai-center">
                                <button className="button secondary hover-yellow" type="button" onClick={prevDay}>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>
                                </button>
                                <h1 className="title opacity-anim" key={date}>
                                    {format(new Date(date + 'T12:00:00'), 'EEEE', { locale: ptBR })}
                                </h1>
                                <button className="button secondary hover-yellow" onClick={nextDay}>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"></path></svg>
                                </button>
                            </div>

                            {(filter.status !== 'all' || filter.priority) && (
                                <div className="horizontal ai-center g1 content-width fade-anim">
                                    <h2 className="subtitle">Filtros selecionados:</h2>
                                    {filter.status !== 'all' && <span className='task-meta'>{statusLabel[filter.status]}</span>}
                                    {filter.priority && <Badge priority={filter.priority} />}
                                </div>
                            )}

                            <div data-tutorial="progress" className="surface horizontal g2">
                                <div className="vertical g1 jc-center w100">
                                    <div className="subtitle">Progresso do dia</div>
                                    <ProgressBar completed={tasks.completed} total={tasks.total} />
                                </div>
                                <div className="vertical ai-center">
                                    <strong className="text-yellow-800 font-title text-4xl">{tasks.total}/{tasks.completed}</strong>
                                    <span className="subtitle">concluídas</span>
                                </div>
                            </div>

                            <div className="content-width vertical g2">
                                {tasks.loading ?
                                    <Loader />
                                    : filteredTasks.length ?
                                        filteredTasks.map((task, index) => <TaskRow
                                            key={task.id}
                                            task={task}
                                            data-tutorial={index === 0 ? 'task-row' : undefined}
                                            style={{ animationDelay: `${index * 1}s` }} />) :
                                        <WithoutList />
                                }
                            </div>
                        </>
                        : <Calendar />}
                    <ModalTask />
                    <ModalDelete />
                    <AlertModal />
                    <OverdueModal />
                </section>

            </div>
        </main>
    )
}