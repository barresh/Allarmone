const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const a6 = require("./A6");
const a1 = require("./A1");
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
a6.entrata();
aggiornamentostato = a6.aggiornamentostato;
console.log("arriva", a6.aggiornamentostato);
wss.on("connection", (ws) => {
  console.log("Nuova connessione WebSocket stabilita", a6.aggiornamentostato);
  // Ricevi i messaggi dal client Angular
  ws.on("message", (message) => {
    console.log("Messaggio ricevuto dal client Angular:", message);
    var passaggio = message.toString("hex");
    var codiceGiusto = hexToString(passaggio);
    console.log("codiceGiusto", codiceGiusto);
    var response = { type: "update", content: a6.aggiornamentostato };
    ws.send(JSON.stringify(response));
    if (codiceGiusto.slice(1, 4) === "pin") {
      console.log("entra nell'if");
      codiceApi = codiceGiusto.slice(4, codiceGiusto.length - 1);
      exports.codiceApi = codiceApi;
      a1.validaCodice();
    }
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
function mandaPin() {
  codiceApi.exports = codiceApi;
  console.log("vediamolo", codiceApi);
}
exports.mandaPin = mandaPin;
