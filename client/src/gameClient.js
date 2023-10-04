import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:3001")

function TicTacToeGame() {
  const [turn, setTurn] = useState(true);
  const [moves, setMoves] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(false);

  useEffect(()=>{
    socket.on("game", (data)=>{
      setMoves(data.gameboard)
      setTurn(!turn)
      console.log("UPDATED GAME STATE")
    }) 
  });
  useEffect(()=>{
    socket.on("winner", (data)=>{
      setWinner(data.winner)
      console.log("WINNER IS", data.winner ? "X":"O")
    }) 
  });

  function handleClick(index) {
    if (winner || moves[index] !== null) {
      return;
    }
    moves[index] = turn ? "X" : "O";
    socket.emit("move",{move: moves[index], index: index})
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
      {winner && <div>Winner is {winner? "X": "O"}</div>}
    </div>
  );
}


function Button({ value, onClick }) {
  return <button onClick={onClick}>{value}</button>;
}

export default TicTacToeGame;

