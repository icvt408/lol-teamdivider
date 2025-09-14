import { ranksWithDivisions } from "../types";
/**
 * チーム分け結果を表示するコンポーネント
 * @param {Object} props
 * @param {string} props.teamName - チーム名（例: "チームA"）
 * @param {Array<Object>} props.players - チームのプレイヤーリスト
 */
const TeamDisplay = ({ players }) => {

    const lanes = ["Top", "Jungle", "Mid", "Adc", "Support"];

    return (
        <div>
            <div className="flex flex-col gap-2 p-4" >
                {players.map(player =>
                    <div key={player.riotId} className="shadow-md p-4 rounded-lg border border-gray-600 w-2xs">
                        <div className="flex justify-between items-center px2">
                            <div>
                                <span className="font-bold">{player.gameName}</span>
                                <span className="text-xs text-gray-600">#{player.tagLine}</span>
                            </div>
                            <div
                                style={{ backgroundImage: `url(/src/assets/rank_icons/${player.rank.tier}.svg)` }}
                                className="size-[35px] bg-center bg-no-repeat rounded-lg">
                                {ranksWithDivisions.includes(player.rank.tier) && <span className="text-xs text-gray-600 flex justify-end items-end size-full p-1">{player.rank.division}</span>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamDisplay;