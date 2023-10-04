import './App.css';
import {useState} from 'react'
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js'


function App() {
  var rightSquare;

  const game = new Chess(
    'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2'
  )
    //when a user drops a piece
    function onDrop(source,target){
      if(target !== rightSquare){
        return true
      }
      return false

  }
  return (
    <div className="app">
      <Chessboard position={game.fen()} onPieceDrop={onDrop}/>;
    </div>

  );
}

export default App;
