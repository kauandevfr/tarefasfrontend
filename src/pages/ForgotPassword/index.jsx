import { Link } from "react-router-dom"
import Title from "../../components/Title"
import "./styles.scss"

export default function ForgotPassword() {
    return (
        <main className="center">
            <div className="blur" />
            <div className="wrapper">

                <form className="panel-right vertical p4 between">
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

                    <div class="steps vertical g1">
                        <div class="step">
                            <h3 class="step-num">1</h3>
                            <p class="span">Informe seu e-mail cadastrado</p>
                        </div>
                        <div class="step">
                            <h3 class="step-num">2</h3>
                            <p class="span">Verifique sua caixa de entrada</p>
                        </div>
                        <div class="step">
                            <h3 class="step-num">3</h3>
                            <p class="span">Clique no link e crie uma nova senha</p>
                        </div>
                    </div>

                </form>
                <div className="panel-left p4">
                    <div className="form-header">
                        <h1 className="title">Esqueceu<br />a senha?</h1>
                        <h2 className="subtitle">Sem problema. Digite seu e-mail e te enviamos o link de recuperação.</h2>
                    </div>
                    <div className="vertical w100 g2">
                        <div className="field-group">
                            <label className="label" htmlFor="email">E-mail</label>
                            <input className="input"
                                type="text"
                                riquired
                                autoFocus
                                id="email"
                                placeholder="seu@email.com"
                            />
                        </div>

                    </div>
                    <div className="vertical g2">
                        <button className="button w100"
                            type="submit"
                        >
                            Enviar link de recuperação
                        </button>
                        <span className="span horizontal g1 jc-center">
                            <Link className="link" to='/register'>
                                Voltar para o login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </main >
    )
}