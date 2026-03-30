import { useTask } from '../../providers/taskContext'
import './styles.scss'

export default function ProgressBar() {

    const { tasks } = useTask()

    const progress = tasks.total ? (tasks.completed / tasks.total) * 100 : 0;

    return (
        <div className="progress-bar-wrap">
            <div className={`progress-bar-fill ${tasks.completed === tasks.total && tasks.total > 0 ? 'completed' : ''}`}
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}