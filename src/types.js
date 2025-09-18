import adcIcon from "./assets/lane_icons/Bot.svg"
import jungleIcon from "./assets/lane_icons/Jungle.svg"
import midIcon from "./assets/lane_icons/Mid.svg"
import supportIcon from "./assets/lane_icons/Support.svg"
import topIcon from "./assets/lane_icons/Top.svg"

import bronzeIcon from "./assets/rank_icons/Bronze.svg"
import challengerIcon from "./assets/rank_icons/Challenger.svg"
import diamondIcon from "./assets/rank_icons/Diamond.svg"
import emeraldIcon from "./assets/rank_icons/Emerald.svg"
import goldIcon from "./assets/rank_icons/Gold.svg"
import grandMasterIcon from "./assets/rank_icons/GrandMaster.svg"
import ironIcon from "./assets/rank_icons/Iron.svg"
import masterIcon from "./assets/rank_icons/Master.svg"
import platinumIcon from "./assets/rank_icons/Platinum.svg"
import silverIcon from "./assets/rank_icons/Silver.svg"
import unrankedIcon from "./assets/rank_icons/Unranked.svg"
import { getLeagueByPuuid } from "./utils/riotApi"

export const ranksWithDivisions = ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond"];
export const ranksWithoutDivisions = ["Master", "GrandMaster", "Challenger"];
export const divisions = ["IV", "III", "II", "I"];
export const allLanes = ["Top", "Jungle", "Mid", "Adc", "Support"];

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


export const laneIcons = {
    Top: topIcon,
    Jungle: jungleIcon,
    Mid: midIcon,
    Adc: adcIcon,
    Support: supportIcon
};

export const tierIcons = {
    Challenger: challengerIcon,
    GrandMaster: grandMasterIcon,
    Master: masterIcon,
    Diamond: diamondIcon,
    Emerald: emeraldIcon,
    Platinum: platinumIcon,
    Gold: goldIcon,
    Silver: silverIcon,
    Bronze: bronzeIcon,
    Iron: ironIcon,
    Unranked: unrankedIcon
}

export class Rank {
    constructor(tier, division) {
        this.tier = tier
        this.division = division
    }

    static fromApiData(apiData) {
        if (!apiData) {
            return new Rank("Unranked", "I");
        }
        return new Rank(apiData.tier, apiData.rank);
    }

    async complateRankData(puuid, queueType) {
        if (this.tier === "Unranked") {
            const leagueData = await getLeagueByPuuid(puuid);
            const rankData = leagueData.find(d => d.queueType === queueType);
            return this.fromApiData(rankData);
        } else {
            return this;
        }

    }

    toString() {
        return `${this.tier}_${this.division}`
    }
}


