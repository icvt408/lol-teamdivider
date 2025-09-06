import githubLogo from "../assets/github-mark.svg"
import Button from "./Button"
const Header = () => {
    return (
        <header className={`flex justify-between items-center w-full`}>
            <div className={`text-xl`}>
                <h1>LOLカスタム用チーム分けツール(WIP)</h1>
            </div>
            <div>
                <Button
                    content={<img src={githubLogo} alt="GitHub" className="size-[25px]" />}
                    href="https://github.com/icvt408/lol-teamdivider"
                    color="bg-transparent"
                />
            </div>

        </header>
    )
}

export default Header