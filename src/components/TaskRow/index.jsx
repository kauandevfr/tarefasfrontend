import { useGlobal } from "../../providers/globalContext";
import { useTask } from "../../providers/taskContext";
import { useDateStore } from "../../providers/useDateRestore";
import instance from "../../services/instance";
import Badge from "../Badge"
import Checkbox from "../Checkbox"
import "./styles.scss"

export default function TaskRow({ task }) {

    const isLate = !task.completed && task.createdat < new Date().toISOString().split('T')[0]

    const { date } = useDateStore()

    const { showError } = useGlobal()

    const { listTasks, setShowTask, setDeleteTask } = useTask()

    const completeTask = async () => {
        try {
            await instance.put(`/task/${task.id}`, { completed: !task.completed });
            listTasks(date);
        } catch (error) {
            showError(error);
        }
    };

    return (
        <div className={`task-row ${task.completed && 'completed'} surface horizontal between ai-center opacity-anim`}>

            <div className="horizontal g2">
                <Checkbox
                    checked={task.completed}
                    onChange={completeTask}
                />
                <div className="vertical g2">
                    <div className="task-title text-xl">{task.title}</div>
                    <div className="horizontal g2">
                        <Badge priority={task.priority} />
                        {task.repeat && (
                            <div className="task-meta horizontal g1 ai-center" title={task.repeat === 'daily' ? 'Repete diariamente' : 'Repete semanalmente'}>
                                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 014-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 01-4 4H3"></path></svg>
                                <span>{task.repeat === 'daily' ? 'Diário' : 'Semanal'}</span>
                            </div>
                        )}
                        {isLate && (
                            <div className="task-meta high">
                                <span>Atrasada</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="horizontal g2 task-actions">
                <button className="button secondary" onClick={() => setShowTask({ open: true, data: task, type: 'edit' })}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button className="button secondary" type="button" onClick={() => setDeleteTask({ open: true, id: task.id })}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                </button>
            </div>
        </div>
    )
}