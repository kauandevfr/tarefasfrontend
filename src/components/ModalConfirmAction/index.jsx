import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useUser } from "../../providers/userContext";
import ErrorMessage from "../ErrorMessage";
import ModalBase from "../ModalBase";
import { confirmSchema } from "../../schemas/user/confirm"
import { useGlobal } from "../../providers/globalContext";
import instance from "../../services/instance";
import { useNavigate } from "react-router-dom";

export default function ModalConfirmAction() {

    const navigate = useNavigate()

    const { showError, setAlertInfos } = useGlobal()

    const { confirmActionInfos, setConfirmActionInfos, initialConfirmActionInfos } = useUser()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(confirmSchema),
    });

    const type = confirmActionInfos.type

    const text = type === 'tasks' ? "Você está prestes a excluir todas as suas tarefas. Todos os dados serão removidos permanentemente. Deseja continuar?"
        : "Tem certeza que deseja excluir sua conta? Vamos sentir sua falta por aqui. Essa ação é permanente e não poderá ser desfeita."

    const closeModal = () => {
        setConfirmActionInfos(initialConfirmActionInfos)
        reset()
    }

    const confirmAction = async d => {
        try {
            const { data } = await instance.delete(`/${type}`, { data: d });
            setAlertInfos({ open: true, type: 'success', message: data.message })

            if (type === 'user') navigate('/login')
            closeModal()
        } catch (error) {
            showError(error)
        }

    }

    return (
        <ModalBase
            isOpen={confirmActionInfos.open}
            onClose={closeModal}
            onSubmit={handleSubmit(confirmAction)}
            title='Confirmar exclusão?'
        >

            <p className="subtitle text-center">{text}
            </p>

            <div className="field-group w100">
                <label className="label" htmlFor="password">Insira a sua senha</label>
                <input className={`input ${errors.password && 'error'}`}
                    type="password"
                    id="password"
                    {...register('password')}
                />
                <ErrorMessage message={errors.password?.message} />
            </div>

            <div className="horizontal g2 w100 jc-center">
                <button className='button secondary w100 jc-center' type="button" onClick={closeModal}>Cancelar</button>
                <button className='button w100 jc-center bg-red' type="submit"
                    disabled={isSubmitting}
                >Confirmar</button>
            </div>
        </ModalBase>
    )
}