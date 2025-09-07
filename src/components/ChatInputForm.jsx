import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

const ChatInputForm = ({ onPlayersExtracted, onCompletePlayersInfo }) => {

    const [chatLog, setChatLog] = useState("");

    const extractRiotIds = () => {

        const joinRegex = /(.+?)がロビーに参加しました。/g;
        const leaveRegex = /(.+?)がロビーから退出しました。/g;

        const logLines = chatLog.split("\n");

        const finalPlayers = new Set();

        logLines.forEach(line => {
            const joinMatch = line.match(joinRegex);
            if (joinMatch) {
                finalPlayers.add(joinRegex.exec(joinMatch)[1].trim());
                return
            }

            const leaveMatch = line.match(leaveRegex);
            if (leaveMatch) {
                finalPlayers.delete(leaveRegex.exec(leaveMatch)[1].trim());
            }
        });

        onPlayersExtracted(Array.from(finalPlayers).map(name => name.split(" #")));


    };

    const complateInfo = async () => {
        try {
            await onCompletePlayersInfo()
        } catch (error) {
            const status = error.status;
            let userMessage = "情報の取得中にエラーが発生しました。";

            if (status === 404) {
                userMessage = "データが見つかりませんでした。RiotIDを確認してください。";
            } else if (status === 429) {
                userMessage = "アクセス数が多すぎます。しばらくしてからもう一度お試しください";
            } else if (status === 401) {
                userMessage = "無効なAPIトークンです。管理者にお問い合わせください。";
            } else {
                userMessage = "サーバーエラーが発生しました。時間を置いて再度お試しください。"
            }
            console.error("An error occurred while completing player info:", error);
            toast.error(userMessage);
        }

    };

    return (
        <div className={`flex gap-2 flex-col`}>
            <div className={`flex`}>
                <textarea
                    id="text-area"
                    value={chatLog}
                    onChange={(e) => setChatLog(e.target.value)}
                    placeholder="カスタムのチャットログをここに貼り付けてください。"
                    rows={5}
                    className={`
                        grow 
                        text-xs text-gray-600
                        border border-gray-600
                        resize-none
                        rounded-lg p-4
                        `}
                />
            </div>
            <div>
                <Button
                    content="プレイヤー名を取得"
                    onClick={extractRiotIds}
                />
                <Button content="ランク取得" onClick={complateInfo} />
            </div>


        </div>

    );
};

export default ChatInputForm