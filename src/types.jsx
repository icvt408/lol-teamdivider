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

class Rank {
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

    toString() {
        return `${this.tier}_${this.division}`
    }
}

class Player {
    constructor({ gameName, tagLine, lane = null, rank = new Rank("Unranked", null), puuid = null }) {
        if (!gameName || !tagLine) {
            throw new Error('Player must have a gameName and tagLine.');
        }

        this.gameName = gameName;
        this.tagLine = tagLine;
        this.lane = lane;
        this.rank = rank;
        this.puuid = puuid;
    }

    get riotId() {
        return `${this.gameName}#${this.tagLime}`
    }

    toString() {
        return `Player(riotId=${this.riotId}, rank=${this.rank.toString()})`;
    }

}