import { useTutorial } from '../../providers/tutorialContext'
import './styles.scss'

export default function TutorialTooltip({ index, step, tooltipProps }) {
    const { next, prev, skip, total } = useTutorial()

    return (
        <div className='tutorial-tooltip vertical' {...tooltipProps}>
            <div className='tutorial-header horizontal between ai-center'>
                <span className='tutorial-step'>{index + 1} / {total}</span>
                <button className='tutorial-skip' type='button' onClick={skip}>
                    Pular tutorial
                </button>
            </div>

            {step.title && (
                <h3 className='tutorial-title font-title'>{step.title}</h3>
            )}

            <p className='tutorial-content'>{step.content}</p>

            <div className='tutorial-footer horizontal between ai-center'>
                <div className='tutorial-dots horizontal g1'>
                    {Array.from({ length: total }).map((_, i) => (
                        <span key={i} className={`tutorial-dot ${i === index ? 'active' : ''}`} />
                    ))}
                </div>
                <div className='horizontal g1'>
                    {index > 0 && (
                        <button className='button secondary' type='button' onClick={prev}>
                            Anterior
                        </button>
                    )}
                    <button className='button' type='button' onClick={next}>
                        {index === total - 1 ? 'Concluir' : 'Próximo'}
                    </button>
                </div>
            </div>
        </div>
    )
}