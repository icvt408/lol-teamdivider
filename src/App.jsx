import { useState } from 'react'
import './App.css'
import ChatInputForm from './components/ChatInputForm'
import Footer from './components/Footer'
import Header from './components/Header'
import PlayerCard from "./components/PlayerCard"
import RankModal from './components/RankModal'
import Toast from './components/Toast'
import Player from './player'
import { Rank } from './types'


function App() {

  const [players, setPlayers] = useState([])
  const [modalPlayerName, setModalPlayerName] = useState(null);
  const [toastMessage, setToastMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
  }

  const hideToast = () => {
    setToastMessage(null);
  }


  const handlePlayersExtracted = (extractRiotIds) => {
    const newPlayers = extractRiotIds.map(name =>
      new Player({
        gameName: name[0],
        tagLine: name[1],
      }))

    setPlayers(newPlayers)
  };

  //レーン設定ボタン
  const handleLaneChange = (playerName, newLanes) => {
    setPlayers(
      players.map(player =>
        player.name === playerName ? { ...player, lanes: newLanes } : player
      )
    )
  }

  //ランク設定モーダル
  const handleOpenRankModal = (playerName) => {
    setModalPlayerName(playerName)
  }

  const handleCloseRankModal = () => {
    setModalPlayerName(null);
  }

  const handleSaveRank = (playerName, newRankData) => {
    setPlayers(
      players.map(player => {
        if (player.riotId === playerName) {
          const newRank = new Rank(newRankData.tier, newRankData.division);

          return new Player({
            gameName: player.gameName,
            tagLine: player.tagLine,
            lane: player.lane,
            rank: newRank,
            puuid: player.puuid
          });
        }
        return Player;
      })
    );

    handleCloseRankModal()
  };

  const handleCompletePlayersInfo = async () => {
    setIsLoading(true);
    const updatePromises = players.map(async (player) => await player.completeInfo())

    try {
      const updatePlayers = await Promise.all(updatePromises);
      setPlayers(updatePlayers)
    } catch (error) {
      const status = error.status;
      let userMessage = "情報の取得中にエラーが発生しました。";

      if (status === 404) {
        userMessage = "プレイヤーが見つかりませんでした。RiotIDを確認してください。";
      } else if (status === 429) {
        userMessage = "アクセス数が多すぎます。しばらくしてからもう一度お試しください";
      } else if (status === 401) {
        userMessage = "無効なAPIトークンです。管理者にお問い合わせください。";
      } else {
        userMessage = "サーバーエラーが発生しました。時間を置いて再度お試しください。"
      }
      console.error("An error occurred while completing player info:", error);
      showToast(userMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const playerInModal = players.find(p => p.riotId === modalPlayerName);


  return (
    <>
      <Header />
      <main>
        <ChatInputForm onPlayersExtracted={handlePlayersExtracted} />

        <div className="player-card-list">
          {players.length > 0 && (
            players.map(player => (
              <PlayerCard
                key={player.riotId}
                player={player}
                onLaneChange={handleLaneChange}
                onOpenRankModal={handleOpenRankModal}
              />
            ))
          )}

          <button onClick={handleCompletePlayersInfo} disabled={isLoading}>APIで情報を補完</button>
        </div>

        {playerInModal && (
          <RankModal
            player={playerInModal}
            onClose={handleCloseRankModal}
            onSave={(handleSaveRank)} />
        )}

        {toastMessage && (
          <Toast message={toastMessage} onClose={hideToast} />
        )}

      </main >
      <Footer />
    </>
  )
}

export default App
