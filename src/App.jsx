import { useState } from 'react'
import './App.css'
import ChatInputForm from './components/ChatInputForm'
import Footer from './components/Footer'
import Header from './components/Header'
import PlayerCard from "./components/PlayerCard"
import RankModal from './components/RankModal'
import Toast from './components/Toast'
import { getAccountByRiotId, getLeagueByPuuid } from './utils/riotApi'

function App() {

  const [players, setPlayers] = useState([])
  const [modalPlayerName, setModalPlayerName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (message) => {
    setToastMessage(message);
  }

  const hideToast = () => {
    setToastMessage(null);
  }


  const handlePlayersExtracted = (extractRiotIds) => {
    const newPlayers = extractRiotIds.map(_name => (
      {
        name: _name.join("#"),
        game_name: _name[0],
        tagline: _name[1],
        lanes: {
          main: [],
          sub: []
        },
        rank: {
          tier: "Unranked",
          division: "I"
        }
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

  const handleSaveRank = (playerName, newRank) => {
    setPlayers(
      players.map(player =>
        player.name === playerName ? { ...player, rank: newRank } : player
      )
    )
    handleCloseRankModal()
  }


  // APIから不足情報を取得するボタン
  const handleComplatePlayerInfo = async () => {
    setIsLoading(true);

    const playersToUpdate = players.filter(player => player.rank.tier === "Unranked");

    if (playersToUpdate.length === 0) {
      setIsLoading(false);
      return;
    }

    const updatePromiss = playersToUpdate.map(async (player) => {
      try {
        const accoundData = await getAccountByRiotId(player.game_name, player.tagline);
        const puuid = accoundData.puuid;

        const leagueData = await getLeagueByPuuid(puuid);
        console.log(leagueData)
        const rankData = Array.from(leagueData).find(rankData => rankData.queueType === "RANKED_SOLO_5x5");


        return {
          ...player,
          rank: rankData === undefined ? { rank: rankData.rank, tier: rankData.division } : { tier: "Unranked", division: "I" }
        }

      } catch (error) {
        showToast("APIリクエスト中にエラーが発生しました。")
        console.error(`Failed to fetch data for ${player.name}:`, error);
        setIsLoading(false);
      }
    });

    const updatedPlayerData = await Promise.all(updatePromiss);

    const newPlayers = players.map(player => {
      const updatedPlayer = updatedPlayerData.find(up => up.name === player.name);
      return updatedPlayer || player;
    });

    setPlayers(newPlayers);
    setIsLoading(false);
  }

  const playerInModal = players.find(p => p.name === modalPlayerName);


  return (
    <>
      <Header />
      <main>
        <ChatInputForm onPlayersExtracted={handlePlayersExtracted} />

        <div className="player-card-list">
          {players.length > 0 && (
            players.map(player => (
              <PlayerCard
                key={player.name}
                player={player}
                onLaneChange={handleLaneChange}
                onOpenRankModal={handleOpenRankModal}
              />
            ))
          )}

        </div>

        <button onClick={handleComplatePlayerInfo} disabled={isLoading}>{isLoading ? '情報を取得中...' : 'APIで情報を補完'}</button>

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
