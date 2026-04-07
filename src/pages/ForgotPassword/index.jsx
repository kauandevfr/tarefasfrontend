import { Link, useNavigate } from "react-router-dom"
import Title from "../../components/Title"
import "./styles.scss"
import { useGlobal } from "../../providers/globalContext"
import instance from "../../services/instance"
import { forgotPassSchema } from "../../schemas/user/forgotpass"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ErrorMessage from "../../components/ErrorMessage"
import AlertModal from "../../components/AlertModal"

export default function ForgotPassword() {
    const navigate = useNavigate()
    const { showError, setAlertInfos } = useGlobal()

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({ resolver: yupResolver(forgotPassSchema) });


    const sendEmail = async d => {
        try {
            const { data } = await instance.post('/user/forgot-password', d)

            setAlertInfos({ open: true, message: data.message, type: 'success' })
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
                            <svg
                                width="32"
                                height="32"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="8" cy="15" r="4" />
                                <path d="M12 15h8M17 15v3" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2 className="title">Recupere o<br /><span className="text-yellow-800">acesso</span> à sua conta.</h2>
                        <p className="span">Enviaremos um link seguro para você redefinir sua senha rapidinho.</p>
                    </div>

                </div>
                <form className="panel-left p4"
                    onSubmit={handleSubmit(sendEmail)}
                >
                    <div className="form-header">
                        <h1 className="title">Esqueceu<br />a senha?</h1>
                        <h2 className="subtitle">Sem problema. Digite seu e-mail e te enviamos o link de recuperação.</h2>
                    </div>
                    <div className="vertical w100 g2">
                        <div className="field-group">
                            <label className="label" htmlFor="email">E-mail</label>
                            <input className={`input ${errors.email && 'error'}`}
                                type="text"
                                autoFocus
                                id="email"
                                placeholder="seu@email.com"
                                {...register('email')}
                            />
                            <ErrorMessage message={errors.email?.message} />
                        </div>

                    </div>
                    <div className="vertical g2">
                        <button className="button w100 jc-center"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Enviar link de recuperação
                        </button>
                        <span className="span horizontal g1 jc-center">
                            <button className="link" onClick={() => navigate(-1)}>
                                Voltar para o login
                            </button>
                        </span>
                    </div>
                </form>
            </div>
            <AlertModal />
        </main >
    )
}