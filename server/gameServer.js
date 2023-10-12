const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);

const { Server } = require("socket.io");

app.get('/', (req, res) => {
  res.send('Hello World');
});

const io = new Server(server, {
  cors: {
    origin: "https://tic-tac-toe-client-phi.vercel.app",
    methods: ["GET", "POST"],
  },
});

let game = {
  gameboard: Array(9).fill(null),
  nextTurn: true,
  winner: "",
};

let connectedPlayers = 0;

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});

io.on("connection", (socket) => {
  try {
    if (connectedPlayers < 2) {
      console.log("NEW USER CONNECTED!", socket.id);

      let playerSymbol = connectedPlayers === 0 ? "X" : "O";
      socket.emit("playerSymbol", playerSymbol);
  
      let client = `Client ${connectedPlayers + 1}`;
      socket.join(client);
      console.log("Player Joined - ", client);
      connectedPlayers++;
  
      socket.on("move", (data) => {
        console.log("Move Played", data.move, data.index);
        game.gameboard[data.index] = data.move;
        let result = calculateWinner(game.gameboard);
        if(result === "Draw"){
          io.emit("draw", "game is drawn")
        }
        else if(result){
          game.winner = result;
          io.emit("winner", game); // Notify all clients about the winner
          console.log("EMITTED WINNER TO ALL CLIENTS :) ");
        }
        io.emit("game", game);
      });

      socket.on("disconnect", () => {
        console.log("USER DISCONNECTED!");
        game.gameboard = Array(9).fill(null);
        connectedPlayers = 0;
        socket.emit("message", "A player has disconnected");
        // Notify all clients about the disconnection
        io.emit("reset")
      });
      socket.on("reset",()=> {
        game.gameboard = Array(9).fill(null);
        connectedPlayers = 0;
        io.emit("reset")
      })
    } 
    
    else {
      // Notify the client that the server is full
      socket.emit("message", "Server is Full :("); 
      console.log("Server is Full :(");
      return;
    }
  } catch (error) {
    console.log(error)
  }
});

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

  // Check for a draw
  if (squares.every((square) => square !== null)) {
    return "Draw";
  }

  return false;
}



