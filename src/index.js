const PORT = process.env.PORT || 8001;
const ENV = require("../environment");

const app = require("./application")({ ENV, updateWorkorder });
const server = require("http").Server(app);

//Define a new web socket server
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

//Watch for client connections
wss.on("connection", socket => {
  socket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);
    if (event.data === "ping") {
      socket.send(JSON.stringify("pong"));
    }
  };
});

//If a workorder is updated, send the new workorder JSON object to all connected clients
function updateWorkorder(keys) {  
  wss.clients.forEach(function eachClient(client) {    
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          keys
        })
      );
    }
  });
}

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});
