const PORT = process.env.PORT || 8001;
const ENV = require("../environment");

const app = require("./application")(ENV, { addWorkorder });
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

function addWorkorder(keys) {
  wss.clients.forEach(function eachClient(client) {
    console.log("do we have clients?")
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
