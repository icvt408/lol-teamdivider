import { Rank } from "./types";

/**
 * プレイヤーデータを格納するクラス
 */
class Player {
    constructor({ gameName, tagLine, lanes = null, rank = new Rank("Unranked", "I"), puuid = null }) {
        if (!gameName || !tagLine) {
            throw new Error('Player must have a gameName and tagLine.');
        }

        this.gameName = gameName;
        this.tagLine = tagLine;
        this.lanes = lanes;
        this.rank = rank;
        this.puuid = puuid;
    }

    get riotId() {
        return `${this.gameName}#${this.tagLine}`
    }

    toString() {
        return `Player(riotId=${this.riotId}, rank=${this.rank.toString()})`;
    }

}

export default Player;