import { useState } from "react";

import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  'X': 'Player1',
  'O': 'Player2'
}

const INITIAL_GAME_BOARD = [
  [null, null,null],
  [null, null,null],
  [null, null,null],
]

function deriveActivePlayer(turns){
  let currentPlayer = 'X';
  if(turns.length > 0 && turns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSymbol && 
      firstSymbol === secondSymbol && 
      firstSymbol === thirdSymbol) {
        winner = players[firstSymbol];
      }
  }
  return winner;
}

function deriveGameBoard(turns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of turns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers]  = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquareAnc(rwoIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { 
          square: {
            row: rwoIndex,
            col: colIndex,
          },
          player: currentPlayer
        },...prevTurns];

        return updatedTurns
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      const bla = {
        ...prevPlayers,
        [symbol]: newName
      }
      console.log(bla, 'winners ?')
      return bla
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player name={players.X} symbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange}></Player>
        <Player name={players.O} symbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}></Player>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquareAnc} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
