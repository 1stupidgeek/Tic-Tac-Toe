import { useState } from "react";
import "./App.css";


function App() {
  const [moves, setMoves] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  
  let winner = calculateWinner(moves);
  let result;
  
  function handleClick(index) {
    if(winner){
      result = winner
      return
    }
    if (moves[index] === null) {
      const newMoves = [...moves];
      newMoves[index] = turn ? "X" : "O";
      setMoves(newMoves);
      setTurn(!turn);
      winner = calculateWinner(newMoves);
    }
  }
  
  return (
    <div>
      {!winner && <div>{turn ? "X's Turn" : "O's Turn"}</div>}
      <div>
        <Button value={moves[0]} onClick={() => handleClick(0)} />
        <Button value={moves[1]} onClick={() => handleClick(1)} />
        <Button value={moves[2]} onClick={() => handleClick(2)} />
      </div>
      <div>
        <Button value={moves[3]} onClick={() => handleClick(3)} />
        <Button value={moves[4]} onClick={() => handleClick(4)} />
        <Button value={moves[5]} onClick={() => handleClick(5)} />
      </div>
      <div>
        <Button value={moves[6]} onClick={() => handleClick(6)} />
        <Button value={moves[7]} onClick={() => handleClick(7)} />
        <Button value={moves[8]} onClick={() => handleClick(8)} />
      </div>
      {winner && <div>Winner is {winner}</div>}
    </div>
  );
}

function Button({ value, onClick }) {
  return <button onClick={onClick}>{value}</button>;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false;
}

export default App;
