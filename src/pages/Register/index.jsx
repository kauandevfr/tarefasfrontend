import { Link } from "react-router-dom"
import Title from "../../components/Title"
import "./styles.scss"

export default function Register() {
    return (
        <main className="center">
            <div className="blur" />
            <div className="wrapper">
                <form className="panel-right vertical p4 between">
                    <div className="brand">
                        <Title />
                        <h2 className="subtitle">Seu gerenciador pessoal.</h2>
                    </div>

                    <div class="benefits vertical g2">
                        <div class="benefit">
                            <div class="benefit-icon">
                                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            </div>
                            <div class="benefit-text">
                                <strong>Tarefas ilimitadas</strong>
                                <span>Crie quantas tarefas precisar, sem restrições</span>
                            </div>
                        </div>
                        <div class="benefit">
                            <div class="benefit-icon">
                                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>
                            </div>
                            <div class="benefit-text">
                                <strong>Visão calendário</strong>
                                <span>Acompanhe suas tarefas em formato mensal</span>
                            </div>
                        </div>
                        <div class="benefit">
                            <div class="benefit-icon">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                            </div>
                            <div class="benefit-text">
                                <strong>Bot no WhatsApp</strong>
                                <span>Gerencie tarefas direto pelo WhatsApp</span>
                            </div>
                        </div>
                        <div class="benefit">
                            <div class="benefit-icon">
                                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M20 6L9 17l-5-5"></path></svg>
                            </div>
                            <div class="benefit-text">
                                <strong>100% gratuito</strong>
                                <span>Sem planos pagos, sem anúncios, sem pegadinha</span>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="panel-left p4">
                    <div className="form-header">
                        <h1 className="title">Crie sua<br />conta.</h1>
                        <h2 className="subtitle">Grátis, sem cartão de crédito.</h2>
                    </div>
                    <div className="vertical w100 g2">

                        <div className="field-group">
                            <label className="label" htmlFor="name">Nome</label>
                            <input className="input"
                                type="text"
                                riquired
                                autoFocus
                                id="name"
                                placeholder="Seu nome"
                            />
                        </div>

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
                            <label className="label" htmlFor="password">Senha</label>
                            <input className="input"
                                type="password"
                                riquired
                                autoFocus
                                id="password"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <div className="vertical g2">
                        <button className="button w100"
                            type="submit"
                        >
                            Criar conta
                        </button>
                        <span className="span horizontal g1 jc-center">
                            Já tem uma conta?
                            <Link className="link" to='/login'>
                                Fazer login
                            </Link>
                        </span>
                    </div>
                </div>

            </div>
        </main >
    )
}