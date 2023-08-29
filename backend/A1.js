//mittente
const portone = require("./port");
const port = portone.port;
const server = require("./server");
const a6 = require("./A6");

console.log("a1", server);
var payload = [
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d,
  0x0e, 0x0f, 0x10, 0x11, 0x12, 0x13, 0x15, 0x16, 0x17, 0x18, 0x19,
];
var mittente = 0x60;
var destinatario = 0x11;
var aree = [0x01, 0x02, 0x03, 0x04, 0x0f];
var codice = [0x11, 0x11, 0xff];
var codiceModificato = [0x88, 0x88, 0xff];
var numeroUscita = []; //serve per payload in uscita 0a
var tipiDefault = [
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11,
]; //serve per payload in uscita 12
const giorni = [
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13,
  0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26,
  0x27, 0x28, 0x29, 0x30, 0x31,
];
const mesi = [
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12,
];
const anni = [
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13,
  0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26,
  0x27, 0x28, 0x29, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39,
  0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x50, 0x51, 0x52,
  0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x60, 0x61, 0x62, 0x63, 0x64, 0x65,
  0x66, 0x67, 0x68, 0x69, 0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78,
  0x79, 0x80, 0x81, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x90, 0x91,
  0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99,
];
const ore = [
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13,
  0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x20, 0x21, 0x22, 0x23, 0x24,
];
const minuti = [
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13,
  0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26,
  0x27, 0x28, 0x29, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39,
  0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x50, 0x51, 0x52,
  0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x60,
];
const secondi = [
  0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x10, 0x11, 0x12, 0x13,
  0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26,
  0x27, 0x28, 0x29, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39,
  0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x50, 0x51, 0x52,
  0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x60,
];
const settimana = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06];
var i;
//payload 1
//payload 2
//payload 3
//PAYLOAD 4
//PAYLOAD 5
var accendirapido = new Buffer(5);
accendirapido[0] = mittente;
accendirapido[1] = destinatario;
accendirapido[2] = payload[4];
accendirapido[3] = aree[2];
var sommaRapido = (
  accendirapido[0] +
  accendirapido[1] +
  accendirapido[2] +
  accendirapido[3]
)
  .toString(16)
  .slice(1, 3);
accendirapido[4] = "0x" + sommaRapido;
//PAYLOAD 6
var cancellazioneMemoria = new Buffer(7);
cancellazioneMemoria[0] = mittente;
cancellazioneMemoria[1] = destinatario;
cancellazioneMemoria[2] = payload[5];
cancellazioneMemoria[3] = codice[0];
cancellazioneMemoria[4] = codice[1];
cancellazioneMemoria[5] = codice[2];
var sommaCancellazione = (
  cancellazioneMemoria[0] +
  cancellazioneMemoria[1] +
  cancellazioneMemoria[2] +
  cancellazioneMemoria[3] +
  cancellazioneMemoria[4] +
  cancellazioneMemoria[5]
)
  .toString(16)
  .slice(1, 3);
cancellazioneMemoria[6] = "0x" + sommaCancellazione;
//PAYLOAD 7
var resetAllarmi = new Buffer(7);
resetAllarmi[0] = mittente;
resetAllarmi[1] = destinatario;
resetAllarmi[2] = payload[6];
resetAllarmi[3] = codice[0];
resetAllarmi[4] = codice[1];
resetAllarmi[5] = codice[2];
var sommaReset = (
  resetAllarmi[0] +
  resetAllarmi[1] +
  resetAllarmi[2] +
  resetAllarmi[3] +
  resetAllarmi[4] +
  resetAllarmi[5]
)
  .toString(16)
  .slice(1, 3);
resetAllarmi[6] = "0x" + sommaReset;
//payload 8
//payload 9
var tamperAperto = new Buffer(4);
tamperAperto[0] = mittente;
tamperAperto[1] = destinatario;
tamperAperto[2] = payload[8];
var sommaTamperAperto = (tamperAperto[0] + tamperAperto[1] + tamperAperto[2])
  .toString(16)
  .slice(1, 3);
tamperAperto[4] = "0x" + sommaTamperAperto;
//payload 0A
var attivazioneUscite = new Buffer(8);
attivazioneUscite[0] = mittente;
attivazioneUscite[1] = destinatario;
attivazioneUscite[2] = payload[9];
attivazioneUscite[3] = codice[0];
attivazioneUscite[4] = codice[1];
attivazioneUscite[5] = codice[2];
attivazioneUscite[6] = numeroUscita[0];
var sommaAttivazione = (
  attivazioneUscite[0] +
  attivazioneUscite[1] +
  attivazioneUscite[2] +
  attivazioneUscite[3] +
  attivazioneUscite[4] +
  attivazioneUscite[5] +
  attivazioneUscite[6]
)
  .toString(16)
  .slice(1, 3);
attivazioneUscite[7] = "0x" + sommaAttivazione;
//payload 0B
var richiestaProgrammazione = new Buffer(7);
richiestaProgrammazione[0] = mittente;
richiestaProgrammazione[1] = destinatario;
richiestaProgrammazione[2] = payload[10];
richiestaProgrammazione[3] = codice[0];
richiestaProgrammazione[4] = codice[1];
richiestaProgrammazione[5] = codice[2];
var sommaProgrammazione = (
  richiestaProgrammazione[0] +
  richiestaProgrammazione[1] +
  richiestaProgrammazione[2] +
  richiestaProgrammazione[3] +
  richiestaProgrammazione[4] +
  richiestaProgrammazione[5]
)
  .toString(16)
  .slice(1, 3);
richiestaProgrammazione[6] = "0x" + sommaProgrammazione;
//payload 0C
var blocco = new Buffer(7);
blocco[0] = mittente;
blocco[1] = destinatario;
blocco[2] = payload[11];
blocco[3] = codice[0];
blocco[4] = codice[1];
blocco[5] = codice[2];
var sommablocco = (
  blocco[0] +
  blocco[1] +
  blocco[2] +
  blocco[3] +
  blocco[4] +
  blocco[5]
)
  .toString(16)
  .slice(1, 3);
blocco[6] = "0x" + sommablocco;
//payload 0D
var sirene = new Buffer(7);
sirene[0] = mittente;
sirene[1] = destinatario;
sirene[2] = payload[12];
sirene[3] = codice[0];
sirene[4] = codice[1];
sirene[5] = codice[2];
var sommaSirene = (
  sirene[0] +
  sirene[1] +
  sirene[2] +
  sirene[3] +
  sirene[4] +
  sirene[5]
)
  .toString(16)
  .slice(1, 3);
sirene[6] = "0x" + sommaSirene;
//payload 0E
var configurazioneSpecifica = new Buffer(4);
configurazioneSpecifica[0] = mittente;
configurazioneSpecifica[1] = destinatario;
configurazioneSpecifica[2] = payload[13];
sommaSpecifica = (
  configurazioneSpecifica[0] +
  configurazioneSpecifica[1] +
  configurazioneSpecifica[2]
)
  .toString(16)
  .slice(1, 3);
configurazioneSpecifica[3] = "0x" + sommaSpecifica;
//payload 0F
var richiestaStringhe = new Buffer(4);
richiestaStringhe[0] = mittente;
richiestaStringhe[1] = destinatario;
richiestaStringhe[2] = payload[14];
sommaRichiestaStringhe = (
  richiestaStringhe[0] +
  richiestaStringhe[1] +
  richiestaStringhe[2]
)
  .toString(16)
  .slice(1, 3);
richiestaStringhe[3] = "0x" + sommaRichiestaStringhe;
//payload 10
var richiestaTimer = new Buffer(7);
richiestaTimer[0] = mittente;
richiestaTimer[1] = destinatario;
richiestaTimer[2] = payload[15];
richiestaTimer[3] = codice[0];
richiestaTimer[4] = codice[1];
richiestaTimer[5] = codice[2];
sommaRichiestaTimer = (
  richiestaTimer[0] +
  richiestaTimer[1] +
  richiestaTimer[2] +
  richiestaTimer[3] +
  richiestaTimer[4] +
  richiestaTimer[5]
)
  .toString(16)
  .slice(1, 3);
richiestaTimer[6] = "0x" + sommaRichiestaTimer;
//payload 11
var richiestaAbilitazione = new Buffer(7);
richiestaAbilitazione[0] = mittente;
richiestaAbilitazione[1] = destinatario;
richiestaAbilitazione[2] = payload[16];
richiestaAbilitazione[3] = codice[0];
richiestaAbilitazione[4] = codice[1];
richiestaAbilitazione[5] = codice[2];
var sommaRichiestaAbilitazione = (
  richiestaAbilitazione[0] +
  richiestaAbilitazione[1] +
  richiestaAbilitazione[2] +
  richiestaAbilitazione[3] +
  richiestaAbilitazione[4] +
  richiestaAbilitazione[5]
)
  .toString(16)
  .slice(1, 3);
richiestaAbilitazione[6] = "0x" + sommaRichiestaAbilitazione;
//payload 12
var richiestaDefaultProgrammazione = new Buffer(8);
richiestaDefaultProgrammazione[0] = mittente;
richiestaDefaultProgrammazione[1] = destinatario;
richiestaDefaultProgrammazione[2] = payload[17];
richiestaDefaultProgrammazione[3] = codice[0];
richiestaDefaultProgrammazione[4] = codice[1];
richiestaDefaultProgrammazione[5] = codice[2];
richiestaDefaultProgrammazione[6] = tipiDefault[0];
var sommaRichiestaDefault = (
  richiestaDefaultProgrammazione[0] +
  richiestaDefaultProgrammazione[1] +
  richiestaDefaultProgrammazione[2] +
  richiestaDefaultProgrammazione[3] +
  richiestaDefaultProgrammazione[4] +
  richiestaDefaultProgrammazione[5] +
  richiestaDefaultProgrammazione[6]
)
  .toString(16)
  .slice(1, 3);
richiestaDefaultProgrammazione[7] = "0x" + sommaRichiestaDefault;
//payload 13
var richiestaResetProgrammato = new Buffer(7);
richiestaResetProgrammato[0] = mittente;
richiestaResetProgrammato[1] = destinatario;
richiestaResetProgrammato[2] = payload[18];
richiestaResetProgrammato[3] = codice[0];
richiestaResetProgrammato[4] = codice[1];
richiestaResetProgrammato[5] = codice[2];
var sommaRichiestaReset = (
  richiestaResetProgrammato[0] +
  richiestaResetProgrammato[1] +
  richiestaResetProgrammato[2] +
  richiestaResetProgrammato[3] +
  richiestaResetProgrammato[4] +
  richiestaResetProgrammato[5]
)
  .toString(16)
  .slice(1, 3);
richiestaResetProgrammato[6] = "0x" + sommaRichiestaReset;
//payload 15
var richiestaConfigurazioneComunicatore = new Buffer(4);
richiestaConfigurazioneComunicatore[0] = mittente;
richiestaConfigurazioneComunicatore[1] = destinatario;
richiestaConfigurazioneComunicatore[2] = payload[19];
var sommaConfigurazioneComunicatore = (
  richiestaConfigurazioneComunicatore[0] +
  richiestaConfigurazioneComunicatore[1] +
  richiestaConfigurazioneComunicatore[2]
)
  .toString(16)
  .slice(1, 3);
richiestaConfigurazioneComunicatore[3] = "0x" + sommaConfigurazioneComunicatore;
//payload 16
var richiestaEventi = new Buffer(4);
richiestaEventi[0] = mittente;
richiestaEventi[1] = destinatario;
richiestaEventi[2] = payload[20];
var sommaRichiestaEventi = (
  richiestaEventi[0] +
  richiestaEventi[1] +
  richiestaEventi[2]
)
  .toString(16)
  .slice(1, 3);
richiestaEventi[3] = "0x" + sommaRichiestaEventi;
//payload 17 DA FARE
//payload 18
var richiestaConfigurazioneEspansione = new Buffer(4);
richiestaConfigurazioneEspansione[0] = mittente;
richiestaConfigurazioneEspansione[1] = destinatario;
richiestaConfigurazioneEspansione[2] = payload[22];
var sommaRichiestaConfigurazioneEspansione = (
  richiestaConfigurazioneEspansione[0] +
  richiestaConfigurazioneEspansione[1] +
  richiestaConfigurazioneEspansione[2]
)
  .toString(16)
  .slice(1, 3);
richiestaConfigurazioneEspansione =
  "0x" + sommaRichiestaConfigurazioneEspansione;
//payload 19
//payload 1A
var richiestaValiditaSpinotto = new Buffer(7);
richiestaValiditaSpinotto[0] = mittente;
richiestaValiditaSpinotto[1] = destinatario;
richiestaValiditaSpinotto[2] = payload[24];
richiestaValiditaSpinotto[3] = codice[0];
richiestaValiditaSpinotto[4] = codice[1];
richiestaValiditaSpinotto[5] = codice[2];
var sommaRichiestaValiditaSpinotto = (
  richiestaValiditaSpinotto[0] +
  richiestaValiditaSpinotto[1] +
  richiestaValiditaSpinotto[2] +
  richiestaValiditaSpinotto[3] +
  richiestaValiditaSpinotto[4] +
  richiestaValiditaSpinotto[5]
)
  .toString(16)
  .slice(1, 3);
richiestaValiditaSpinotto[6] = "0x" + sommaRichiestaValiditaSpinotto;
//payload 1B
var inserimentoSpinotto = new Buffer(8);
inserimentoSpinotto[0] = mittente;
inserimentoSpinotto[1] = destinatario;
inserimentoSpinotto[2] = payload[25];
inserimentoSpinotto[3] = codice[0];
inserimentoSpinotto[4] = codice[1];
inserimentoSpinotto[5] = codice[2];
inserimentoSpinotto[6] = aree[0];
var sommaInserimentoSpinotto = (
  inserimentoSpinotto[0] +
  inserimentoSpinotto[1] +
  inserimentoSpinotto[2] +
  inserimentoSpinotto[3] +
  inserimentoSpinotto[4] +
  inserimentoSpinotto[5] +
  inserimentoSpinotto[6]
)
  .toString(16)
  .slice(1, 3);
inserimentoSpinotto[7] = "0x" + sommaInserimentoSpinotto;
//payload 1C
var chiaveCiclica = new Buffer(8);
chiaveCiclica[0] = mittente;
chiaveCiclica[1] = destinatario;
chiaveCiclica[2] = payload[26];
chiaveCiclica[3] = codice[0];
chiaveCiclica[4] = codice[1];
chiaveCiclica[5] = codice[2];
chiaveCiclica[6] = aree[0];
var sommaChiaveCiclica = (
  chiaveCiclica[0] +
  chiaveCiclica[1] +
  chiaveCiclica[2] +
  chiaveCiclica[3] +
  chiaveCiclica[4] +
  chiaveCiclica[5] +
  chiaveCiclica[6]
)
  .toString(16)
  .slice(1, 3);
chiaveCiclica[7] = "0x" + sommaChiaveCiclica;
//payload 1D
var richiestaConfigurazioneInseritore = new Buffer(4);
richiestaConfigurazioneInseritore[0] = mittente;
richiestaConfigurazioneInseritore[1] = destinatario;
richiestaConfigurazioneInseritore[2] = payload[27];
var sommaRichiestaConfigurazioneInseritore = (
  richiestaConfigurazioneInseritore[0] +
  richiestaConfigurazioneInseritore[1] +
  richiestaConfigurazioneInseritore[2]
)
  .toString(16)
  .slice(1, 3);
richiestaConfigurazioneInseritore[3] =
  "0x" + sommaRichiestaConfigurazioneInseritore;
//payload 1E DA FINIRE
var aggiornamentoStringa = new Buffer(21);
aggiornamentoStringa[0] = mittente;
aggiornamentoStringa[1] = destinatario;
aggiornamentoStringa[2] = payload[28];
//payload 1F
var aggiornamentoData = new Buffer(14);
aggiornamentoData[0] = mittente;
aggiornamentoData[1] = destinatario;
aggiornamentoData[2] = payload[29];
aggiornamentoData[3] = codice[0];
aggiornamentoData[4] = codice[1];
aggiornamentoData[5] = codice[2];
aggiornamentoData[6] = giorni[0];
aggiornamentoData[7] = mesi[0];
aggiornamentoData[8] = anni[0];
aggiornamentoData[9] = ore[0];
aggiornamentoData[10] = minuti[0];
aggiornamentoData[11] = secondi[0];
aggiornamentoData[12] = settimana[0];
var sommaAggiornamentoData = (
  aggiornamentoData[0] +
  aggiornamentoData[1] +
  aggiornamentoData[2] +
  aggiornamentoData[3] +
  aggiornamentoData[4] +
  aggiornamentoData[5] +
  aggiornamentoData[6] +
  aggiornamentoData[7] +
  aggiornamentoData[8] +
  aggiornamentoData[9] +
  aggiornamentoData[10] +
  aggiornamentoData[11] +
  aggiornamentoData[12]
)
  .toString(16)
  .slice(1, 3);
aggiornamentoData[13] = "0x" + sommaAggiornamentoData;
function invia() {
  const arrivo = server.arrivo;
  console.log("in 1 arriva:", arrivo);
  if (arrivo.payload == 0x01) {
    function validaCodice() {
      var validitaCodice = new Buffer(7);
      validitaCodice[0] = mittente;
      validitaCodice[1] = destinatario;
      validitaCodice[2] = payload[0];
      validitaCodice[3] = "0x" + arrivo.pin.slice(0, 2);
      validitaCodice[4] = "0x" + arrivo.pin.slice(2, 4);
      if (!!arrivo.pin2.slice(4, 6)) {
        validitaCodice[5] = "0x" + arrivo.pin.slice(4, 6);
      } else {
        validitaCodice[5] = 0xff;
      }
      console.log(
        "validitaCodice",
        validitaCodice[3],
        validitaCodice[4],
        validitaCodice[5]
      );
      sommaValidita = (
        validitaCodice[0] +
        validitaCodice[1] +
        validitaCodice[2] +
        validitaCodice[3] +
        validitaCodice[4] +
        validitaCodice[5]
      ).toString(16);
      if (sommaValidita.length == 3) {
        sommaValidita = sommaValidita.slice(1, 3);
      }
      console.log("sommaValidita", sommaValidita);
      validitaCodice[6] = "0x" + sommaValidita;

      port.open(function (error) {
        console.log("CST port open");
        port.write(validitaCodice, function (err, result) {
          if (err) {
            console.log("Error while sending message : " + err);
          }
          if (result) {
            console.log("Response received after sending message : " + result);
          }
        });
      });
    }
    validaCodice();
    exports.validaCodice = validaCodice;
  }
  if (arrivo.payload == 0x02) {
    function trigConfigurazioneImpianto() {
      var configurazioneImpianto = new Buffer(4);
      configurazioneImpianto[0] = mittente;
      configurazioneImpianto[1] = destinatario;
      configurazioneImpianto[2] = payload[1];
      var sommaConfigurazione = (
        configurazioneImpianto[0] +
        configurazioneImpianto[1] +
        configurazioneImpianto[2]
      ).toString(16);
      if (sommaConfigurazione.length == 3) {
        sommaConfigurazione = sommaConfigurazione.slice(1, 3);
      }
      configurazioneImpianto[3] = "0x" + sommaConfigurazione;
      port.open(function (error) {
        console.log("CST port open");
        port.write(configurazioneImpianto, function (err, result) {
          console.log("sto scrivendo", configurazioneImpianto);
          if (err) {
            console.log("Error while sending message : " + err);
          }
          if (result) {
            console.log("Response received after sending message : " + result);
          }
        });
        codiceCorretto = a6.codiceCorretto;
        console.log("a6", codiceCorretto);
      });
    }
    trigConfigurazioneImpianto();
  }
}
function accendiZone() {
  var accensione = new Buffer(8);
  accensione[0] = mittente;
  accensione[1] = destinatario;
  accensione[2] = payload[2];
  accensione[3] = "0x";
  accensione[4] = "0x";
  accensione[6] = aree[4];
  var sommaAccensione = (
    accensione[0] +
    accensione[1] +
    accensione[2] +
    accensione[3] +
    accensione[4] +
    accensione[5] +
    accensione[6]
  ).toString(16);
  if (sommaAccensione.length == 3) {
    sommaAccensione = sommaAccensione.slice(1, 3);
  }
  accensione[7] = "0x" + sommaAccensione;
  port.open(function (error) {
    console.log("CST port open");
    port.write(accensione, function (err, result) {
      console.log("sto scrivendo", accensione);
      if (err) {
        console.log("Error while sending message : " + err);
      }
      if (result) {
        console.log("Response received after sending message : " + result);
      }
    });
    codiceCorretto = a6.codiceCorretto;
    console.log("a6", codiceCorretto);
  });
}
function includere() {
  var inclusione = new Buffer(8);
  inclusione[0] = mittente;
  inclusione[1] = destinatario;
  inclusione[2] = payload[3];
  inclusione[3] = "0x";
  inclusione[4] = "0x";
  inclusione[6] = aree[0];
  var sommaInclusione = (
    inclusione[0] +
    inclusione[1] +
    inclusione[2] +
    inclusione[3] +
    inclusione[4] +
    inclusione[5] +
    inclusione[6]
  ).toString(16);
  if (sommaInclusione.length == 3) {
    sommaInclusione = sommaInclusione.slice(1, 3);
  }
  inclusione[7] = "0x" + sommaInclusione;
  port.open(function (error) {
    console.log("CST port open");
    port.write(inclusione, function (err, result) {
      console.log("sto scrivendo", configurazioneImpianto);
      if (err) {
        console.log("Error while sending message : " + err);
      }
      if (result) {
        console.log("Response received after sending message : " + result);
      }
    });
    codiceCorretto = a6.codiceCorretto;
    console.log("a6", codiceCorretto);
  });
}
exports.invia = invia;
exports.accendiZone = accendiZone;
exports.includere = includere;
