// eslint-disable-next-line no-undef
const API_KEY = process.env.RIOT_API_KEY;


export default async function handler(req, res) {
    // GETリクエスト以外は拒否
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { path, ...queryParams } = req.query;

    if (!path) {
        return res.status(400).json({ message: "Bad request" });
    }

    const region = queryParams.region || 'jp1';
    delete queryParams.region;

    const queryString = new URLSearchParams(queryParams).toString();

    const riotApiUrl = `https://${region}.api.riotgames.com${path}${queryString ? `?${queryString}` : ''}`;

    try {
        const apiResponse = await fetch(riotApiUrl, {
            headers: {
                'X-Riot-Token': API_KEY,
            },
        });

        //取得したデータをそのままクライアントに返す
        const data = await apiResponse.json();
        return res.status(apiResponse.status).json(data);

    } catch (error) {
        // ネットワークエラーなどをキャッチ
        console.log('Proxy request failed:', error);
        return res.status(500).json({ status: { message: 'Internal Server Error', status_code: 500 } });
    }
}