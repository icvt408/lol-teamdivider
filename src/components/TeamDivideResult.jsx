import TeamDisplay from "./TeamDisplay";



const TeamDivideResult = ({ teams, teamCount = 2, playerCount = 5 }) => {

    const dummy = () => {
        let teamIndex = []
        let playerFrame = []

        for (let j = 0; j < playerCount; j++) {
            playerFrame.push(
                <div className="shadow inset-shadow-sm rounded-lg p-4 w-2xs"><div className="size-[35px]"></div></div>
            );
        }

        for (let i = 0; i < teamCount; i++) {
            teamIndex.push(
                <div className="flex flex-col gap-2">
                    {playerFrame}
                </div>
            );
        }
        return teamIndex
    }
    return (
        <div className="grow flex justify-evenly ">
            {teams.length > 0 ? teams.map((team, i) => <TeamDisplay key={`team-${i + 1}`} teamName={`チーム${i + 1}`} players={team} />) : ""}
        </div>
    );
}

export default TeamDivideResult;