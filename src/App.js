import './App.css';
import {useState} from 'react'
import { Chessboard } from 'react-chessboard';
import Chess from 'chess.js'


function App() {
  var rightSquare;

  const game = new Chess(
    'r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - - 0 19'
  )
    //when a user drops a piece
    function onDrop(source,target){
      if(target !== rightSquare){
        
      }

  }
  return (
    <div className="app">
      <Chessboard position={game.fen()}/>
    </div>
  );
}

export default App;
