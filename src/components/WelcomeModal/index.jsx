import { AnimatePresence, motion } from 'framer-motion'
import './styles.scss'

export default function WelcomeModal({ isOpen, onStart, onSkip }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className='center bg-modal'
                    style={{ zIndex: 10001 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                    <motion.div
                        className='welcome-modal vertical'
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{ duration: 0.35, ease: 'easeInOut', delay: 0.1 }}
                    >
                        <div className='welcome-icon'>✦</div>

                        <div className='vertical g1'>
                            <h1 className='welcome-title font-title'>
                                Bem-vindo(a) ao <span className='text-yellow-800'>tarefas.</span>
                            </h1>
                            <p className='subtitle'>
                                Quer fazer um tour rápido pelo app antes de começar?
                            </p>
                        </div>

                        <div className='vertical g2 w100'>
                            <button className='button w100 jc-center' type='button' onClick={onStart}>
                                Ir para o tutorial
                            </button>
                            <button className='button secondary w100 jc-center' type='button' onClick={onSkip}>
                                Pular tutorial
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}