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
  var moveNum = 0;
  var yourMoveNum = 0;
  var rightDest;
  var rightSource;

  readCSV();
  var reader = new FileReader();
  var csvFile = fetch("/home/nrv/dev/chess-puzzle/test.csv");
  console.log(csvFile.text);

  // test csv - var csv = "000Zo,4r3/1k6/pp3r2/1b2P2p/3R1p2/P1R2P2/1P4PP/6K1 w - - 0 35,e5f6 e8e1 g1f2 e1f1,1459,75,93,483,endgame mate mateIn2 short,https://lichess.org/n8Ff742v#69"
  var csv = reader.readAsText(csvFile);
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
  //get every second move, ie your moves. The first move is the move that leads into the puzzle
  var yourMoves = moves.filter((item, idx) => (idx + 1) % 2 === 0);
  console.log(yourMoves)

  //init the puzzle by making the move before the puzzle starts
  initPuzzle()
  moveNum++; //a move is made by initPuzzle

  //when a user drops a piece
  function onDrop(source, target) {

    //parse and get the right answers
    rightSource = moves[moveNum].slice(0, 2)
    rightDest = moves[moveNum].slice(2, 4)

    console.log("yourmoves[yourmovenumber]" + yourMoves[yourMoveNum])

    if (source === rightSource) {
      console.log("right source")
      if (target === rightDest) {
        puzzle.move(moves[moveNum])
        yourMoveNum++
        moveNum++;
        //check to see if you have completed the puzzle
        if (yourMoveNum >= yourMoves.length) {
          root.render(
            <h1>Good job</h1>
          )
          return
        }
        //if it is not the last move of the puzzle, play the other players move
        puzzle.move(moves[moveNum])
        let startSquare = moves[moveNum].slice(0, 2)
        let destSquare = moves[moveNum].slice(2, 4)
        moveNum++;

        //render chess board with arrow for there best response
        root.render(
          <div className="app">
            <Chessboard position={puzzle.fen()} onPieceDrop={onDrop} customArrows={[[startSquare, destSquare, "#093A3E"]]} customArrowColor="#093A3E" />
          </div>)
      }
    }
    console.log("wrong")
    return false
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  //initialize the chess puzzle
  async function initPuzzle() {
    await sleep(500)
    puzzle.move(moves[0])
    //get the move start and destination square
    let startSquare = moves[0].slice(0, 2)
    let destSquare = moves[0].slice(2, 4)
    //render puzzle board after first init move, with arrow showing move
    root.render(
      <div className="app">
        <Chessboard position={puzzle.fen()} onPieceDrop={onDrop} customArrows={[[startSquare, destSquare, "#093A3E"]]} customArrowColor="#093A3E" />
      </div>)
  }
  async function loadCSV() {
    
  }

  return (
    <div className="app">
      <Chessboard position={puzzle.fen()} onPieceDrop={onDrop} />
    </div>
  );
}

export default App;