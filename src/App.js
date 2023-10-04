import './App.css';
import { useState } from 'react'
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js'


function App() {
  return (
    <div className="App">
      <Chessboard/>
    </div>
  );
}

export default App;
