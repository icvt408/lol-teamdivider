import Player from "../player";
import calculateImbalanceScore, { calculatePlayerWeight } from "./imbalanceScore";


/**
 * 貪欲法を用いてチーム分けを行う関数
 * @param {Array<Player>} players - プレイヤーオブジェクトの配列
 * @returns チーム分け結果
 */
export const divideTeamsGreedy = (players) => {
    const sortedPlayer = [...players].sort((a, b) =>
        calculatePlayerWeight(b) - calculatePlayerWeight(a)
    );

    const teamA = [];
    const teamB = [];

    sortedPlayer.forEach((player, index) => {
        if (index % 2 === 0) {
            teamA.push(player);
        } else {
            teamB.push(player);
        }
    });

    return [teamA, teamB];
};

/**
 * 分けられたチームを調整する関数
 * プレイヤーを入れ替えてバランス整える
 * @param {Array<Player>} teamA チームAのプレイヤー
 * @param {Array<Player>} teamB チームBのプレイヤー
 * @param {number} maxIterations 最大試行回数
 * @returns 調整されたチーム
 */
export const adjustTeams = (teamA, teamB, maxIterations = 100) => {
    let currentTeamA = [...teamA];
    let currentTeamB = [...teamB];
    let currentScore = calculateImbalanceScore(currentTeamA, currentTeamB);

    for (let i = 0; i < maxIterations; i++) {
        let bestSwap = null;
        let bestScore = currentScore;

        for (let j = 0; j < currentTeamA.length; j++) {
            for (let k = 0; k < currentTeamB.length; k++) {
                const playerA = currentTeamA[j];
                const playerB = currentTeamB[k];

                const tempTeamA = [...currentTeamA];
                tempTeamA[j] = playerB;
                const tempTeamB = [...currentTeamB];
                tempTeamB[k] = playerA;

                const newScore = calculateImbalanceScore(tempTeamA, tempTeamB);

                if (newScore < bestScore) {
                    bestScore = newScore;
                    bestSwap = { indexA: j, indexB: k };
                }
            }
        }

        if (bestSwap === null) {
            break;
        }

        const playerA = currentTeamA[bestSwap.indexA];
        const playerB = currentTeamB[bestSwap.indexB];

        currentTeamA[bestSwap.indexA] = playerB;
        currentTeamB[bestSwap.indexB] = playerA;
        currentScore = bestScore;
    }

    return [currentTeamA, currentTeamB];
};