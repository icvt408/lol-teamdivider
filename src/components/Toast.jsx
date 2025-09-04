import { useEffect, useState } from "react";

const Toast = ({ message, type = "error", onClose }) => {
    const baseClasses = `
    bg-bg
    fixed right-[30px] text-center
    rounded-lg 
    animate-fadein
    shadow-2xl border-l-3 
    py-4 px-2
        `


    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 5000)

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`${baseClasses} border-${type}`}>
            <div className="flex justify-between gap-4">
                <div>{message}</div>
                <button onClick={onClose}>&times;</button>
            </div>
        </div >
    );
};

export default Toast