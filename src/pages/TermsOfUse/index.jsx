import { Link } from 'react-router-dom'
import Title from '../../components/Title'
import './styles.scss'

export default function TermsOfUse() {
    return (
        <>
            <main className='center'>
                <div className='policy-page content-width vertical g4 fade-anim'>

                    <nav className='horizontal between ai-center w100'>
                        <Title />
                        <Link className='button secondary' to='/'>Voltar ao início</Link>
                    </nav>

                    <header className='vertical g2'>
                        <span className='uppercase text-sm text-yellow-800 text-w-800'>Legal</span>
                        <h1 className='title'>Termos de <span className='text-yellow-800'>Uso.</span></h1>
                        <p className='subtitle'>Última atualização: abril de 2025</p>
                    </header>

                    <div className='policy-intro surface'>
                        <p className='text-sm text-gray-300'>
                            Ao criar uma conta ou utilizar o <strong className='text-white'>tarefas.</strong>, você concorda com os presentes
                            Termos de Uso. Se não concordar com algum item, pedimos que não utilize o serviço.
                            Estes termos regem a relação entre você e Kauan Rodrigues, desenvolvedor e responsável pelo tarefas.
                        </p>
                    </div>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>1. Descrição do serviço</h2>
                        <p className='text-sm text-gray-300'>
                            O tarefas. é um gerenciador de tarefas pessoal de uso gratuito, sem fins comerciais, desenvolvido como
                            projeto independente. O serviço permite criar, organizar e acompanhar tarefas por prioridade e data,
                            com funcionalidades adicionais como visualização em calendário e integração com WhatsApp (em breve).
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>2. Elegibilidade</h2>
                        <p className='text-sm text-gray-300'>
                            Para utilizar o tarefas. você deve ter pelo menos 13 anos de idade. Ao criar uma conta, você declara
                            que as informações fornecidas são verdadeiras e que você tem capacidade para aceitar estes termos.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>3. Sua conta</h2>
                        <div className='vertical g1 text-sm text-gray-300'>
                            <p>Você é responsável por:</p>
                            <ul className='policy-list'>
                                <li>Manter a confidencialidade da sua senha.</li>
                                <li>Todas as atividades realizadas com sua conta.</li>
                                <li>Notificar imediatamente em caso de acesso não autorizado.</li>
                            </ul>
                            <p>
                                É permitido apenas um cadastro por pessoa. Contas criadas com informações falsas ou usadas de
                                forma indevida podem ser removidas sem aviso prévio.
                            </p>
                        </div>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>4. Uso adequado</h2>
                        <div className='vertical g1 text-sm text-gray-300'>
                            <p>Ao usar o tarefas., você concorda em não:</p>
                            <ul className='policy-list'>
                                <li>Tentar comprometer a segurança, disponibilidade ou integridade do serviço.</li>
                                <li>Realizar engenharia reversa ou tentativas de acesso não autorizado ao sistema.</li>
                                <li>Usar o serviço para qualquer finalidade ilegal.</li>
                                <li>Criar scripts ou bots para automatizar requisições de forma abusiva.</li>
                            </ul>
                        </div>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>5. Seus dados e conteúdo</h2>
                        <p className='text-sm text-gray-300'>
                            Você é o único proprietário das tarefas e dados que cria no tarefas. Não reivindicamos nenhum direito
                            sobre seu conteúdo. Ao usar o serviço, você nos concede apenas a permissão necessária para armazenar
                            e exibir seu conteúdo para você.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>6. Disponibilidade do serviço</h2>
                        <p className='text-sm text-gray-300'>
                            O tarefas. é oferecido gratuitamente, sem garantias de disponibilidade contínua. O serviço pode passar
                            por manutenções, atualizações ou interrupções temporárias. Não nos responsabilizamos por perdas
                            decorrentes de indisponibilidade ou falhas técnicas. Recomendamos não usar o tarefas. como único
                            repositório de informações críticas.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>7. Integração com WhatsApp</h2>
                        <p className='text-sm text-gray-300'>
                            A funcionalidade de bot no WhatsApp é opcional e depende da API do WhatsApp Business (Meta).
                            Ao habilitar essa funcionalidade, você está ciente de que as mensagens trafegam pela infraestrutura
                            da Meta e sujeitas às políticas deles. O tarefas. não se responsabiliza por falhas, atrasos ou
                            alterações de funcionamento causados por mudanças na API da Meta.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>8. Limitação de responsabilidade</h2>
                        <p className='text-sm text-gray-300'>
                            O tarefas. é fornecido "como está", sem garantias expressas ou implícitas. Kauan Rodrigues não se
                            responsabiliza por danos diretos, indiretos, incidentais ou consequentes decorrentes do uso ou
                            da impossibilidade de uso do serviço.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>9. Encerramento de conta</h2>
                        <p className='text-sm text-gray-300'>
                            Você pode excluir sua conta a qualquer momento nas configurações do perfil. Reservamo-nos o direito
                            de suspender ou encerrar contas que violem estes termos, sem aviso prévio.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>10. Alterações nos termos</h2>
                        <p className='text-sm text-gray-300'>
                            Estes termos podem ser atualizados a qualquer momento. Em caso de mudanças relevantes, você será
                            notificado por e-mail. O uso continuado do serviço após as alterações implica na aceitação dos novos termos.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>11. Lei aplicável</h2>
                        <p className='text-sm text-gray-300'>
                            Estes termos são regidos pelas leis brasileiras. Eventuais conflitos serão resolvidos pelo foro da
                            Comarca de São Paulo — SP, com renúncia a qualquer outro, por mais privilegiado que seja.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='font-title text-2xl'>12. Contato</h2>
                        <p className='text-sm text-gray-300'>
                            Dúvidas sobre estes termos? Entre em contato:
                            <br /><br />
                            <strong className='text-white'>Kauan Rodrigues</strong><br />
                            <a className='link' href='mailto:contato@kauanrodrigues.com.br'>contato@kauanrodrigues.com.br</a>
                        </p>
                    </section>

                    <div className='policy-footer horizontal between ai-center'>
                        <span className='text-sm text-gray-300'>tarefas. · Kauan Rodrigues · 2025</span>
                        <Link className='link text-sm' to='/privacy'>Ver Política de Privacidade →</Link>
                    </div>

                </div>
            </main>
        </>
    )
}