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
    console.log("Messaggio ricevuto dal client Angular:", message);
    var passaggio = message.toString("hex");
    var codiceGiusto = hexToString(passaggio);
    console.log("codiceGiusto", codiceGiusto);
    var response = { type: "update", content: a6.aggiornamentostato };
    ws.send(JSON.stringify(a6.esito));
    console.log("codiceGiustoSlice0,7", codiceGiusto.slice(0, 7));
    if (codiceGiusto.slice(0, 3) == "pin") {
      codiceApi = codiceGiusto.slice(4, codiceGiusto.length);
      exports.codiceApi = codiceApi;
      a1.validaCodice();
      esito = a6.esito;
      console.log("esito:", a6.esito);
    }
    if (codiceGiusto.slice(0, 7) == "accendi") {
      console.log(
        "vediamocomeslico",
        codiceGiusto.slice(7, codiceGiusto.length)
      );
      codiceApi = codiceGiusto.slice(7, codiceGiusto.length);
      exports.codiceApi = codiceApi;
      a1.accendiZone();
      esito = a6.esito;
      console.log("esito:", a6.esito);
    }
    if (codiceGiusto.slice(0, 9) == "configura") {
      console.log(
        "vediamocomeslico",
        codiceGiusto.slice(9, codiceGiusto.length)
      );
      codiceApi = codiceGiusto.slice(9, codiceGiusto.length);
      exports.codiceApi = codiceApi;
      a1.trigConfigurazioneImpianto();
      esito = a6.esito;
      console.log("esito:", a6.esito);
    }
    if (codiceGiusto.slice(0, 10) == "inclusione") {
      console.log(
        "vediamocomeslico",
        codiceGiusto.slice(10, codiceGiusto.length)
      );
      codiceApi = codiceGiusto.slice(10, codiceGiusto.length);
      exports.codiceApi = codiceApi;
      a1.includere();
      esito = a6.esito;
      console.log("esito:", a6.esito);
    }
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
