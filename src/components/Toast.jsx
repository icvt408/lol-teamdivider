import { useEffect, useState } from "react";
import "./Toast.css";

const Toast = ({ message, type = "error", onClose }) => {
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
        <div className={`toast toast-${type}`}>
            <div className="toast-message">{message}</div>
            <button className="toast-close-btn" onClick={onClose}>&times;</button>
        </div>
    );
};

export default Toast