import Aside from "../../components/Aside"
import Header from "../../components/Header"
import TaskRow from "../../components/TaskRow/TaskRow"
import "./styles.scss"
// import Calendar from "../../components/Calendar"


export default function Dashboard() {



    return (
        <main>
            <Header />
            <div className="dashboard-content horizontal">
                <Aside />

                <section className="tasks-content p4 vertical ai-center g4">
                    <div className="horizontal content-width between">
                        <div className="vertical g1">
                            <h1 className="title">Minhas Tarefas</h1>
                            <p className="subtitle">17 de março de 2026</p>
                        </div>
                        <button className="button">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
                            Nova Tarefa
                        </button>
                    </div>

                    <div className="date-nav surface">
                        <button className="button secondary hover-yellow">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>
                        </button>
                        <h1 className="title">Hoje</h1>
                        <button className="button secondary hover-yellow">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"></path></svg>
                        </button>
                    </div>

                    <div className="surface horizontal g2">

                        <div className="vertical g1 jc-center w100">
                            <div className="subtitle">Progresso do dia</div>
                            <div className="progress-bar-wrap">
                                <div className="progress-bar-fill"></div>
                            </div>
                        </div>

                        <div className="vertical ai-center">
                            <strong className="text-yellow-800 font-title text-4xl">0/1</strong>
                            <span className="subtitle">concluídas</span>
                        </div>
                    </div>

                    <div className="vertical g2">
                        <TaskRow />
                        <TaskRow />
                    </div>

                    {/* <Calendar /> */}

                </section>

            </div>
        </main>
    )
}