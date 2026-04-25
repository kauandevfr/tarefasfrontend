import './styles.scss'

export default function TutorialTooltip({
    continuous,
    index,
    step,
    backProps,
    closeProps,
    primaryProps,
    skipProps,
    tooltipProps,
    size,
}) {
    return (
        <div className='tutorial-tooltip vertical' {...tooltipProps}>
            <div className='tutorial-header horizontal between ai-center'>
                <span className='tutorial-step'>
                    {index + 1} / {size}
                </span>
                <button className='tutorial-skip' {...skipProps}>
                    Pular tutorial
                </button>
            </div>

            {step.title && (
                <h3 className='tutorial-title font-title'>{step.title}</h3>
            )}

            <p className='tutorial-content'>{step.content}</p>

            <div className='tutorial-footer horizontal between ai-center'>
                <div className='tutorial-dots horizontal g1'>
                    {Array.from({ length: size }).map((_, i) => (
                        <span
                            key={i}
                            className={`tutorial-dot ${i === index ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <div className='horizontal g1'>
                    {index > 0 && (
                        <button className='button secondary' {...backProps}>
                            Anterior
                        </button>
                    )}
                    {continuous ? (
                        <button className='button' {...primaryProps}>
                            {index === size - 1 ? 'Concluir' : 'Próximo'}
                        </button>
                    ) : (
                        <button className='button' {...closeProps}>
                            Fechar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}