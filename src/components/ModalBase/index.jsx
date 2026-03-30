import { useEffect } from "react";
import "./styles.scss"
import { AnimatePresence, motion } from "framer-motion";

export default function ModalBase({ children, onClose, onSubmit, title, isOpen }) {

    useEffect(() => {
        document.documentElement.style.overflow = isOpen ? 'hidden' : '';

        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (

        <AnimatePresence>
            {isOpen && (
                <motion.div className="center bg-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            onClose();
                        }
                    }}

                >
                    <form className="article modal-content"
                        onSubmit={onSubmit}
                    >
                        <header className="modal-header horizontal between ai-center p2">
                            <h1 className='form-title'>{title}</h1>

                            <button className='button secondary'
                                type='button'
                                onClick={onClose}>
                                <svg
                                    className=""
                                    viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="var(--gray-600)"
                                >
                                    <path
                                        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                                        fill="var(--gray-600)"
                                    />
                                </svg>
                            </button>

                        </header>
                        <div className="vertical w100 g2 p2">
                            {children}
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}