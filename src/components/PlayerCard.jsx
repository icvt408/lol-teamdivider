import { laneIcons, ranksWithDivisions } from "../types";

const PlayerCard = ({ player, onLaneChange, onOpenRankModal }) => {
    const lanes = ["Top", "Jungle", "Mid", "Adc", "Support"];

    const handleLaneButtonClick = (lane) => {
        const { main, sub } = player.lanes;

        let newMain = main;
        let newSub = sub;
        if (main.includes(lane)) {
            newMain = main.filter(l => l != lane);
        } else {
            newMain = [...main, lane];
        }

        onLaneChange(player.name, { main: newMain, sub: newSub });
    }

    return (
        <div className={`shadow-md p-4 rounded-lg border border-gray-600 w-2xs`}>
            <div className="flex justify-between items-baseline px-2">
                <div>
                    <span className="font-bold">{player.gameName}</span>
                    <span className="text-xs text-gray-600">#{player.tagLine}</span>
                </div>
                <button style={{ backgroundImage: `url(/src/assets/rank_icons/${player.rank.tier}.svg)` }} className="size-[35px] bg-center bg-no-repeat hover:bg-gray-400 rounded-lg"
                    onClick={() => onOpenRankModal(player.riotId)}>
                    {ranksWithDivisions.includes(player.rank.tier) && <span className="align-bottom pl-4 text-xs text-gray-600">{player.rank.division}</span>}
                </button>
                {/* <Button
                        content={<img src={tierIcons[player.rank.tier]} alt={player.rank} />}
                        onClick={() => onOpenRankModal(player.riotId)}
                        color="bg-transparent" /> */}

            </div>
            <div className="flex justify-between">
                {lanes.map((lane) => (
                    <button className="p-2" key={lane}>
                        <img src={laneIcons[lane]} alt={lane} className="size-[25px] opacity-40 hover:opacity-90" />
                    </button>
                ))}
            </div>
        </div >
    );
};

export default PlayerCard;