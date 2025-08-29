const ranksWithDivisions = ["IRON", "BRONZE", "SILVER", "GOLD", "PLATINUM", "EMERALD", "DIAMOND"];
const ranksWithoutDivisions = ["MASTER", "GRANDMASTER", "CHALLENGER"];
const divisions = ["IV", "III", "II", "I"];

/**
 * すべてのランクティアとディビジョンのリストを生成する
 * @returns {Array<string>} 全ランクのリスト（例: ["IRON IV", "IRON III", ..., "CHALLENGER"]）
 */
export const generateAllRanks = () => {
    let allRanks = [];

    // ディビジョンがあるランクを生成
    ranksWithDivisions.forEach(tier => {
        divisions.forEach(division => {
            allRanks.push(`${tier} ${division}`);
        });
    });

    // ディビジョンがないランクを追加
    ranksWithoutDivisions.forEach(tier => {
        allRanks.push(tier);
    });

    return allRanks;
}

const getRankProbabilities = (allRanks, distribution) => {
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
}
