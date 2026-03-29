import { useEffect, useRef } from "react"
import Aside from "../../components/Aside"
import Header from "../../components/Header"
import TaskRow from "../../components/TaskRow"
import { useTask } from "../../providers/taskContext"
import "./styles.scss"
import { useSearchParams } from "react-router-dom"
import { useDateStore } from "../../providers/useDateRestore"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import ProgressBar from "../../components/ProgressBar"
// import Calendar from "../../components/Calendar"

export default function Dashboard() {
    const { date, prevDay, nextDay } = useDateStore()
    const [searchParams, setSearchParams] = useSearchParams()

    const { listTasks, tasks } = useTask()

    useEffect(() => {
        setSearchParams(prev => {
            prev.set('date', date)
            return prev
        })
        listTasks(date)
    }, [date])

    return (
        <main>
            <Header />
            <div className="dashboard-content horizontal">
                <Aside />

                <section className="tasks-content p4 vertical ai-center g4">
                    <div className="horizontal content-width between ai-center">
                        <div className="vertical g1">
                            <h1 className="title">Minhas Tarefas</h1>
                            <p className="subtitle opacity-anim" key={date}>
                                {format(new Date(date + 'T12:00:00'), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </p>
                        </div>
                        <button className="button">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
                            Nova Tarefa
                        </button>
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

                    <div className="surface horizontal g2">

                        <div className="vertical g1 jc-center w100">
                            <div className="subtitle">Progresso do dia</div>
                            <ProgressBar />
                        </div>

                        <div className="vertical ai-center">
                            <strong className="text-yellow-800 font-title text-4xl">{tasks.total}/{tasks.completed}</strong>
                            <span className="subtitle">concluídas</span>
                        </div>
                    </div>

                    <div className="vertical g2">
                        {tasks.loading ?
                            <h1> ta carregando</h1>
                            : tasks.items.length ?
                                tasks.items.map((task, index) => <TaskRow
                                    key={task.id}
                                    task={task}
                                    style={{ animationDelay: `${index * 1}s` }} />) :
                                <h1> nao tem</h1>
                        }
                    </div>

                    {/* <Calendar /> */}

                </section>

            </div>
        </main>
    )
}