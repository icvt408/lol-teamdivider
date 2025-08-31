import rankWeights from "../../config/weight.json";
import Player from "../player";


/**
 * プレイヤーの重みを計算する関数
 * @param {Player} player - プレイヤーオブジェクト
 * @returns {number} プレイヤーの重み
 */
export const calculatePlayerWeight = (player) => {
    return rankWeights.default[player.rank.toString()]
};


/**
 * チームの合計重みを計算する関数
 * @param {Array<Player>} team - プレイヤーオブジェクトの配列
 * @returns {number} チームの合計重み
 */
const calculateTeamWeight = (team) => {
    if (!team || team.length === 0) {
        return 0;
    }

    const totalWeight = team.reduce((sum, player) => {
        return sum + calculatePlayerWeight(player);
    }, 0);

    return totalWeight;
};


/**
 * 
 * @param {Array<Player>} teamA - チームAのプレイヤー
 * @param {Array<Player>} teamB - チームBのプレイヤー
 * @returns {number} チームの重みの差の絶対値
 */
const calculateImbalanceScore = (teamA, teamB) => {
    const totalWeightA = calculateTeamWeight(teamA);
    const totalWeightB = calculateTeamWeight(teamB);

    return Math.abs(totalWeightA - totalWeightB);
};

export default calculateImbalanceScore;