/* This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>. */

import './App.css';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js'
import { parse } from '@vanillaes/csv'
import * as ReactDOM from 'react-dom/client';


function App() {
  var fen = null;
  var moves = null;
  var moveNum = 1; // = 1 b/c first move is made by initPuzzle
  var yourMoveNum = 1;
  var rightDest;
  var rightSource;

  var csv = "004JD,3r4/R7/2p5/p1P2p2/1p4k1/nP6/P2KNP2/8 w - - 3 41,d2e3 a3c2,1127,77,97,310,endgame mate mateIn1 oneMove,https://lichess.org/6vTeEc3x#81,"
  var parsedCSV = parse(csv)

  const root = ReactDOM.createRoot(document.getElementById('root'));

  //get the starting fen from the parsed CSV
  fen = parsedCSV[0][1]
  //get the correct moves from the parsed CSV
  moves = parseMoves(parsedCSV[0][2])
  //create a new chess.js object with the puzzle fen
  const puzzle = new Chess(fen)

  //parse the puzzle moves from string
  function parseMoves(m) {
    var parsed = m.split(" ")
    return parsed;
  }

  console.log(moves)
  //get every second move, ie your moves
  var yourMoves = moves.filter((item, idx) => (idx + 1) % 2 !== 0);
  console.log(yourMoves)

  //init the puzzle by making the move before the puzzle starts
  initPuzzle()

  //when a user drops a piece
  function onDrop(source, target) {
    //check to see if you have completed the puzzle
    if (yourMoveNum >= yourMoves.length) {
      root.render(
        <h1>Good job</h1>
      )
      return
    }
    rightSource = yourMoves[yourMoveNum].slice(0, 2)
    rightDest = yourMoves[yourMoveNum].slice(2, 4)
    console.log("drop")
    console.log(source)
    console.log(target)
    console.log(rightDest)
    if (source === rightSource) {
      console.log("right source")
      if (target === rightDest) {
        puzzle.move(moves[moveNum])
        yourMoveNum++
        moveNum++;
          //if it is not the last move of the puzzle, play the other players move
          puzzle.move(moves[moveNum])
          root.render(
            <div className="app">
              <Chessboard position={puzzle.fen()} onPieceDrop={onDrop} />
            </div>)
          moveNum++;
      }
    }
    console.log("wrong")
    return false
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function initPuzzle() {
    await sleep(500)
    puzzle.move(moves[0])
    //render puzzle board after first init move
    root.render(
      <div className="app">
        <Chessboard position={puzzle.fen()} onPieceDrop={onDrop} />
      </div>)
  }
  return (
    <div className="app">
      <Chessboard position={puzzle.fen()} onPieceDrop={onDrop} />
    </div>
  );
}

export default App;
