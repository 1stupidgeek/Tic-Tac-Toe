# Tic-Tac-Toe

- A simple multiplayer Tic-Tac-Toe game implimented in react and socket.io

• About the Deployments -

- Frontend is deployed on Vercel.

- Backend is deployed on some free cheap server. Might take some time to connect to the backend (free backend deployments are pretty bad). It'll take 10-20 seconds to start the server (you'll see "you move" or "opponents move" appear when it starts)

- This game supports 2 players at a time, there isn't room for a third person.

• First join plays first 


This app uses -

    Frontend - React

    Backend  - Node, Express and Socket.io

## Available Scripts

In the project directory, you can run:

**In the client** :

  ### `npm start`
  Make sure to change the `const socket = io("https://game-server1.onrender.com/");` in gameClient.js to [http://localhost:3001](http://localhost:3001) 

  and the origin in gameServer.js to [http://localhost:3000](http://localhost:3000)
  
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
  


**In the server** :

  ### `node gameServer.js`

  Starts the server on the speficied port in the PORT variable.





