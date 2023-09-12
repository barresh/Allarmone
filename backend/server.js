const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const a6 = require("./A6");
const a1 = require("./A1");
a6.entrata();
console.log("arriva", a6.aggiornamentostato);

wss.on("connection", (ws) => {
  console.log("connessione WebSocket stabilita");
  // Ricevi i messaggi dal client Angular
  ws.on("message", (message) => {
    const arrivo = JSON.parse(message);
    console.log("jsonParsato", arrivo);
    exports.arrivo = arrivo;
    if (arrivo.pacchetto == 1) {
      a1.invia();
    }
    function mandaEsito() {
      esito = a6.esito;
      console.log("Esito che ti mando:", esito);
      ws.send(JSON.stringify(a6.esito));
    }
    exports.mandaEsito = mandaEsito;
    console.log("Messaggio ricevuto dal client Angular:", message);
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
