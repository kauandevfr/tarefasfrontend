import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { Joyride, ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { useNavigate } from 'react-router-dom'
import { useSetView } from './useViewStore'
import { useTask } from './taskContext'
import { useUser } from './userContext'
import { useGlobal } from './globalContext'
import instance from '../services/instance'
import TutorialTooltip from '../components/TutorialTooltip'

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
        placement: 'left',
        disableBeacon: true,
    },
    {
        target: '.modal-content',
        title: 'Editando uma tarefa',
        content: 'O mesmo formulário aparece ao editar. Você pode alterar qualquer campo, marcar como concluída ou apenas ajustar a data.',
        placement: 'left',
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

export function TutorialProvider({ children }) {
    const navigate = useNavigate()
    const setView = useSetView()
    const { setShowTask, initialTask } = useTask()
    const { user, listUser } = useUser()
    const { setHideAside } = useGlobal()

    const [run, setRun] = useState(false)
    const [stepIndex, setStepIndex] = useState(0)
    const preparedRef = useRef(false)

    // Inicia quando user carrega e tutorial não foi feito
    useEffect(() => {
        if (!user.loading && user.data?.id && !user.data?.tutorial_done && !preparedRef.current) {
            preparedRef.current = true
            setTimeout(async () => {
                navigate('/dashboard')
                setView('list')
                setHideAside(false)
                await sleep(600)
                setRun(true)
            }, 800)
        }
    }, [user.loading, user.data?.id, user.data?.tutorial_done])

    const markDone = async () => {
        try {
            await instance.put('/user/update', { tutorialDone: true })
            listUser()
        } catch (e) {
            console.error('Tutorial: falha ao salvar progresso', e)
        }
    }

    // Preparation para cada step (índice = qual step vai APARECER)
    const prepareStep = async (nextIndex) => {
        switch (nextIndex) {
            case 0:
                navigate('/dashboard')
                setView('list')
                setHideAside(false)
                await sleep(400)
                break
            case 1:
                setShowTask(initialTask)
                setView('list')
                setHideAside(false)
                await sleep(400)
                break
            case 2:
                // Abrir modal de adicionar
                setShowTask({ open: true, data: {}, type: 'add' })
                await sleep(400)
                break
            case 3:
                // Trocar para modal de editar (mesma UI, contexto diferente)
                // Mantém modal aberto, só muda o título no step
                break
            case 4:
                // Fechar modal, mostrar botão calendário
                setShowTask(initialTask)
                await sleep(300)
                break
            case 5:
                // Abrir calendário
                setView('calendar')
                await sleep(400)
                break
            case 6:
                // Voltar para lista
                setView('list')
                await sleep(400)
                break
            case 7:
                // Search - garantir list view
                setView('list')
                await sleep(200)
                break
            case 8:
                // Progress - list view
                break
            case 9:
                // Task row - list view (elemento pode não existir)
                break
            case 10:
                // Navegar para user settings
                setShowTask(initialTask)
                navigate('/user-settings')
                await sleep(600)
                break
            case 11:
                // Preferences - já está na page de user
                break
            default:
                break
        }
    }

    const handleCallback = async (data) => {
        const { action, index, status, type } = data

        if (type === EVENTS.STEP_AFTER) {
            if (action === ACTIONS.SKIP || action === ACTIONS.CLOSE) return

            const nextIndex = index + 1

            if (nextIndex >= JOYRIDE_STEPS.length) return

            setRun(false)
            await prepareStep(nextIndex)
            await sleep(500)
            const nextStep = JOYRIDE_STEPS[nextIndex]
            const el = document.querySelector(nextStep.target)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            await sleep(200)
            setStepIndex(nextIndex)
            setRun(true)
        }

        if (type === EVENTS.TARGET_NOT_FOUND) {
            const nextIndex = index + 1
            if (nextIndex >= JOYRIDE_STEPS.length) {
                setRun(false)
                markDone()
                return
            }
            setRun(false)
            await prepareStep(nextIndex)
            await sleep(500)
            setStepIndex(nextIndex)
            setRun(true)
        }

        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false)
            setShowTask(initialTask)
            markDone()
        }
    }

    return (
        <TutorialContext.Provider value={{}}>
            <Joyride
                steps={JOYRIDE_STEPS}
                run={run}
                stepIndex={stepIndex}
                continuous
                showSkipButton
                disableOverlayClose
                disableScrolling={false}
                tooltipComponent={TutorialTooltip}
                callback={handleCallback}
                styles={{
                    options: {
                        zIndex: 10000,
                        arrowColor: '#171717',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.55)',
                    },
                    spotlight: {
                        borderRadius: '8px',
                    },
                }}
            />
            {children}
        </TutorialContext.Provider>
    )
}