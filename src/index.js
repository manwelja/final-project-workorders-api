const PORT = process.env.PORT || 8001;
const ENV = require("../environment");

const app = require("./application")(ENV, { messageClients });
const server = require("http").Server(app);

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

wss.on("connection", socket => {
  console.log("connection made");
  socket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);

    if (event.data === "ping") {
      socket.send(JSON.stringify("pong"));
    }
  };
});

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
