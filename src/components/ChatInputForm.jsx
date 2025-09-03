import { useState } from "react";
import Button from "./Button";

const ChatInputForm = ({ onPlayersExtracted }) => {

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



    return (
        <div className={`flex flex-col px-4`}>
            <div className={`flex`}>
                <textarea
                    id="text-area"
                    value={chatLog}
                    onChange={(e) => setChatLog(e.target.value)}
                    placeholder="カスタムのチャットログをここに貼り付けてください。"
                    rows={5}
                    className={`
                        grow 
                        text-xs
                        border border-gray-600
                        resize-none
                        rounded-lg p-3
                        `}
                />
            </div>

            <div className={`flex pt-4`}>
                <Button
                    content="プレイヤー名を取得"
                    onClick={extractRiotIds}
                />
            </div>

        </div>

    );
};

export default ChatInputForm