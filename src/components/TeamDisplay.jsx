import { ranksWithDivisions } from "../types";
/**
 * チーム分け結果を表示するコンポーネント
 * @param {Object} props
 * @param {string} props.teamName - チーム名（例: "チームA"）
 * @param {Array<Object>} props.players - チームのプレイヤーリスト
 */
const TeamDisplay = ({ teamName, players }) => {
    return (
        <div>
            <h3>{teamName}</h3>
            <ul className="flex flex-col gap-2 p-4">
                {players.map(player => (
                    <li key={player.riotId} className="flex justify-between border border-gray-600 rounded-lg p-4">
                        <div>
                            <span className="font-bold">{player.gameName}</span>
                            <span className="text-xs">{player.tagLine}</span>
                        </div>

                        <div style={{ backgroundImage: `url(/src/assets/rank_icons/${player.rank.tier}.svg)` }} className="size-[35px] bg-center bg-no-repeat">
                            {ranksWithDivisions.includes(player.rank.tier) && <span className="align-bottom pl-4 text-xs text-gray-600">{player.rank.division}</span>}
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamDisplay;