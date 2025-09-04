
const Button = ({ content, onClick, href, color = "bg-primary", textColor = "text-white", isActive = true, disabled = false }) => {
    const isLink = !!href;

    const paddingClass = typeof content === 'string' ? 'py-3 px-6' : 'p-2';

    const activeClass = isActive ? "opacity-100" : "opacity-40";

    const baseClasses = `
    ${paddingClass} rounded-lg font-medium transition duration-200
    hover:bg-secondary active:bg-tertiary ${activeClass}
    `;

    const buttonContent = typeof content === "string" ? (
        <span className="flex items-center space-x-2">
            {content}
        </span>
    ) : (
        content
    );

    if (isLink) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClasses} ${color} ${textColor} no-undeline flex item-center justify-ceonter`}
            >
                {buttonContent}
            </a>
        )
    }

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${color} ${textColor}`}
            disabled={disabled}
        >
            {buttonContent}
        </button>
    );
};

export default Button