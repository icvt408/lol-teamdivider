import { ranksWithDivisions, tierIcons } from "../types";
import './TeamDisplay.css';
/**
 * チーム分け結果を表示するコンポーネント
 * @param {Object} props
 * @param {string} props.teamName - チーム名（例: "チームA"）
 * @param {Array<Object>} props.players - チームのプレイヤーリスト
 */
const TeamDisplay = ({ teamName, players }) => {
    return (
        <div className="team-box">
            <h3 className="team-name">{teamName}</h3>
            <ul className="team-player-list">
                {players.map(player => (
                    <li key={player.riotId} className="team-player-item">
                        <span className="player-id">{player.riotId}</span>
                        <div className="rank-display">
                            <img src={tierIcons[player.rank.tier]} alt="" />
                            {ranksWithDivisions.includes(player.rank.tier) && <span className="division">{player.rank.division}</span>}
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamDisplay;