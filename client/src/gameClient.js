import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("localhost:3001");

function TicTacToeGame() {
  const [turn, setTurn] = useState(true);
  const [moves, setMoves] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState("");
  const [serverFull, setServerFull] = useState("");
  const [draw, setDraw] = useState("")

  //Update the gamestate after each move is played
  useEffect(() => {
    // Listen for server messages
    socket.on("message", (message) => {
      setServerFull(message);
    });

    // Listen for game updates
    socket.on("game", (game) => {
      setMoves(game.gameboard);
      setTurn(!turn);
      console.log("UPDATED GAME STATE");
    });

    // Listen for winner announcement
    socket.on("winner", (data) => {
      setWinner(data.winner);
      console.log("WINNER IS", data.winner);
    });

    // Listen for player symbol assignment
    socket.on("playerSymbol", (symbol) => {
      setPlayerSymbol(symbol);
    });

    //Reload the game if either of the players reloads
    socket.on("reset", () => {
      window.location.reload();
    });

    socket.on("draw", () => {
      setDraw(true)
    });
  })

  function handleClick(index) {
    //prevent moves change and prevent moves after winner is decided
    if (winner || moves[index] !== null) {
      return;
    }
    // Check if it's the player's turn based on playerSymbol
    if (playerSymbol !== (turn ? "X" : "O")) {
      return;
    }
    // setTurn(!turn);
    moves[index] = playerSymbol;
    //Emit the move to the server
    socket.emit("move", { move: moves[index], index: index });
  }
  return (
    <div>
      {serverFull ? (
        <div class="serverFull">{serverFull}</div>
      ) : (
        <div class="gameBoard">
          {<div class="turn">{turn ? "X's Turn" : "O's Turn"}</div>}
          <div class="row">
            <Button value={moves[0]} onClick={() => handleClick(0)} />
            <Button value={moves[1]} onClick={() => handleClick(1)} />
            <Button value={moves[2]} onClick={() => handleClick(2)} />
          </div>
          <div class="row">
            <Button value={moves[3]} onClick={() => handleClick(3)} />
            <Button value={moves[4]} onClick={() => handleClick(4)} />
            <Button value={moves[5]} onClick={() => handleClick(5)} />
          </div>
          <div class="row">
            <Button value={moves[6]} onClick={() => handleClick(6)} />
            <Button value={moves[7]} onClick={() => handleClick(7)} />
            <Button value={moves[8]} onClick={() => handleClick(8)} />
          </div>
          {winner ? <div class="result">Winner is <span class="winner">{winner}</span></div> : null}
          {draw ? <div class="result">Draw</div> : null}
          {(winner || draw) && <button style={{ width: '60%' }} class="reset" onClick={(socket)=>{reset(socket)}}>RESET</button>}
        </div>
      )}
    </div>
  );
}

function Button({ value, onClick }) {
  return <button class="moveBox" onClick={onClick}>{value}</button>;
}

function reset(io){
  socket.emit("reset")
}
export default TicTacToeGame;
