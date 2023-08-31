const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const a6 = require("./A6");
const a1 = require("./A1");
a6.entrata();
const hexToString = (hex) => {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    const hexValue = hex.substr(i, 2);
    const decimalValue = parseInt(hexValue, 16);
    str += String.fromCharCode(decimalValue);
  }
  return str;
};
flagAggiornato = a6.flagAggiornato;
var codiceGiusto = "";
aggiornamentostato = a6.aggiornamentostato;
console.log("arriva", a6.aggiornamentostato);
wss.on("connection", (ws) => {
  console.log("Nuova connessione WebSocket stabilita", a6.aggiornamentostato);
  // Ricevi i messaggi dal client Angular
  ws.on("message", (message) => {
    const arrivo = JSON.parse(message);
    console.log("jsonParsato", arrivo);
    exports.arrivo = arrivo;
    a1.invia();

    console.log("Messaggio ricevuto dal client Angular:", message);
    function mandaEsito() {
      esito = a6.esito;
      console.log("Esito che ti mando:", esito);
      ws.send(JSON.stringify(a6.esito));
    }
    function mandaAggiornamento() {
      aggiornamentostato = a6.aggiornamentostato;
      console.log("Aggiornamento che ti mando:", aggiornamentostato);
      ws.send(JSON.stringify(a6.aggiornamentostato));
    }
    exports.mandaAggiornamento = mandaAggiornamento;
    exports.mandaEsito = mandaEsito;
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
exports.wss = wss;
