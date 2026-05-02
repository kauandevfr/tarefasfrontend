import { AnimatePresence, motion } from 'framer-motion'
import '../WelcomeModal/styles.scss'

export default function TutorialDoneModal({ isOpen, onClose }) {
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
                                Tutorial <span className='text-yellow-800'>completo.</span>
                            </h1>
                            <p className='subtitle'>
                                Você já conhece tudo que o tarefas. tem a oferecer. Agora é só organizar sua rotina.
                            </p>
                        </div>

                        <button className='button w100 jc-center' type='button' onClick={onClose}>
                            Começar a usar
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}