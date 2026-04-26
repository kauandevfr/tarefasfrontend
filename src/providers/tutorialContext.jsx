import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { Joyride, STATUS } from 'react-joyride'
import { useNavigate } from 'react-router-dom'
import { useSetView } from './useViewStore'
import { useTask } from './taskContext'
import { useUser } from './userContext'
import { useGlobal } from './globalContext'
import { useDateStore } from './useDateRestore'
import instance from '../services/instance'
import TutorialTooltip from '../components/TutorialTooltip'
import WelcomeModal from '../components/WelcomeModal'

const TutorialContext = createContext({})
export const useTutorial = () => useContext(TutorialContext)

const sleep = ms => new Promise(r => setTimeout(r, ms))

const JOYRIDE_STEPS = [
    {
        target: '.main-aside',
        title: 'Painel lateral',
        content: 'Aqui você navega entre a lista e o calendário, filtra tarefas por status e prioridade, e acompanha os dias com tarefas atrasadas.',
        placement: 'right',
        disableBeacon: true,
    },
    {
        target: '[data-tutorial="new-task"]',
        title: 'Criar uma tarefa',
        content: 'Clique aqui para adicionar uma nova tarefa. Você define título, prioridade, data e pode configurar recorrência diária ou semanal.',
        placement: 'left',
        disableBeacon: true,
    },
    {
        target: '.modal-content',
        title: 'Formulário de tarefa',
        content: 'Preencha o título e escolha a prioridade — Alta, Média ou Baixa. O campo "Repetir" cria a tarefa automaticamente nos próximos dias.',
        placement: 'right',
        disableBeacon: true,
        floaterProps: { hideArrow: false },
    },
    {
        target: '.modal-content',
        title: 'Editando uma tarefa',
        content: 'O mesmo formulário aparece ao editar. Você pode alterar qualquer campo, marcar como concluída ou apenas ajustar a data.',
        placement: 'right',
        disableBeacon: true,
    },
    {
        target: '[data-tutorial="calendar-btn"]',
        title: 'Visão Calendário',
        content: 'Alterne para ver todas as tarefas do mês. Você pode arrastar tarefas entre os dias diretamente no calendário para reagendar.',
        placement: 'right',
        disableBeacon: true,
    },
    {
        target: '.cal-grid',
        title: 'Calendário mensal',
        content: 'Cada dia exibe as tarefas com cores de prioridade e uma barra de progresso. Clique em qualquer dia para ver a lista detalhada.',
        placement: 'bottom',
        disableBeacon: true,
    },
    {
        target: '.date-nav',
        title: 'Navegação por dia',
        content: 'Use as setas para navegar entre os dias. O nome do dia atualiza automaticamente conforme você avança.',
        placement: 'bottom',
        disableBeacon: true,
    },
    {
        target: '.search-wrap',
        title: 'Busca de tarefas',
        content: 'Encontre qualquer tarefa pelo nome em tempo real. A busca combina com os filtros de status e prioridade do painel lateral.',
        placement: 'bottom',
        disableBeacon: true,
    },
    {
        target: '[data-tutorial="progress"]',
        title: 'Progresso do dia',
        content: 'Acompanhe quantas tarefas você concluiu hoje. A barra e o contador atualizam conforme você marca as tarefas.',
        placement: 'top',
        disableBeacon: true,
    },
    {
        target: '[data-tutorial="task-row"]',
        title: 'Linha de tarefa',
        content: 'Cada tarefa mostra o título, a prioridade e os botões de editar e excluir. Clique no checkbox para marcar como concluída.',
        placement: 'top',
        disableBeacon: true,
    },
    {
        target: '.user-photo-section',
        title: 'Seu perfil',
        content: 'Atualize sua foto, nome, e-mail e número de WhatsApp. O número permite usar o bot para criar e consultar tarefas pelo próprio WhatsApp.',
        placement: 'bottom',
        disableBeacon: true,
    },
    {
        target: '[data-tutorial="preferences"]',
        title: 'Preferências',
        content: 'Ative o tema claro, habilite notificações via WhatsApp e configure alertas de tarefas atrasadas. Tudo em um só lugar.',
        placement: 'top',
        disableBeacon: true,
    },
]

const TOTAL = JOYRIDE_STEPS.length

export function TutorialProvider({ children }) {
    const navigate = useNavigate()
    const setView = useSetView()
    const { setShowTask, initialTask, listTasks } = useTask()
    const { user, listUser } = useUser()
    const { setHideAside } = useGlobal()
    const { date } = useDateStore()

    const [run, setRun] = useState(false)
    const [stepIndex, setStepIndex] = useState(0)
    const [showWelcome, setShowWelcome] = useState(false)
    const preparedRef = useRef(false)
    const tutorialTaskRef = useRef(null)

    useEffect(() => {
        if (!user.loading && user.data?.id && !user.data?.tutorial_done && !preparedRef.current) {
            preparedRef.current = true
            setTimeout(() => {
                navigate('/dashboard')
                setView('list')
                setHideAside(false)
                setShowWelcome(true)
            }, 1000)
        }
    }, [user.loading, user.data?.id, user.data?.tutorial_done])

    // Prepara DOM quando step muda
    useEffect(() => {
        if (!run) return
        const prepare = async () => {
            switch (stepIndex) {
                case 0:
                    setShowTask(initialTask)
                    setView('list')
                    setHideAside(false)
                    break
                case 1:
                    setShowTask(initialTask)
                    setView('list')
                    setHideAside(false)
                    break
                case 2:
                    setShowTask({ open: true, data: {}, type: 'add' })
                    await sleep(600)
                    // força o Joyride a re-posicionar sem remontar
                    window.dispatchEvent(new Event('resize'))
                    break
                case 4:
                    setShowTask(initialTask)
                    setView('list')
                    break
                case 5:
                    setView('calendar')
                    break
                case 6:
                    setView('list')
                    break
                case 9: {
                    setView('list')
                    navigate('/dashboard')
                    try {
                        const { data } = await instance.post('/task', {
                            title: 'Minha primeira tarefa 🎉',
                            priority: 'high',
                            createdat: date,
                            completed: false,
                        })
                        tutorialTaskRef.current = data.id
                        await listTasks(date)
                    } catch (e) {
                        console.error('Tutorial: erro ao criar tarefa exemplo', e)
                    }
                    break
                }
                case 10:
                    setShowTask(initialTask)
                    navigate('/user-settings')
                    break
            }
        }
        prepare()
    }, [stepIndex, run])

    const cleanupTutorialTask = async () => {
        if (tutorialTaskRef.current) {
            try {
                await instance.delete(`/task/${tutorialTaskRef.current}`)
                tutorialTaskRef.current = null
            } catch (e) {
                console.error('Tutorial: erro ao deletar tarefa exemplo', e)
            }
        }
    }

    const markDone = async () => {
        await cleanupTutorialTask()
        navigate('/dashboard')
        try {
            await instance.put('/user/update', { tutorialDone: true })
            listUser()
        } catch (e) {
            console.error('Tutorial: falha ao salvar progresso', e)
        }
    }

    const handleStartTutorial = () => {
        setShowWelcome(false)
        setTimeout(() => {
            setStepIndex(0)
            setRun(true)
        }, 400)
    }

    const handleSkipWelcome = () => {
        setShowWelcome(false)
        markDone()
    }

    const next = () => {
        if (stepIndex >= TOTAL - 1) {
            setRun(false)
            setShowTask(initialTask)
            markDone()
            return
        }
        setStepIndex(i => i + 1)
    }

    const prev = () => {
        if (stepIndex <= 0) return
        setStepIndex(i => i - 1)
    }

    const skip = () => {
        setRun(false)
        setShowTask(initialTask)
        markDone()
    }

    const handleCallback = (data) => {
        const { status } = data
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false)
            setShowTask(initialTask)
            markDone()
        }
    }

    return (
        <TutorialContext.Provider value={{ next, prev, skip, stepIndex, total: TOTAL, run }}>
            <WelcomeModal
                isOpen={showWelcome}
                onStart={handleStartTutorial}
                onSkip={handleSkipWelcome}
            />
            <Joyride
                steps={JOYRIDE_STEPS}
                run={run}
                stepIndex={stepIndex}
                continuous
                showSkipButton={false}
                disableOverlayClose
                disableScrolling={false}
                tooltipComponent={TutorialTooltip}
                callback={handleCallback}
                styles={{
                    options: { zIndex: 10000 },
                    overlay: { backgroundColor: 'rgba(0,0,0,0.55)' },
                }}
            />
            {children}
        </TutorialContext.Provider>
    )
}