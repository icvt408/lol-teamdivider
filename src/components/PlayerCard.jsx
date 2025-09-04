import { laneIcons, tierIcons } from "../types";
import Button from "./Button";

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
        <div className={`shadow-md p-4 rounded-lg`}>
            <div className="flex justify-between items-baseline px-2 pb-2">
                <div>
                    <span className="font-bold">{player.gameName}</span>
                    <span className="text-xs text-gray-600">#{player.tagLine}</span>
                </div>
                <div>
                    <Button
                        content={<img src={tierIcons[player.rank.tier]} alt={player.rank} />}
                        onClick={() => onOpenRankModal(player.riotId)}
                        color="bg-transparent" />
                </div>

            </div>
            <div className="flex justify-between">
                {lanes.map((lane) => (
                    <Button
                        key={lane}
                        content={<img src={laneIcons[lane]} alt={lane} className="size-[25px]" />}
                        onClick={() => handleLaneButtonClick(lane)}
                        color="bg-transparent"
                        isActive={false}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlayerCard;