# Tic-Tac-Toe

A simple multiplayer Tic-Tac-Toe game implimented in react and socket.io.

(this isnt the ideal use of socket.io, I created this project for the sake of learning react)

This app uses -
**Frontend** - React
**Backend**  - Node, Express and Socket.io

## Available Scripts

In the project directory, you can run:

**In the client** :

  ### `npm start`
  (Make sure to change the `const socket = io("https://game-server1.onrender.com/");` in gameClient.js to [http://localhost:3001](http://localhost:3001) 

  and the origin in gameServer.js to [http://localhost:3000](http://localhost:3000))
  
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
  


**In the server** :

  ### `node gameServer.js`

  Starts the server on the speficied port in the PORT variable.

