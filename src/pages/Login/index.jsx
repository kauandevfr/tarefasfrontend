import { Link } from "react-router-dom"
import Title from "../../components/Title"

export default function Login() {
    return (
        <main className="center">
            <div className="blur" />
            <div className="wrapper">
                <div className="panel-left p4">
                    <div className="form-header">
                        <h1 className="title">Bem vindo<br /><span className="text-yellow-800">de volta.</span></h1>
                        <h2 className="subtitle">Entre com suas credenciais para continuar.</h2>
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
                        <div className="field-group">
                            <div className="horizontal between">
                                <label className="label" htmlFor="password">Senha</label>
                                <Link className="link" to='forgot-pass'>Esqueceu a senha?</Link>
                            </div>
                            <input className="input"
                                type="password"
                                riquired
                                autoFocus
                                id="password"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="vertical g2 ai-center">
                        <button className="button w100 jc-center"
                            type="submit"
                        >
                            Iniciar sessão
                        </button>
                        <span className="span horizontal g1 jc-center">
                            Não tem uma conta?
                            <Link className="link" to='/register'>
                                Criar conta
                            </Link>
                        </span>
                    </div>
                </div>
                <form className="panel-right vertical p4 between">
                    <div className="brand">
                        <Title />
                        <h2 className="subtitle">Seu gerenciador pessoal.</h2>
                    </div>

                    <div className="footer">
                        <h3 className="text-3xl font-title">
                            "Organize o que<br />
                            <span className="text-yellow-800">
                                realmente importa.
                            </span>
                            "
                        </h3>
                    </div>
                </form>
            </div>
        </main >
    )
}