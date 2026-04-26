import { useForm } from 'react-hook-form';
import { useTask } from '../../providers/taskContext'
import ModalBase from '../ModalBase'
import './styles.scss'
import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema } from '../../schemas/task/add';
import ErrorMessage from '../ErrorMessage';
import { useEffect } from 'react';
import instance from '../../services/instance';
import Checkbox from '../Checkbox';
import { useDateStore } from '../../providers/useDateRestore';
import { useGlobal } from "../../providers/globalContext"

export default function ModalTask() {

    const { watch, register, setValue, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(taskSchema),
    });

    const { showTask, setShowTask, initialTask, listTasks } = useTask()

    const { setAlertInfos, showError } = useGlobal()

    const { date } = useDateStore()

    const data = showTask.data

    const isAdd = showTask.type === 'add'

    const closeModal = () => {
        setShowTask(initialTask)
        reset({
            title: '',
            description: '',
            priority: '',
            createdat: '',
            completed: false,
            repeat: null,
        })
    }
    const handleTask = async data => {
        const payload = {
            ...data,
            completed: !showTask.data.completed && false,
            createdat: data.createdat instanceof Date
                ? data.createdat.toISOString().slice(0, 10)
                : data.createdat,
        };

        try {
            const request = isAdd
                ? instance.post('/task', payload)
                : instance.put(`/task/${showTask.data.id}`, payload);
            await request;

            closeModal();
            listTasks(date);

            setAlertInfos({ open: true, message: `Tarefa ${isAdd ? 'adicionada' : 'atualizada'} com sucesso!`, type: 'success' })
        } catch (error) {
            return showError(error)
        }
    }

    useEffect(() => {

        if (data?.id) {
            reset({
                title: data?.title || '',
                description: data?.description || '',
                completed: data?.completed || false,
                priority: data?.priority || '',
                createdat: data?.createdat.split('T')[0] || '',
                repeat: data?.repeat || null,
            });
        } else {
            setValue('createdat', date)
        }
    }, [showTask.open]);

    return (
        <ModalBase
            isOpen={showTask.open}
            title={`${!isAdd ? 'Editar' : 'Adicionar'} tarefa`}
            onClose={closeModal}
            onSubmit={handleSubmit(handleTask)}
        >
            <div className="modal-task vertical g2">

                <div className="field-group">
                    <label className="label" htmlFor="title" >Título</label>
                    <input className={`input ${errors.title && 'error'}`}
                        type="text"
                        autoFocus
                        id='title'
                        placeholder='Estudar para prova'
                        {...register('title')}
                    />
                    <ErrorMessage message={errors.title?.message} />
                </div>
                <div className="field-group">
                    <label className="label" htmlFor="description" >Descrição</label>
                    <textarea className={`input textarea ${errors.description && 'error'}`}
                        id="description"
                        cols={2}
                        rows={6}
                        {...register('description')}
                    />
                    <ErrorMessage message={errors.description?.message} />
                </div>

                <div className="field-group">
                    <label className="label">Prioridade</label>
                    <div className="modal-priority-section horizontal g2">
                        {[
                            { value: 'high', label: 'Alta' },
                            { value: 'medium', label: 'Média' },
                            { value: 'low', label: 'Baixa' },
                        ].map(({ value, label }) => (
                            <button
                                key={value}
                                className={`task-meta ${value}`}
                                type="button"
                                style={{ opacity: watch('priority') && watch('priority') !== value ? 0.5 : 1 }}
                                onClick={() => setValue('priority', value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <ErrorMessage message={errors.priority?.message} />
                </div>
                <div className="field-group">
                    <label className="label" htmlFor="createdat" >Data</label>
                    <input className={`input textarea ${errors.createdat && 'error'}`}
                        type="date"
                        id='createdat'
                        {...register('createdat')}
                    />
                    <ErrorMessage message={errors.createdat?.message} />
                </div>
                <div className="field-group">
                    <label className="label">Repetir</label>
                    <div className="modal-priority-section horizontal g2">
                        {[
                            { value: null, label: 'Nunca' },
                            { value: 'daily', label: 'Diário' },
                            { value: 'weekly', label: 'Semanal' },
                        ].map(({ value, label }) => (
                            <button
                                key={label}
                                className={`button w100 jc-center ${watch('repeat') === value ? '' : 'secondary'}`}
                                type="button"
                                style={{ opacity: watch('repeat') !== value ? 0.5 : 1 }}
                                onClick={() => setValue('repeat', value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="field-group">
                    <div className="horizontal g2 jc-end">
                        <label className="label" htmlFor="completed">Completa</label>
                        <Checkbox
                            onChange={() => setValue('completed', !watch('completed'))}
                            checked={watch('completed')}
                        />
                    </div>
                    <ErrorMessage message={errors.completed?.message} />
                </div>
                <div className="horizontal g2 w100 jc-center">
                    <button className='button secondary w100 jc-center' type="button" onClick={closeModal}>Cancelar</button>
                    <button className='button w100 jc-center' type="submit" disabled={isSubmitting}>Enviar</button>
                </div>
            </div>
        </ModalBase>
    )
}