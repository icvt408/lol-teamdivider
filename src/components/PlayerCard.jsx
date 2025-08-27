import { laneIcons, tierIcons } from "../types";

import "./PlayerCard.css";

const PlayerCard = ({ player, onLaneChange, onOpenRankModal }) => {
    // playerオブジェクトの構造:
    // { name: プレイヤー名, lanes: {main: メインレーン, sub: [サブレーン]}, rank: ランク }
    const lanes = ["Top", "Jungle", "Mid", "Adc", "Support"];
    const divisionVisibleTiers = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond"]

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
        <div className="player-card">
            <div className="player-info">
                <span className="player-name">{player.gameName}</span>
                <span className="player-tagline">#{player.tagLine}</span>
                <button className={`rank-button ${player.rank.tier}`} onClick={() => onOpenRankModal(player.riotId)}>
                    <img src={tierIcons[player.rank.tier]} alt={player.rank} />
                    {divisionVisibleTiers.includes(player.rank.tier) && <span className="division">{player.rank.division}</span>}
                </button>
            </div>
            <div className="lane-selection">
                {lanes.map((lane) => (
                    <button
                        key={lane}
                        className={`lane-button 
                        ${player.lanes === lane ? 'main-selected' : ''}`}
                        onClick={() => handleLaneButtonClick(lane)}
                    >
                        <img src={laneIcons[lane]} alt={lane} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PlayerCard;