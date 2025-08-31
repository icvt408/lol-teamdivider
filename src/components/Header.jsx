import "./Header.css";

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-content">
                <h1>LOLカスタム用チーム分けツール(WIP)</h1>
            </div>
            <div className="header-buttons">
                <a href="https://github.com/icvt408/lol-teamdivider" target="_blank" rel="noopener noreferrer">
                    <button className="header-button">github</button>
                </a>
            </div>
        </header>
    )
}

export default Header