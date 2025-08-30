import Player from "../player";
import { Rank } from "../types";

const ranksWithDivisions = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond"];
const ranksWithoutDivisions = ["Master", "GrandMaster", "Challenger"];
const divisions = ["IV", "III", "II", "I"];

/**
 * すべてのランクティアとディビジョンのリストを生成する
 * @returns {Array<string>} 全ランクのリスト（例: ["IRON IV", "IRON III", ..., "CHALLENGER"]）
 */
export const generateAllRanks = () => {
    let allRanks = [];

    ranksWithDivisions.forEach(tier => {
        divisions.forEach(division => {
            allRanks.push({ tier: tier, rank: division });
        });
    });

    ranksWithoutDivisions.forEach(tier => {
        allRanks.push({ tier: tier, rank: "I" });
    });

    return allRanks;
}


const allRanks = generateAllRanks();


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


export const generateDummyPlayers = (distribution) => {
    const players = []
    const rankProbs = getRankProbabilities(distribution)

    for (let i = 1; i <= 10; i++) {
        const gameName = `Player_${i}`;
        const selectedRank = getRandomRankByDistribution(rankProbs);

        players.push(new Player({ gameName: gameName, tagLine: "dummy", rank: selectedRank }));
    };

    return players;
}