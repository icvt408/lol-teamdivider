import ApiError from "./apiError";

/**
 * RiotAPIへのリクエストを送信する共通関数
 * @param {string} region リクエストを実行するルーティング値
 * @param {string} urlPath APIエンドポイントのURLのパス部分
 * @param {Object} queryParams クエリパラメータのオブジェクト
 * @returns {Promise<Object>} レスポンスのJSONデータ
 */
const fetchRiotApi = async (urlPath, queryParams = {}) => {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `/api/proxy?path=${encodeURIComponent(urlPath)}&${queryString}`;
    const response = await fetch(url);

    // HTTPステータスコードが200番台以外の場合
    if (!response.ok) {
        const errorData = await response.json()
        throw new ApiError(errorData.status.message || 'API request failed', response.status);
    }

    const data = await response.json();
    return data;
}


/**
 * Riot ID（ゲーム名とタグライン）からプレイヤーのアカウント情報を取得する関数
 * @param {string} gameName プレイヤーのゲーム名
 * @param {string} tagLine プレイヤーのタグライン
 * @returns {Promise<Object>} Riotアカウント情報のPromise
 */
export const getAccountByRiotId = async (gameName, tagLine) => {
    const urlPath = `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    const queryParms = { region: "asia" }
    return fetchRiotApi(urlPath, queryParms);
};


/**
 * Puuidからプレイヤーの基本情報を取得する関数
 * @param {string} puuid プレイヤーのPuuid
 * @returns {Promise<Object>} プレイヤーの情報のPromise
 */
export const getLeagueByPuuid = async (puuid) => {
    const urlPath = `/lol/league/v4/entries/by-puuid/${puuid}`;
    const queryParms = { region: "jp1" }
    return fetchRiotApi(urlPath, queryParms);
}


/**
 * PuuidからマッチIDを取得する関数
 * @param {string} puuid プレイヤーのPuuid
 * @param {number} startTime UNIX時間
 * @param {number} endTime UNIX時間
 * @param {number} queue 取得するキューのタイプ
 * @param {string} type 取得するマッチのタイプ
 * @param {number} start 開始インデックス
 * @param {number} count 取得する試合数
 * @returns {Promise<string[]>} matchIdのリスト
 */
export const getMatchIdsByPuuid = async (puuid, startTime = null, endTime = null, queue = null, type = null, start = 0, count = 20) => {
    const urlPath = `/lol/match/v5/matches/by-puuid/${puuid}/ids`;
    const queryParms = {
        region: "asia",
        startTime: startTime,
        endTime: endTime,
        queue: queue,
        type: type,
        start: start,
        count: count,
    };
    return fetchRiotApi(urlPath, queryParms);
}


/**
 * マッチIDから試合情報を取得する関数
 * @param {string} matchId マッチID
 * @returns {Promise<Object>} 試合情報のPromise
 */
export const getMatchByMatchId = async (matchId) => {
    const urlPath = `/lol/match/v5/matches/${matchId}`;
    const queryParms = { region: "asia" }
    return fetchRiotApi(urlPath, queryParms);
}