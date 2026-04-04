import { useGlobal } from "../../providers/globalContext";
import { useTask } from "../../providers/taskContext";
import { useDateStore } from "../../providers/useDateRestore";
import instance from "../../services/instance";
import ModalBase from "../ModalBase";
import './styles.scss'

export default function ModalDelete() {

    const { deleteTask, setDeleteTask, listTasks } = useTask()

    const { setAlertInfos, showError } = useGlobal()

    const { date } = useDateStore()

    const handleDeleteTask = async e => {

        e.preventDefault()

        const id = deleteTask.id
        try {
            await instance.delete(`/task/${id}`)
            closeModal()

            setAlertInfos({ open: true, message: 'Tarefa excluída com sucesso!', type: 'success' })
            listTasks(date)
        } catch (error) {
            return showError(error)
        }
    }

    const closeModal = () => {
        setDeleteTask({
            open: false, id: null
        })
    }

    return (
        <ModalBase
            title="Excluir tarefa?"
            isOpen={deleteTask.open}
            onClose={closeModal}
            onSubmit={handleDeleteTask}
        >

            <svg className="delete-icon" viewBox="0 0 24 24" fill="none">
                <path d="M10 11V17" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11V17" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 7H20" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <h2 className="subtitle text-center">
                Tem certeza? Esta ação não pode ser desfeita.
            </h2>

            <div className="horizontal g2 w100">
                <button className="button w100 jc-center secondary" type="button">Cancelar</button>
                <button className="button w100 jc-center bg-red" type="submit">Excluir</button>
            </div>
        </ModalBase>
    )
}