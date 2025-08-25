import { useState } from 'react'
import './App.css'
import ChatInputForm from './components/ChatInputForm'
import Footer from './components/Footer'
import Header from './components/Header'
import PlayerCard from "./components/PlayerCard"
import RankModal from './components/RankModal'
import Toast from './components/Toast'

function App() {

  const [players, setPlayers] = useState([])
  const [modalPlayerName, setModalPlayerName] = useState(null);
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
        gameName: _name[0],
        tagLine: _name[1],
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
