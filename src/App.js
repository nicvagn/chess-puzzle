/* This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>. */

import './App.css';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js'
import { parse } from '@vanillaes/csv'
import * as ReactDOM from 'react-dom/client';


function App() {
  var rightDest;
  var rightSource;
  var fen = null;
  var moves = null
  var moveNum = 0;
  var yourMoveNum = 0;
  var csv = "0008,r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24,f2g3 e6e7 b2b1 b3c1 b1c1 h6c1,1758,75,94,4412,crushing hangingPiece long middlegame,https://lichess.org/787zsVup/black#48,"
  var parsedCSV = parse(csv)

  const root = ReactDOM.createRoot(document.getElementById('root'));


  //get the starting fen from the parsed CSV
  fen = parsedCSV[0][1]
  //get the correct moves from the parsed CSV
  moves = parseMoves(parsedCSV[0][2])
  //create a new chess.js object with the puzzle fen
  const puzzle = new Chess(fen)

  //parse the puzzle moves from string
  function parseMoves(m){
    var parsed = m.split(" ")
    return parsed;
  }

  console.log(moves)
  //get every second move, ie your moves
  let yourMoves = moves.filter((item, idx) => (idx + 1) % 2 !== 0);
  console.log(yourMoves)


  //when a user drops a piece
  function onDrop(source, target) {
    rightSource = yourMoves[yourMoveNum].slice(0, 2)
    rightDest = yourMoves[yourMoveNum].slice(2,4)
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
        puzzle.move(moves[moveNum])
        moveNum++;
        if(yourMoveNum >= yourMoves.length){
          root.render(
            <h1>Good job</h1>
          )
        }else{
          root.render(
          <div className="app">
            <Chessboard position={puzzle.fen()} onPieceDrop={onDrop}/>
          </div>
          )
          return true;}

      }
    }
    console.log("wrong")
    return false
  }

  return (
    <div className="app">
      <Chessboard position={puzzle.fen()} onPieceDrop={onDrop}/>
    </div>
  );
}

export default App;
