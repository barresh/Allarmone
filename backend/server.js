const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const a6 = require("./A6");
const a1 = require("./A1");
console.log("arriva", a6.aggiornamentostato);
var connesso = false;

wss.on("connection", (ws) => {
  console.log("connessione WebSocket stabilita");
  connesso = true;
  console.log("connesso:", connesso);
  exports.connesso = connesso;
  a6.entrata();
  // Ricevi i messaggi dal client Angular
  function mandaEsito() {
    esito = a6.esito;
    console.log("Esito che ti mando:", esito);
    ws.send(JSON.stringify(a6.esito));
  }
  exports.mandaEsito = mandaEsito;
  ws.on("message", (message) => {
    const arrivo = JSON.parse(message);
    console.log("jsonParsato", arrivo);
    exports.arrivo = arrivo;
    if (arrivo.pacchetto == 1) {
      a1.invia();
    }

    console.log("Messaggio ricevuto dal client Angular:", message);
  });
  ws.on("close", () => {
    console.log("Client disconnected");
    connesso = false;
    console.log("connesso:", connesso);

    exports.connesso = connesso;
  });
});
