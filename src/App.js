import './App.css';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js'


function App() {
  var rightDest = 'a4';
  var rightSource = "a2";
  var fen = null;

  const game = new Chess()
    //when a user drops a piece
    function onDrop(source,target){
      console.log("drop")
      if(source === rightSource){
        console.log("right source")
          if(target === rightDest){
            console.log("right dest")
            return true
          }
      }
      console.log("wrong")
      return false
  }
  return (
    <div className="app">
      <Chessboard position={game.fen()} onPieceDrop={onDrop}/>;
    </div>
  );
}

export default App;
