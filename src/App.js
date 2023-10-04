import './App.css';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js'
import { parse } from '@vanillaes/csv'

function App() {
  var rightDest;
  var rightSource;
  var fen = null;
  var moves = null
  var moveNumber = 0;
  var csv = "0008,r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24,f2g3 e6e7 b2b1 b3c1 b1c1 h6c1,1758,75,94,4412,crushing hangingPiece long middlegame,https://lichess.org/787zsVup/black#48,"
  var parsedCSV = parse(csv)

  //get the starting fen from the parsed CSV
  fen = parsedCSV[0][1]
  //get the correct moves from the parsed CSV
  moves = parseMoves(parsedCSV[0][2])
  console.log(moves)

  function parseMoves(m){
    var parsed = m.split(" ")
    return parsed;
  }

  rightSource = moves[moveNumber].slice(0, 2)
  rightDest = moves[moveNumber].slice(2,4)
  console.log(rightSource)
  console.log(rightDest)

  //when a user drops a piece
  function onDrop(source, target) {
    console.log("drop")
    if (source === rightSource) {
      console.log("right source")
      if (target === rightDest) {
        console.log("right dest")
        return true
      }
    }
    console.log("wrong")
    return false
  }

  return (
    <div className="app">
      <Chessboard position={fen} onPieceDrop={onDrop}/>;
    </div>
  );
}

export default App;
