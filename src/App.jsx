import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Button from './components/Button'
import ChatInputForm from './components/ChatInputForm'
import DebugModal from './components/DebugModal'
import Header from './components/Header'
import PlayerCard from "./components/PlayerCard"
import RankModal from './components/RankModal'
import TeamDivideResult from './components/TeamDivideResult'
import Player from './player'
import { Rank } from './types'
import { generateDummyPlayers } from './utils/dummyData'
import calculateImbalanceScore from './utils/imbalanceScore'
import { adjustTeams, divideTeamsGreedy } from './utils/teamDivider'

function App() {

  const [players, setPlayers] = useState([])
  const [modalPlayerName, setModalPlayerName] = useState(null);
  const [showDebugModal, setShowDebugModal] = useState(false);
  const [teams, setTeams] = useState([])

  const lanes = ["Top", "Jungle", "Mid", "Adc", "Support"];

  //チャットからプレイヤーのIDを抽出するボタン
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

  // api叩いて情報補完するボタン
  const handleCompletePlayersInfo = async () => {
    const updatePromises = players.map(async (player) => await player.completeInfo())

    const updatePlayers = await Promise.all(updatePromises);
    setPlayers(updatePlayers)

  }

  //チーム分けボタン
  const handleDivideTeams = () => {
    if (!(players.length === 10)) {
      toast.error("チーム分けには10人のプレイヤーが必要です。")
      return
    }

    const teams = divideTeamsGreedy(players);
    console.log("Score: ", calculateImbalanceScore(teams[0], teams[1]));

    const adjustedTeams = adjustTeams(teams[0], teams[1]);
    setTeams(adjustedTeams)

    const finalScore = calculateImbalanceScore(adjustedTeams[0], adjustedTeams[1])
    console.log("finalScore: ", finalScore);
  }

  //デバッグ用
  const handleReplaceDummyPlayers = () => {
    const newDummyPlayers = generateDummyPlayers("normal");
    setPlayers(newDummyPlayers);
  }

  const playerInModal = players.find(p => p.riotId === modalPlayerName);


  return (
    <>
      <div className="flex flex-col p-4 h-screen gap-4">
        <Header />
        <main className="flex flex-col grow min-h-0 gap-4">

          <ChatInputForm onPlayersExtracted={handlePlayersExtracted} onCompletePlayersInfo={handleCompletePlayersInfo} />

          <div className="flex grow min-h-0">
            <div className="w-[304px] overflow-y-scroll">
              <div className="flex flex-col gap-2">
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
              </div>
            </div>

            <div className="grow border-l border-gray-600 flex ">
              <TeamDivideResult teams={teams} />
            </div>
          </div>


          <div className="flex gap-2">
            <Button content="チーム分け" onClick={handleDivideTeams} />

          </div>
        </main>
        {import.meta.env.DEV && (
          <div className="absolute bottom-2 right-2 text-bg size-10" >
            <Button content={<img src='../src/assets/debug.svg'></img>} onClick={() => setShowDebugModal(true)} />
          </div>

        )}

      </div>

      {playerInModal && (
        <RankModal
          player={playerInModal}
          onClose={handleCloseRankModal}
          onSave={(handleSaveRank)} />
      )}

      {showDebugModal && (
        <DebugModal
          onClose={() => setShowDebugModal(false)}
          onReplacePlayers={handleReplaceDummyPlayers}
        />
      )}

      <ToastContainer
        hideProgressBar={true}
        theme="colored"
      />


    </>
  )
}

export default App
