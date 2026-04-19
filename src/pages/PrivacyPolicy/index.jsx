import { Link } from 'react-router-dom'
import Title from '../../components/Title'
import './styles.scss'

export default function PrivacyPolicy() {
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
                        <h1 className='title'>Política de <span className='text-yellow-800'>Privacidade.</span></h1>
                        <p className='subtitle'>Última atualização: abril de 2025</p>
                    </header>

                    <div className='policy-intro surface'>
                        <p className='text-sm text-gray-300'>
                            O <strong className='text-white'>tarefas.</strong> é um gerenciador de tarefas pessoal desenvolvido e mantido por Kauan Rodrigues.
                            Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados
                            pessoais, em conformidade com a <strong className='text-white'>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
                        </p>
                    </div>

                    <section className='vertical g2'>
                        <h2 className='text-2xl font-title'>1. Dados que coletamos</h2>
                        <div className='vertical g1 text-sm text-gray-300'>
                            <p>Ao utilizar o tarefas., coletamos os seguintes dados pessoais:</p>
                            <ul className='policy-list'>
                                <li><strong className='text-white'>Nome:</strong> usado para personalizar sua experiência dentro do app.</li>
                                <li><strong className='text-white'>Endereço de e-mail:</strong> usado para autenticação, recuperação de senha e notificações transacionais.</li>
                                <li><strong className='text-white'>Foto de perfil:</strong> imagem enviada voluntariamente por você para personalizar seu perfil.</li>
                                <li><strong className='text-white'>Número de telefone (WhatsApp):</strong> coletado opcionalmente quando você opta por usar a integração com o bot de WhatsApp. Usado exclusivamente para identificação e envio de mensagens pelo serviço.</li>
                                <li><strong className='text-white'>Dados de tarefas:</strong> título, descrição, prioridade e datas das tarefas que você cria. Esses dados pertencem a você e são usados apenas para prover o serviço.</li>
                                <li><strong className='text-white'>Dados de acesso:</strong> logs técnicos como IP e data/hora de login, coletados para fins de segurança.</li>
                            </ul>
                        </div>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='text-2xl font-title'>2. Como usamos seus dados</h2>
                        <div className='vertical g1 text-sm text-gray-300'>
                            <p>Seus dados são utilizados exclusivamente para:</p>
                            <ul className='policy-list'>
                                <li>Criar e manter sua conta.</li>
                                <li>Autenticar seu acesso com segurança.</li>
                                <li>Enviar e-mails transacionais (confirmação de cadastro, recuperação de senha, avisos de segurança).</li>
                                <li>Enviar lembretes e notificações via WhatsApp, caso você habilite essa funcionalidade.</li>
                                <li>Garantir o funcionamento correto do serviço.</li>
                            </ul>
                            <p className='text-sm text-gray-300'>
                                <strong className='text-white'>Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins comerciais ou publicitários.</strong>
                            </p>
                        </div>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='text-2xl font-title'>3. Integração com WhatsApp (Meta)</h2>
                        <p className='text-sm text-gray-300'>
                            A funcionalidade de bot no WhatsApp opera por meio da infraestrutura da Meta Platforms, Inc.
                            Ao habilitar essa funcionalidade, seu número de telefone é transmitido para a API do WhatsApp Business
                            com a finalidade exclusiva de entrega de mensagens. O tarefas. não armazena o conteúdo das conversas
                            além do necessário para executar as ações solicitadas. O uso da API do WhatsApp está sujeito também
                            à <a className='link' href='https://www.whatsapp.com/legal/privacy-policy' target='_blank' rel='noreferrer'>Política de Privacidade da Meta</a>.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='text-2xl font-title'>4. Armazenamento e segurança</h2>
                        <p className='text-sm text-gray-300'>
                            Seus dados são armazenados em servidores próprios hospedados no Brasil, com acesso restrito e protegido.
                            Senhas são armazenadas com hash criptográfico (bcrypt) e nunca em texto puro. Comunicações entre seu
                            dispositivo e o servidor ocorrem via HTTPS. Adotamos medidas técnicas razoáveis para proteger seus dados
                            contra acesso não autorizado, mas nenhum sistema é 100% inviolável.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='text-2xl font-title'>5. Por quanto tempo guardamos seus dados</h2>
                        <p className='text-sm text-gray-300'>
                            Seus dados são mantidos enquanto sua conta estiver ativa. Ao excluir sua conta, todos os seus dados pessoais
                            e tarefas são removidos permanentemente de nossos servidores em até 30 dias. Logs de segurança podem ser
                            mantidos por até 6 meses para fins de auditoria.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='text-2xl font-title'>6. Seus direitos (LGPD)</h2>
                        <div className='vertical g1 text-sm text-gray-300'>
                            <p>Nos termos da LGPD, você tem direito a:</p>
                            <ul className='policy-list'>
                                <li>Confirmar a existência de tratamento de seus dados.</li>
                                <li>Acessar os dados que temos sobre você.</li>
                                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                                <li>Revogar o consentimento a qualquer momento.</li>
                                <li>Solicitar a exclusão completa da sua conta e dados.</li>
                            </ul>
                            <p>Para exercer esses direitos, entre em contato pelo e-mail abaixo.</p>
                        </div>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='text-2xl font-title'>7. Cookies</h2>
                        <p className='text-sm text-gray-300'>
                            O tarefas. utiliza cookies HTTP para gerenciar sessões de autenticação. Esses cookies são estritamente necessários
                            para o funcionamento do serviço e não são usados para rastreamento ou publicidade.
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='text-2xl font-title'>8. Contato</h2>
                        <p className='text-sm text-gray-300'>
                            Para dúvidas, solicitações ou exercício de seus direitos, entre em contato com o responsável pelo tratamento de dados:
                            <br /><br />
                            <strong className='text-white'>Kauan Rodrigues</strong><br />
                            <a className='link' href='mailto:contato@kauanrodrigues.com.br'>contato@kauanrodrigues.com.br</a>
                        </p>
                    </section>

                    <section className='vertical g2'>
                        <h2 className='text-2xl font-title'>9. Alterações nesta política</h2>
                        <p className='text-sm text-gray-300'>
                            Esta política pode ser atualizada a qualquer momento. Em caso de mudanças relevantes, você será notificado
                            por e-mail. O uso continuado do serviço após as alterações implica na aceitação da nova política.
                        </p>
                    </section>

                    <div className='policy-footer horizontal between ai-center'>
                        <span className='text-sm text-gray-300'>tarefas. · Kauan Rodrigues · 2025</span>
                        <Link className='link text-sm' to='/terms'>Ver Termos de Uso →</Link>
                    </div>

                </div>
            </main>
        </>
    )
}