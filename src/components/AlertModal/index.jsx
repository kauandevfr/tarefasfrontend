import { useEffect, useState } from "react"
import { useGlobal } from "../../providers/globalContext"
import "./styles.scss"
import { AnimatePresence, motion } from "framer-motion"

export default function AlertModal() {

    const { alertInfos, setAlertInfos, initialAlertInfos } = useGlobal()

    const [progress, setProgress] = useState(100)

    const tag = alertInfos.type

    const closeModal = () => {
        setAlertInfos(initialAlertInfos)
    }

    useEffect(() => {
        if (alertInfos.open) {
            setProgress(100);
            let start = Date.now();
            let duration = 4500;
            let elapsed = 0;
            let interval, timeout;
            const startTimers = (remaining) => {
                start = Date.now();
                interval = setInterval(() => {
                    const nowElapsed = Date.now() - start + elapsed;
                    const percentage = Math.max(100 - (nowElapsed / duration) * 100, 0);
                    setProgress(percentage);
                }, 50);

                timeout = setTimeout(() => {
                    closeModal();
                }, remaining);
            };
            startTimers(duration);
            const handleMouseEnter = () => {
                elapsed += Date.now() - start;
                clearInterval(interval);
                clearTimeout(timeout);
            };
            const handleMouseLeave = () => {
                const remaining = duration - elapsed;
                startTimers(remaining);
            };
            const modalElement = document.querySelector('.alert');
            modalElement.addEventListener('mouseenter', handleMouseEnter);
            modalElement.addEventListener('mouseleave', handleMouseLeave);
            return () => {
                clearTimeout(timeout);
                clearInterval(interval);
                modalElement.removeEventListener('mouseenter', handleMouseEnter);
                modalElement.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [alertInfos.open, alertInfos.id]);


    useEffect(() => {
        closeModal()
    }, [window.location.pathname])

    const configs = {
        error: {
            color: "rgb(var(--red-1200))",
            icon: <svg
                viewBox="-3.5 0 19 19"
                fill="currentColor"
                className="icon"
            >
                <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" />
            </svg>
        },

        success: {
            color: "rgb(var(--green-1200))",
            icon:
                <svg viewBox="0 0 20 20" fill="none">
                    <path
                        d="M17 5L8 15l-5-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
        }
    }

    return (
        <AnimatePresence>
            {alertInfos.open &&

                <motion.div className="alert success horizontal g2 ai-start pointer"
                    style={{ background: configs[tag].color }}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    onClick={closeModal}
                >
                    {configs[tag].icon}
                    <span>{alertInfos.message}</span>
                    <div className="alert-progress"
                        style={{ width: `${progress}%` }}
                    />
                </motion.div>
            }
        </AnimatePresence>
    )
}