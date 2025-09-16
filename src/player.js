import { Rank } from "./types";
import { getAccountByRiotId } from "./utils/riotApi";

/**
 * プレイヤーデータを格納するクラス
 */
class Player {
    constructor({ gameName, tagLine, lanes = [], rank = new Rank("Unranked", "I"), puuid = null, isApiFetched = false }) {
        if (!gameName || !tagLine) {
            throw new Error('Player must have a gameName and tagLine.');
        }

        this.gameName = gameName;
        this.tagLine = tagLine;
        this.lanes = lanes;
        this.rank = rank;
        this.puuid = puuid;
        this.isApiFetched = isApiFetched;
    }

    get riotId() {
        return `${this.gameName}#${this.tagLine}`
    }

    /**
 * Riot APIから不足している情報を補完するメソッド
 */
    async completeInfo() {
        // if (this.isApiFetched) {
        //     return this;
        // }

        const accountData = await getAccountByRiotId(this.gameName, this.tagLine);
        const puuid = accountData.puuid;

        const rankData = await this.rank.complateRankData(puuid, "RANKED_SOLO_5x5")

        return new Player({
            gameName: this.gameName,
            tagLine: this.tagLine,
            lanes: this.lanes,
            puuid: puuid,
            rank: rankData,
            isApiFetched: true,
        });
    }

    toString() {
        return `Player(riotId=${this.riotId}, rank=${this.rank.toString()})`;
    }

}

export default Player;