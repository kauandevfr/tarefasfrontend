import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import AlertModal from "../../components/AlertModal"
import ErrorMessage from "../../components/ErrorMessage"
import Title from "../../components/Title"
import { useGlobal } from "../../providers/globalContext"
import { resetPasswordSchema } from "../../schemas/user/resetpass"
import instance from "../../services/instance"
import "./styles.scss"

export default function ResetPassword() {
    const { showError, setAlertInfos } = useGlobal()
    const { token } = useParams()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({ resolver: yupResolver(resetPasswordSchema) });

    const changePassword = async d => {

        delete d.confirmPassword

        try {
            const { data } = await instance.post(`/user/reset-password/${token}`, d)

            setAlertInfos({ open: true, message: data.message, type: 'success' })

            navigate('/login')
            return console.log(data)
        } catch (error) {
            console.log(error)
            return showError(error)
        }
    }

    return (
        <main className="center">
            <div className="blur" />
            <div className="wrapper">

                <div className="panel-right vertical p4 between">
                    <div className="brand">
                        <Title />
                        <h2 className="subtitle">Seu gerenciador pessoal.</h2>
                    </div>

                    <div className="vertical g2">
                        <div className="key-illustration center">
                            <svg width="32" height="32" fill="none" stroke="currentColor"
                                strokeWidth="1.5" viewBox="0 0 24 24">
                                <rect x="5" y="11" width="14" height="10" rx="2" />
                                <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2 className="title">Crie uma<br /><span className="text-yellow-800">nova senha</span> segura.</h2>
                        <p className="span">Escolha uma senha forte que você não use em outros sites.</p>
                    </div>

                </div>
                <form className="panel-left p4"
                    onSubmit={handleSubmit(changePassword)}
                >
                    <div className="form-header">
                        <h1 className="title">Redefinir<br />a <span className="text-yellow-800">senha</span></h1>
                        <h2 className="subtitle">Digite sua nova senha abaixo. Após confirmar, você já pode fazer login normalmente.</h2>
                    </div>
                    <div className="vertical w100 g2">
                        <div className="field-group">
                            <label className="label" for="password">Nova senha</label>
                            <input className="input"
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                name="password"
                                {...register('password')}
                            />
                            <ErrorMessage message={errors.password?.message} />
                        </div>
                        <div className="field-group">
                            <label className="label" for="confirm-password">Confirmar nova senha</label>
                            <input className="input"
                                id="confirmPassword"
                                placeholder="••••••••"
                                type="password"
                                name="confirmPassword"
                                {...register('confirmPassword')}
                            />
                            <ErrorMessage message={errors.confirmPassword?.message} />
                        </div>

                    </div>
                    <div className="vertical g2">
                        <button className="button w100 jc-center"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Salvar nova senha
                        </button>
                        <span className="span horizontal g1 jc-center">
                            <Link className="link" to={'/login'}>Voltar para o login</Link>
                        </span>
                    </div>
                </form>
            </div>
            <AlertModal />
        </main >
    )
}