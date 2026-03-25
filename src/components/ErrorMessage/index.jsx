// components/ErrorMessage.jsx
import { AnimatePresence, motion } from "framer-motion"

export default function ErrorMessage({ message }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.span
                    className="span error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {message}
                </motion.span>
            )}
        </AnimatePresence>
    )
}