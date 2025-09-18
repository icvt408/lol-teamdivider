import Player from "../player";
import { Rank, allLanes, generateAllRanks } from "../types";

const allRanks = generateAllRanks();

/**
 * 指定された確率分布の配列を生成する
 * @param {string} distribution - 確率分布の種類
 * @returns {Array<number>} 確率分布の配列
 */
const getRankProbabilities = (distribution) => {
    const numRanks = allRanks.length;
    let rankProbs = [];

    const arange = (start, stop, step = 1) =>
        Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step);

    if (distribution === "normal") {
        const mean = numRanks / 2;
        const stdDev = numRanks / 6;
        const indices = arange(0, numRanks);

        const probs = indices.map(index => Math.exp(-0.5 * ((index - mean) / stdDev) ** 2));
        const sumProbs = probs.reduce((sum, prob) => sum + prob, 0);
        rankProbs = probs.map(prob => prob / sumProbs);

    } else if (distribution === "uniform") {
        rankProbs = new Array(numRanks).fill(1 / numRanks);

    } else if (distribution === "bimodal") {
        const mean1 = numRanks * 0.1;
        const stdDev1 = numRanks * 0.05;
        const mean2 = numRanks * 0.7;
        const stdDev2 = numRanks * 0.05;
        const indices = arange(0, numRanks);

        const probs1 = indices.map(index => Math.exp(-0.5 * ((index - mean1) / stdDev1) ** 2));
        const probs2 = indices.map(index => Math.exp(-0.5 * ((index - mean2) / stdDev2) ** 2));
        const probs = probs1.map((p1, i) => p1 + probs2[i]);
        const sumProbs = probs.reduce((sum, prob) => sum + prob, 0);
        rankProbs = probs.map(prob => prob / sumProbs);

    }

    return rankProbs;
};

/**
 * 確率分布に沿ったランクを1つ選択する関数
 * @param {Array<number>} rankProbabilities - 確率分布の配列
 * @returns {Rank} 選択されたランクオブジェクト
 */
const getRandomRankByDistribution = (rankProbabilities) => {
    const cumulativeProbs = [];
    let sum = 0;
    for (const prob of rankProbabilities) {
        sum += prob;
        cumulativeProbs.push(sum);
    }

    const randomValue = Math.random();

    for (let i = 0; i < allRanks.length; i++) {
        if (randomValue < cumulativeProbs[i]) {
            return Rank.fromApiData(allRanks[i]);
        }
    }

    return Rank.fromApiData(allRanks[allRanks.length - 1]);
};


/**
 * ダミーのプレイヤーデータを生成する関数
 * @param {string} distribution - 確率分布の種類
 * @returns {Array<Player>} 生成されたプレイヤーデータの配列
 */
export const generateDummyPlayers = (distribution) => {
    const players = []
    const rankProbs = getRankProbabilities(distribution)

    for (let i = 1; i <= 10; i++) {
        const gameName = `Player_${i}`;
        const selectedRank = getRandomRankByDistribution(rankProbs);

        const lanes = [];
        lanes.push(allLanes[Math.floor(Math.random() * allLanes.length)]);
        const otherLane = [...allLanes].filter(lane => !lanes.includes(lane))
        lanes.push(otherLane[Math.floor(Math.random() * allLanes.length)])

        players.push(new Player({ gameName: gameName, tagLine: "dummy", lanes: lanes, rank: selectedRank }));
    };

    console.log(players);

    return players;
}