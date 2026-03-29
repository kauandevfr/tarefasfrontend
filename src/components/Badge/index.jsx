import "./styles.scss"

export default function Badge({ priority }) {

    const priorityLabel = {
        high: 'Alta',
        medium: 'Média',
        low: 'Baixa',
    }

    return (
        <div className={`task-meta ${priority}`}>
            <span>{priorityLabel[priority]}</span>
        </div>
    )
}