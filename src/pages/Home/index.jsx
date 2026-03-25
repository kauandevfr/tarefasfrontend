import Title from '../../components/Title'
import { useReveal } from './useReveal'
import './styles.scss'
import { Link } from 'react-router-dom'

export default function Home() {

    const fc1 = useReveal(), fc2 = useReveal(), fc3 = useReveal()
    const fc4 = useReveal(), fc5 = useReveal(), fc6 = useReveal()

    const s1 = useReveal(), s2 = useReveal(), s3 = useReveal()

    const wm1 = useReveal(), wm2 = useReveal(), wm3 = useReveal()
    const wm4 = useReveal(), wm5 = useReveal()

    const cta = useReveal()

    const pt1 = useReveal(), pt2 = useReveal(), pt3 = useReveal()

    return (
        <main className='center'>
            <section className="hero center">

                <nav className='landing-nav horizontal between ai-center'>
                    <Title />
                    <ul className="nav-links horizontal g4">
                        <li><a className="link" href="#features">Funcionalidades</a></li>
                        <li><a className="link" href="#como-funciona">Como funciona</a></li>
                        <li><a className="link" href="#whatsapp">WhatsApp</a></li>
                    </ul>
                    <div className="horizontal g2">
                        <Link className="button secondary" to='/login' >Entrar</Link>
                        <Link className="button" to='/register'>Começar grátis</Link>
                    </div>
                </nav>


                <div className="hero-inner center">
                    <div className="hero-badge horizontal g2 ai-center">
                        <div className="hero-badge-dot"></div>
                        <span>Gerenciador de tarefas pessoal</span>
                    </div>

                    <h1 className="title text-center hero-title fade-anim">
                        Organize o que<br /><span className='text-yellow-800'>realmente importa.</span>
                    </h1>

                    <p className="subtitle text-xl text-center fade-anim">
                        Controle suas tarefas por prioridade, acompanhe seu
                        <br /> progresso diário e receba lembretes direto no WhatsApp.
                    </p>

                    <div className="hero-actions horizontal g2 fade-anim">
                        <Link className="button" to='/register'>
                            Começar agora
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                        <button className="button secondary hover-yellow">Ver funcionalidades</button>
                    </div>

                    <div className="preview-wrap fade-anim">
                        <div className="app-preview">
                            <div className="preview-bar horizontal ai-center g2">
                                <div className="dot high"></div>
                                <div className="dot medium"></div>
                                <div className="dot low"></div>
                                <div className="preview-url">tarefas.kauanrodrigues.com.br</div>
                            </div>
                            <div className="horizontal">
                                <div className="preview-sidebar vertical g1">
                                    <div className="ps-label">Visualização</div>
                                    <div className="ps-item active">
                                        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M8 6h13M8 12h13M8 18h13"></path>
                                        </svg>
                                        Lista
                                    </div>
                                    <div className="ps-item">
                                        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                                            <path d="M16 2v4M8 2v4M3 10h18"></path>
                                        </svg>
                                        Calendário
                                    </div>
                                    <div className="ps-label" >Prioridade</div>
                                    <div className="ps-item"><span className="ps-dot high" ></span>Alta</div>
                                    <div className="ps-item"><span className="ps-dot medium" ></span>Média</div>
                                    <div className="ps-item"><span className="ps-dot low" ></span>Baixa</div>
                                </div>
                                <div className="preview-main vertical g1">
                                    <div className="pm-header horizontal w100 between">
                                        <div className='vertical'>
                                            <div className="text-xl font-title">Minhas Tarefas</div>
                                            <div className="pm-date text-gray-300">17 de março de 2026</div>
                                        </div>
                                        <div className="button">+ Nova Tarefa</div>
                                    </div>

                                    <div className="pm-progress horizontal g2 ai-center preview-row">
                                        <div className="pm-bar-wrap">
                                            <div className="pm-bar-fill"></div>
                                        </div>
                                        <span className="pm-stat">1/3</span>
                                    </div>

                                    <div className="pm-task done preview-row horizontal g1 ai-center between">
                                        <div className="pm-check done"></div>
                                        <div className="pm-task-text">Estudar para prova de AOO</div>
                                        <div className="task-meta high"><span>Alta</span></div>
                                    </div>
                                    <div className="pm-task done preview-row horizontal g1 ai-center between">
                                        <div className="pm-check"></div>
                                        <div className="pm-task-text">Configurar servidor Ubuntu</div>
                                        <div className="task-meta medium"><span>Média</span></div>
                                    </div>
                                    <div className="pm-task done preview-row horizontal g1 ai-center between">
                                        <div className="pm-check"></div>
                                        <div className="pm-task-text">Treino na academia</div>
                                        <div className="task-meta low"><span>Baixa</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="features content-width vertical" id="features">

                <div className="vertical g2">
                    <span className="section-eyebrow uppercase text-sm text-yellow-800 text-w-800">Funcionalidades</span>
                    <h2 className="title">Tudo que você precisa,<br /><span className='text-yellow-800'>nada que você não precisa.</span></h2>
                    <p className="subtitle">Simples por design. Poderoso no uso diário.</p>
                </div>

                <div className="features-grid">
                    <div ref={fc1.ref} className={`feature-card reveal-up${fc1.visible ? ' visible' : ''}`} style={{ transitionDelay: '0s' }}>
                        <div className="feature-icon">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Gestão por prioridade</h3>
                        <p className="feature-desc">Classifique tarefas como Alta, Média ou Baixa e foque no que realmente move o ponteiro.</p>
                    </div>

                    <div ref={fc2.ref} className={`feature-card reveal-up${fc2.visible ? ' visible' : ''}`} style={{ transitionDelay: '.2s' }}>
                        <div className="feature-icon">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Visão calendário</h3>
                        <p className="feature-desc">Visualize suas tarefas em formato de calendário mensal. Navegue entre dias e veja o progresso de cada um.</p>
                    </div>

                    <div ref={fc3.ref} className={`feature-card reveal-up${fc3.visible ? ' visible' : ''}`} style={{ transitionDelay: '.4s' }}>
                        <div className="feature-icon">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Alerta de atraso</h3>
                        <p className="feature-desc">Tarefas vencidas são destacadas automaticamente para que nada passe despercebido.</p>
                    </div>

                    <div ref={fc4.ref} className={`feature-card reveal-up${fc4.visible ? ' visible' : ''}`} style={{ transitionDelay: '0s' }}>
                        <div className="feature-icon">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Perfil personalizado</h3>
                        <p className="feature-desc">Foto de perfil, dados pessoais e preferências — tudo em uma página dedicada, não num modal.</p>
                    </div>

                    <div ref={fc5.ref} className={`feature-card reveal-up${fc5.visible ? ' visible' : ''}`} style={{ transitionDelay: '.2s' }}>
                        <div className="feature-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: .8 }}>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Bot no WhatsApp</h3>
                        <p className="feature-desc">Crie e consulte tarefas direto pelo WhatsApp, identificado automaticamente pelo seu número.</p>
                    </div>

                    <div ref={fc6.ref} className={`feature-card reveal-up${fc6.visible ? ' visible' : ''}`} style={{ transitionDelay: '.4s' }}>
                        <div className="feature-icon">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                        </div>
                        <h3 className="feature-title">Edição rápida</h3>
                        <p className="feature-desc">Edite título, descrição, prioridade e data de qualquer tarefa com um clique, sem sair da tela.</p>
                    </div>
                </div>
            </section>

            {/* ── How it works ── */}
            <section className="how vertical content-width" id="como-funciona">
                <div className="vertical g2">
                    <span className="uppercase text-sm text-yellow-800 text-w-800">Como funciona</span>
                    <h2 className="section-heading title">Três passos<br /><span className='text-yellow-800'>pra começar.</span></h2>
                </div>

                <div className="steps">
                    <div ref={s1.ref} className={`step reveal-up${s1.visible ? ' visible' : ''}`} style={{ transitionDelay: '0s' }}>
                        <div className="step-num">1</div>
                        <div className="step-title">Crie sua conta</div>
                        <div className="step-desc">Cadastro simples com nome, e-mail e senha. Sem burocracia, sem planos confusos.</div>
                    </div>
                    <div ref={s2.ref} className={`step reveal-up${s2.visible ? ' visible' : ''}`} style={{ transitionDelay: '.2s' }}>
                        <div className="step-num">2</div>
                        <div className="step-title">Adicione tarefas</div>
                        <div className="step-desc">Título, prioridade e data de vencimento. Tudo num modal rápido ou pelo WhatsApp.</div>
                    </div>
                    <div ref={s3.ref} className={`step reveal-up${s3.visible ? ' visible' : ''}`} style={{ transitionDelay: '.4s' }}>
                        <div className="step-num">3</div>
                        <div className="step-title">Acompanhe o progresso</div>
                        <div className="step-desc">Veja quanto você concluiu no dia, filtre por prioridade e navegue no calendário.</div>
                    </div>
                </div>
            </section>

            {/* ── Priority Section ── */}
            <section className="priority-section content-width horizontal">
                <div className="priority-texts vertical g2">
                    <div className="uppercase text-sm text-yellow-800 text-w-800">Prioridades</div>
                    <h2 className="title">Saiba o que<br /><span className='text-yellow-800'>fazer primeiro.</span></h2>
                    <p className="subtitle">Cada tarefa tem um nível de prioridade que fica visível de relance. Sem precisar repensar o
                        que é urgente.
                    </p>
                </div>
                <div className="priority-visual center g1">
                    <div ref={pt1.ref} className={`pm-task done preview-row horizontal g1 ai-center between reveal-left${pt1.visible ? ' visible' : ''}`} style={{ transitionDelay: '0s' }}>
                        <div className="pm-check done"></div>
                        <div className="pm-task-text">Estudar para prova de AOO</div>
                        <div className="task-meta high"><span>Alta</span></div>
                    </div>

                    <div ref={pt2.ref} className={`pm-task done preview-row horizontal g1 ai-center between reveal-left${pt2.visible ? ' visible' : ''}`} style={{ transitionDelay: '.2s' }}>
                        <div className="pm-check"></div>
                        <div className="pm-task-text">Configurar servidor Ubuntu</div>
                        <div className="task-meta medium"><span>Média</span></div>
                    </div>

                    <div ref={pt3.ref} className={`pm-task done preview-row horizontal g1 ai-center between reveal-left${pt3.visible ? ' visible' : ''}`} style={{ transitionDelay: '.4s' }}>
                        <div className="pm-check"></div>
                        <div className="pm-task-text">Treino na academia</div>
                        <div className="task-meta low"><span>Baixa</span></div>
                    </div>
                </div>
            </section>

            {/* ── WhatsApp ── */}
            <section className="whatsapp" id="whatsapp">
                <div className="whatsapp-section content-width">
                    <div className='vertical g2 ai-start'>
                        <div className="whatsapp-badge">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                            </svg>
                            Em breve
                        </div>
                        <h2 className="title" >Gerencie pelo<br /><span className='text-yellow-800'>WhatsApp.</span></h2>
                        <p className='subtitle'>
                            Adicione seu número no perfil e passe a criar, consultar e marcar tarefas como concluídas diretamente por
                            mensagem — sem abrir o app.
                        </p>
                    </div>
                    <div className="vertical g1">
                        <div ref={wm1.ref} className={`wa-msg bot reveal-up${wm1.visible ? ' visible' : ''}`} style={{ transitionDelay: '0s' }}>
                            Olá, Kauan! 👋 Você tem <strong>2 tarefas abertas</strong> para hoje. Deseja ver a lista?
                            <div className="wa-time">09:00</div>
                        </div>
                        <div ref={wm2.ref} className={`wa-msg user reveal-up${wm2.visible ? ' visible' : ''}`} style={{ transitionDelay: '.2s' }}>
                            sim
                            <div className="wa-time">09:01</div>
                        </div>
                        <div ref={wm3.ref} className={`wa-msg bot reveal-up${wm3.visible ? ' visible' : ''}`} style={{ transitionDelay: '.4s' }}>
                            📋 <strong>Suas tarefas de hoje:</strong><br /><br />
                            🔴 Estudar AOO — Alta<br />
                            🟡 Config. servidor — Média
                            <div className="wa-time">09:01</div>
                        </div>
                        <div ref={wm4.ref} className={`wa-msg user reveal-up${wm4.visible ? ' visible' : ''}`} style={{ transitionDelay: '.6s' }}>
                            criar tarefa: academia, baixa, hoje
                            <div className="wa-time">09:03</div>
                        </div>
                        <div ref={wm5.ref} className={`wa-msg bot reveal-up${wm5.visible ? ' visible' : ''}`} style={{ transitionDelay: '.8s' }}>
                            ✅ Tarefa <strong>"academia"</strong> criada com prioridade Baixa para hoje!
                            <div className="wa-time">09:03</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section ref={cta.ref} className={`cta-section content-width center reveal-up${cta.visible ? ' visible' : ''}`}>
                <div className="vertical ai-center g2">
                    <h2 className="title text-center">Pronto pra organizar<br /><span className='text-yellow-800'>seu dia?</span></h2>
                    <p className="subtitle">Gratuito. Sem anúncios. Sem complicação.</p>
                    <Link className="button font-title" to='/register' >
                        Começar agora
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>
            </section>

        </main>
    )
}