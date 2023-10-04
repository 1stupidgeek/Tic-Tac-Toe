const express = require("express")
const app = express()
const http = require('http');
const cors = require("cors")
app.use(cors())
const server = http.createServer(app)

const { Server } = require("socket.io")

const io = new Server (server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
})

let game = {
  gameboard: Array(9).fill(null),
  nextTurn: true,
  winner: false
}


server.listen(3001, () => {
  console.log('Server is running on port 3001');
});

io.on('connection', (socket) => {
  console.log('NEW USER CONNECTED!', socket.id);
  
  socket.on('move', (data) => {//data has game move, move index
    console.log('Move Played', data.move, data.index);
    game.gameboard[data.index] = data.move;
    let result = calculateWinner(game.gameboard)
    if(result){
      game.winner = true;
      socket.emit("winner", game)
      console.log("EMITTED WINNER TO ALL CLIENTS :) ")
    }
    io.emit("game", game)
    console.log("EMITTED GAME TO ALL CLIENTS :) ")
  });

  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED!');
    game.gameboard = Array(9).fill(null)
  });
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
  return false;
}

