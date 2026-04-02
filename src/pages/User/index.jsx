import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage"
import Header from "../../components/Header"
import Toggle from "../../components/Toggle"
import UploadAvatar from "../../components/UploadAvatar"
import { useTask } from "../../providers/taskContext"
import { useUser } from "../../providers/userContext"
import { updatePasswordSchema, updateUserSchema } from "../../schemas/user/update"
import instance from "../../services/instance"
import "./styles.scss"
import _CountUp from "react-countup"
const CountUp = _CountUp.default
import { useGlobal } from "../../providers/globalContext"
import AlertModal from "../../components/AlertModal"

export default function User() {

    const { listUser, user, setPhotoSteps } = useUser()

    const { listTasks, tasks } = useTask()

    const { setAlertInfos } = useGlobal()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(updateUserSchema),
    });

    const { reset: resetPass,
        register: registerPass,
        handleSubmit: handleSubmitPass,
        formState: { errors: errorsPass,
            isSubmitting: isSubmittingPass } } = useForm({
                resolver: yupResolver(updatePasswordSchema)
            })


    const handleEditUser = async (data, key) => {
        delete data.confirmPassword

        delete data.phonenumber

        try {
            await instance.put('/user', data)
            listUser()
            resetPass()

            setAlertInfos({ open: true, message: 'Dados atualizados com sucesso!', type: 'success' })
        } catch (error) {
            return console.error({ ...error });
        }
    };

    const changeTheme = async () => {
        const theme = user.data.theme === "light" ? "dark" : "light"

        try {
            await instance.put('/user', { theme })

            const html = document.querySelector('html');
            html.setAttribute('data-theme', theme);

            listUser()
        } catch (error) {
            showError(error)
        }
    }

    const deletePhoto = async () => {

        try {
            await instance.delete("/user/avatar");

            listUser()
        } catch (err) {
            showError(err);
        }
    }

    useEffect(() => {
        if (!user.loading && user.data) {
            reset({
                name: user.data.name,
                email: user.data.email,
                phonenumber: user.data.phonenumber,
            })
        }
    }, [user.data])



    useEffect(() => {
        listTasks()
    }, [])

    return (
        <main className="user-settings-page vertical ai-center g4">
            <Header />
            <div className="header-user-settings content-width horizontal g1 ai-center between">
                <div className="texts vertical g1">
                    <h1 className="title">Meu Perfil</h1>
                    <p className="subtitle">Gerencie suas informações e preferências</p>
                </div>
                <Link className="button secondary hover-yellow" type="button" to='/dashboard'>Voltar para Dashboard</Link>
            </div>
            <section className="surface fade-anim vertical">
                <h1 className="section-title">Foto e Identificação</h1>
                <div className="user-photo-section horizontal g4">
                    <div className="user-photo-img center photo-config"
                        style={{ backgroundImage: `url(${user.data?.avatar})` }}
                    >
                        {!user.data.avatar &&
                            <span className="text-4xl font-title text-yellow-800">{user.data?.initials}</span>

                        }
                        <div className="user-photo-upload-btn center pointer" onClick={() => setPhotoSteps('select')}>
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                        </div>
                    </div>
                    <div className="vertical g2">
                        <div className="vertical">
                            <h3 className="title text-yellow-800">{user.data?.name}</h3>
                            <p className="subtitle">{user.data?.email}</p>
                        </div>
                        <div className="user-photo-actions horizontal g1">
                            <button className="button secondary hover-yellow" type='button' onClick={() => setPhotoSteps('select')}>Alterar foto</button>
                            <button className="button secondary hover-red" type='button' onClick={deletePhoto} >Remover</button>
                        </div>
                        <p className="subtitle" >JPG, PNG ou WebP · Máx. 5MB</p>
                    </div>
                </div>
            </section>
            <div className="surface fade-anim vertical">
                <h1 className="section-title">Estatísticas</h1>
                <div className="horizontal g4 wrap w100">
                    {[
                        { label: "Tarefas criadas", value: tasks.items?.length },
                        { label: "Concluídas", value: tasks.items?.filter(t => t.completed).length },
                        { label: "Em aberto", value: tasks.items?.filter(t => !t.completed).length },
                    ].map(({ label, value }) => (
                        <div key={label} className="stat-card">
                            <CountUp className="title text-yellow-800" end={value} duration={2} />
                            <h3 className="subtitle">{label}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <form className='surface fade-anim vertical' onSubmit={handleSubmit(data => handleEditUser(data, 'data'))}>
                <h1 className="section-title">Dados Pessoais</h1>
                <div className="field-group">
                    <label className="label" htmlFor="name">Nome completo</label>
                    <input className={`input ${errors.name && 'error'}`}
                        type="text"
                        id="name"
                        {...register('name')}
                    />
                    <ErrorMessage message={errors.name?.message} />
                </div>
                <div className="field-group">
                    <label className="label" htmlFor="email">E-mail</label>
                    <div className="horizontal g1 ai-center">
                        <span className="input-icon">
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,12 2,6"></polyline></svg>
                        </span>
                        <input className={`input ${errors.email && 'error'}`}
                            type="email"
                            id="email"
                            {...register('email')}
                        />
                    </div>
                    <ErrorMessage message={errors.email?.message} />
                </div>
                <div className="field-group">
                    <label className="label" htmlFor="phonenumber">WhatsApp</label>
                    <div className="horizontal g1 ai-center">
                        <span className="input-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                        </span>
                        <input className={`input ${errors.phonenumber && 'error'}`}
                            type="tel"
                            id="name"
                            {...register('phonenumber')}
                        />
                    </div>
                    <ErrorMessage message={errors.phonenumber?.message} />
                    <span className="span">Usado para acesso via bot do WhatsApp. Somente números, sem espaço ou traço.</span>
                </div>
                <div className="horizontal g1 jc-end">
                    <button className="button secondary hover-red" type="button">Cancelar</button>
                    <button className='button' type="submit" disabled={isSubmitting}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                        Salvar alterações
                    </button>
                </div>
            </form>
            <form className="surface fade-anim vertical" onSubmit={handleSubmitPass(data => handleEditUser(data, 'pass'))}>
                <div className="section-title">Segurança</div>
                <div className="field-group">
                    <div className="horizontal between ai-center">
                        <label className="label" htmlFor="currentPassword">Senha atual</label>
                        <Link className="link" to='/forgot-pass'>Esqueceu a senha?</Link>
                    </div>
                    <input className={`input ${errorsPass.currentPassword && 'error'}`}
                        type="password"
                        id="currentPassword"
                        placeholder="••••••••"
                        {...registerPass('currentPassword')}
                    />
                    <ErrorMessage message={errorsPass.currentPassword?.message} />
                </div>
                <div className="horizontal g1">
                    <div className="field-group w100">
                        <label className="label" htmlFor="newPassword">Nova senha</label>
                        <input className={`input ${errorsPass.newPassword && 'error'}`}
                            type="password"
                            id="newPassword"
                            {...registerPass('newPassword')}
                        />
                        <ErrorMessage message={errorsPass.newPassword?.message} />
                    </div>
                    <div className="field-group w100">
                        <label className="label" htmlFor="confirmPassword">Confirmar senha</label>
                        <input className={`input ${errorsPass.confirmPassword && 'error'}`}
                            type="password"
                            id="confirmPassword"
                            placeholder="••••••••"
                            {...registerPass('confirmPassword')}
                        />
                        <ErrorMessage message={errorsPass.confirmPassword?.message} />
                    </div>
                </div>
                <div className="horizontal g1 jc-end">
                    <button className='button' type="submit" disabled={isSubmittingPass}>
                        Atualziar senha
                    </button>
                </div>
            </form>
            <section className="surface fade-anim vertical">
                <div className="section-title">Preferências</div>
                <div className="preference-row">
                    <div className="preference-label">
                        <h4 className="preference-title">Tema escuro</h4>
                        <p className='subtitle'>Interface com fundo escuro</p>
                    </div>
                    <Toggle
                        checked={user.data?.theme === 'light'}
                        onChange={changeTheme} />
                </div>
                <div className="preference-row">
                    <div className="preference-label">
                        <h4 className="preference-title">Notificações via WhatsApp</h4>
                        <p className='subtitle'>Receber lembretes das tarefas pelo bot</p>
                    </div>
                    <Toggle />
                </div>
                <div className="preference-row">
                    <div className="preference-label">
                        <h4 className="preference-title">Tarefas atrasadas em destaque</h4>
                        <p className='subtitle'>Exibir alerta visual nas tarefas vencidas</p>
                    </div>
                    <Toggle />
                </div>
            </section>
            <section className="surface danger fade-anim vertical">
                <div className="section-title">Zona de Perigo</div>
                <div className="preference-row">
                    <div>
                        <h4 className="preference-title">Limpar todas as tarefas</h4>
                        <p className="subtitle">Remove permanentemente todas as tarefas da sua conta</p>
                    </div>
                    <button className="button bg-red">Limpar tarefas</button>
                </div>
                <div className="preference-row">
                    <div>
                        <h4 className="preference-title">Excluir conta</h4>
                        <p className="subtitle">Apaga sua conta e todos os dados associados</p>
                    </div>
                    <button className="button bg-red">Excluir conta</button>
                </div>
            </section>
            <UploadAvatar />
            <AlertModal />
        </main>
    )
}