import Badge from "../Badge"
import "./styles.scss"

export default function TaskRow({ task }) {


    console.log(task)

    return (
        <div className={`task-row ${task.completed && 'completed'} surface horizontal between ai-center`}>

            <div className="horizontal g2">
                <div className="task-check "></div>
                <div className="vertical g2">
                    <div className="task-title text-xl">{task.title}</div>
                    <div className="horizontal g2">
                        <Badge priority={task.priority} />
                        <div className="task-meta high">
                            <span>Atrasada</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="horizontal g2 task-actions">
                <button className="button secondary" >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button className="button secondary">
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                </button>
            </div>
        </div>
    )
}