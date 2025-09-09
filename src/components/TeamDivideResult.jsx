import TeamDisplay from "./TeamDisplay";

const TeamDivideResult = ({ teams }) => {

    return (
        <div className="flex justify-around">
            <TeamDisplay teamName="チームA" players={teams.teamA} />
            <TeamDisplay teamName="チームB" players={teams.teamB} />
        </div>
    );

}

export default TeamDivideResult;