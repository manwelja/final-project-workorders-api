const PORT = process.env.PORT || 8001;
const ENV = require("../environment");

const app = require("./application")(ENV, { messageClients });
const server = require("http").Server(app);

//Set up new websocket server to interact with all connected clients
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

//Log when a client connects to the API server
wss.on("connection", socket => {
  console.log("connection made");
  socket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);

    if (event.data === "ping") {
      socket.send(JSON.stringify("pong"));
    }
  };
});

//Function that gets called whenever the database is updated.
//The API server notifies ALL connected clients so that their states can be updated accordingly to display the new/updated data
function messageClients(keys) {
  wss.clients.forEach(function eachClient(client) {
      if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          data: keys,
          message: "workorder data updated"
        })
      );
    }
  });
}

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});
