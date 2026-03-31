import './styles.scss'

export default function ProgressBar({ total, completed }) {

    const progress = total ? (completed / total) * 100 : 0;

    return (
        <div className="progress-bar-wrap">
            <div className={`progress-bar-fill ${completed === total && total > 0 ? 'completed' : ''}`}
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}