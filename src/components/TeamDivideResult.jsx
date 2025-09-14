import TeamDisplay from "./TeamDisplay";



const TeamDivideResult = ({ teams }) => {
    return (
        <div className="grow flex justify-evenly ">
            {teams.length > 0 ? teams.map((team, i) => <TeamDisplay key={`team-${i}`} players={team} />) : ""}
        </div>
    );
}

export default TeamDivideResult;