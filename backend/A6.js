const portone = require("./port");
const port = portone.port;
const hexToDecimal = (hex) => parseInt(hex, 16);
const server = require("./server");
var esito = {};
var areeInserite = [];
var areeDisinserite = [];
var areeNonInserite = [];
var areeReset = [];
var motivazione = [];
var bufferino;
var zoneEscluse = [];
var zoneIncluse = [];
var arrayzonetamp = [];
//array dello stato delle zone
var arrayzone = [];
var arrayaree = [];
var arrayareeinserite = [];
var mancanzaRispostaEspansione = [];
var mancanzaRispostaEspansioneRadio = [];
var uscite = [];
var areeAperte = [];
var zoneAperte = [];
var zoneAllMem = [];
var dati = [];
//le zone sono in ordine, in tutto sono 64 per cui il vettore da 0 a 63
var arrayzoneinserite = [];
//zone in allarme da 0 a 63
var arrayzoneinallarme = [];
//aree in allarme
var arrayareeinallarme = [];
//aree in memoria allarme
var arrayareeinmemoriaallarme = [];
//zone in memoria
var arrayzoneinmemoria = [];
//Zone escluse
var arrayzoneescluse = [];
//Zone rapina
var arrayzonerapine = [];
//zone tamp ap
var arrayzonetampap = [];
//zone radio mr
var arrayzoneradiomr = [];
//zone radio mr
var arrayzoneradiobatt = [];
//telecom batt
var arraytelecombatt = [];
//aree reset
var arrayareereset = [];
//array zone allarme tamper
var arrayzoneallarmetamper = [];
//zone mr
var arrayzonemr = [];
// zone batteria scarica
var arrayzonebatt = [];
function hex2bin(hex) {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
}
function hex2asci(hexx) {
  var hex = hexx.toString(); //force conversion
  var str = "";
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}
function binToDec(num) {
  let dec = 0;
  for (let i = 0; i < num.length; i++) {
    if (num[num.length - (i + 1)] === "1") {
      dec += 2 ** i;
    }
  }
  return dec;
}
function binarioInArray(binario, destinazione) {
  let destinazioneIndex = 0;

  for (let i = binario.length - 1; i >= 0; i--) {
    destinazione[destinazioneIndex] = binario[i] === "1" ? 1 : 0;
    destinazioneIndex++;
  }
}
const result = [];

// function binarioInArray(binario, destinazione) {
//   for (let i = 0; i < binario.length; i++) {
//     destinazione[i] = binario[i] === "1" ? 1 : 0;
//   }
// }
function binarioInArray2(binario, destinazione) {
  let destinazioneIndex = 8;

  for (let i = binario.length - 1; i >= 0; i--) {
    destinazione[destinazioneIndex] = binario[i] === "1" ? 1 : 0;
    destinazioneIndex++;
  }
}
function binarioInArray3(binario, destinazione) {
  let destinazioneIndex = 16;

  for (let i = binario.length - 1; i >= 0; i--) {
    destinazione[destinazioneIndex] = binario[i] === "1" ? 1 : 0;
    destinazioneIndex++;
  }
}
function binarioInArray4(binario, destinazione) {
  let destinazioneIndex = 24;

  for (let i = binario.length - 1; i >= 0; i--) {
    destinazione[destinazioneIndex] = binario[i] === "1" ? 1 : 0;
    destinazioneIndex++;
  }
}
function binarioInArray5(binario, destinazione) {
  let destinazioneIndex = 32;

  for (let i = binario.length - 1; i >= 0; i--) {
    destinazione[destinazioneIndex] = binario[i] === "1" ? 1 : 0;
    destinazioneIndex++;
  }
}
function binarioInArray6(binario, destinazione) {
  let destinazioneIndex = 40;

  for (let i = binario.length - 1; i >= 0; i--) {
    destinazione[destinazioneIndex] = binario[i] === "1" ? 1 : 0;
    destinazioneIndex++;
  }
}
function binarioInArray7(binario, destinazione) {
  let destinazioneIndex = 48;

  for (let i = binario.length - 1; i >= 0; i--) {
    destinazione[destinazioneIndex] = binario[i] === "1" ? 1 : 0;
    destinazioneIndex++;
  }
}
function binarioInArray8(binario, destinazione) {
  let destinazioneIndex = 56;

  for (let i = binario.length - 1; i >= 0; i--) {
    destinazione[destinazioneIndex] = binario[i] === "1" ? 1 : 0;
    destinazioneIndex++;
  }
}
flagAggiornato = 0;
function entrata() {
  port.on("readable", function () {
    bufferino = port.read().toString("hex");
    console.log("letto:", bufferino);
    var mittente = bufferino.slice(0, 2);
    var destinatario = bufferino.slice(2, 4);
    var payload = bufferino.slice(4, 6);
    var lunghezzabuffer = bufferino.length;
    var checksum = bufferino.slice(lunghezzabuffer - 2, lunghezzabuffer);
    var bufferinodiviso = [];
    var a = 0;
    var i = 0;
    for (i = 0; i < lunghezzabuffer - 2; i++) {
      bufferinodiviso[a] = "0x" + bufferino.slice(i, i + 2);
      a++;
      i++;
      var bufferinodivisonumeri = bufferinodiviso.map(Number);
    }
    let somma = 0;
    bufferinodivisonumeri.forEach((item) => {
      somma += item;
    });
    let sommahex = somma.toString(16);
    var lunghezzasommahex = sommahex.length;
    sommahex = sommahex.slice(lunghezzasommahex - 2, lunghezzasommahex);
    if (sommahex == checksum) {
      console.log("mittente", mittente);
      if (mittente == "11") {
        if (destinatario == "ff") {
          if (payload == "26") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            const giorniSettimana = {
              Domenica: "Domenica",
              Lunedi: "Lunedi",
              Martedi: "Martedi",
              Mercoledi: "Mercoledi",
              Giovedi: "Giovedi",
              Venerdi: "Venerdi",
              Sabato: "Sabato",
            };
            switch (result[9]) {
              case "00":
                weekday = giorniSettimana.Domenica;
                break;
              case "01":
                weekday = giorniSettimana.Lunedi;
                break;
              case "02":
                weekday = giorniSettimana.Martedi;
                break;
              case "03":
                weekday = giorniSettimana.Mercoledi;
                break;
              case "04":
                weekday = giorniSettimana.Giovedi;
                break;
              case "05":
                weekday = giorniSettimana.Venerdi;
                break;
              case "06":
                weekday = giorniSettimana.Sabato;
                break;
            }
            function riempiAggiornamento(
              giorno,
              mese,
              anno,
              ora,
              minuti,
              secondi,
              weekday
            ) {
              return {
                giorno: giorno,
                mese: mese,
                anno: anno,
                ora: ora,
                minuti: minuti,
                secondi: secondi,
                weekday: weekday,
              };
            }
            let aggiornamentostato = riempiAggiornamento(
              result[3],
              result[4],
              result[5],
              result[6],
              result[7],
              result[8],
              weekday
            );
            console.log(aggiornamentostato);
            exports.aggiornamentostato = aggiornamentostato;
          }
          if (payload == "01") {
            var completo = bufferino.slice(6, 8);
            if (completo == "00") {
              const result = bufferino.match(/.{1,2}/g) ?? [];
              var stato1bin = hex2bin(result[4]);
              var stato2bin = hex2bin(result[5]);
              var stato3bin = hex2bin(result[6]);
              var stato4bin = hex2bin(result[7]);
              var stato5bin = hex2bin(result[8]);
              var colonna13bin = hex2bin(result[12]);
              var colonna14bin = hex2bin(result[13]);
              //15 e 16 0001 lasciare stare presenza negativo ecc
              var colonna15bin = hex2bin(result[14]);
              var colonna16bin = hex2bin(result[15]);
              var colonna17bin = hex2bin(result[16]);
              var colonna18bin = hex2bin(result[17]);
              var colonna19bin = hex2bin(result[18]);
              var colonna20bin = hex2bin(result[19]);
              var colonna21bin = hex2bin(result[20]);
              var colonna22bin = hex2bin(result[21]);
              var colonna23bin = hex2bin(result[22]);
              var colonna24bin = hex2bin(result[23]);
              var colonna25bin = hex2bin(result[24]);
              var colonna26bin = hex2bin(result[25]);
              var colonna27bin = hex2bin(result[26]);
              var colonna28bin = hex2bin(result[27]);
              var colonna29bin = hex2bin(result[28]);
              var colonna30bin = hex2bin(result[29]);
              var colonna31bin = hex2bin(result[30]);
              var colonna32bin = hex2bin(result[31]);
              var colonna33bin = hex2bin(result[32]);
              var colonna34bin = hex2bin(result[33]);
              var colonna35bin = hex2bin(result[34]);
              var colonna36bin = hex2bin(result[35]);
              var colonna37bin = hex2bin(result[36]);
              var colonna38bin = hex2bin(result[37]);
              var colonna39bin = hex2bin(result[38]);
              var colonna40bin = hex2bin(result[39]);
              var colonna41bin = hex2bin(result[40]);
              var colonna42bin = hex2bin(result[41]);
              var colonna43bin = hex2bin(result[42]);
              var colonna44bin = hex2bin(result[43]);
              var colonna45bin = hex2bin(result[44]);
              var colonna46bin = hex2bin(result[45]);
              var colonna47bin = hex2bin(result[46]);
              var colonna48bin = hex2bin(result[47]);
              var colonna49bin = hex2bin(result[48]);
              var colonna50bin = hex2bin(result[49]);
              var colonna51bin = hex2bin(result[50]);
              var colonna52bin = hex2bin(result[51]);
              var colonna53bin = hex2bin(result[52]);
              var colonna54bin = hex2bin(result[53]);
              var colonna55bin = hex2bin(result[54]);
              var colonna56bin = hex2bin(result[55]);
              var colonna57bin = hex2bin(result[56]);
              var colonna58bin = hex2bin(result[57]);
              var colonna59bin = hex2bin(result[58]);
              var colonna60bin = hex2bin(result[59]);
              var colonna61bin = hex2bin(result[60]);
              var colonna62bin = hex2bin(result[61]);
              var colonna63bin = hex2bin(result[62]);
              var colonna64bin = hex2bin(result[63]);
              var colonna65bin = hex2bin(result[64]);
              var colonna66bin = hex2bin(result[65]);
              var colonna67bin = hex2bin(result[66]);
              var colonna68bin = hex2bin(result[67]);
              var colonna69bin = hex2bin(result[68]);
              var colonna70bin = hex2bin(result[69]);
              var colonna71bin = hex2bin(result[70]);
              var colonna72bin = hex2bin(result[71]);
              var colonna73bin = hex2bin(result[72]);
              var colonna74bin = hex2bin(result[73]);
              var colonna75bin = hex2bin(result[74]);
              var colonna76bin = hex2bin(result[75]);
              var colonna77bin = hex2bin(result[76]);
              var colonna78bin = hex2bin(result[77]);
              var colonna79bin = hex2bin(result[78]);
              var colonna80bin = hex2bin(result[79]);
              var colonna81bin = hex2bin(result[80]);
              var colonna82bin = hex2bin(result[81]);
              var colonna83bin = hex2bin(result[82]);
              var colonna84bin = hex2bin(result[83]);
              var colonna85bin = hex2bin(result[84]);
              var colonna86bin = hex2bin(result[85]);
              var colonna87bin = hex2bin(result[86]);
              var colonna88bin = hex2bin(result[87]);
              var colonna89bin = hex2bin(result[88]);
              var colonna90bin = hex2bin(result[89]);
              var colonna91bin = hex2bin(result[90]);
              var colonna92bin = hex2bin(result[91]);
              var colonna93bin = hex2bin(result[92]);
              var colonna94bin = hex2bin(result[93]);
              var colonna95bin = hex2bin(result[94]);
              var colonna96bin = hex2bin(result[95]);
              var colonna97bin = hex2bin(result[96]);
              var risultato;
              switch (stato1bin) {
                case "10000000":
                  risultato = "tempo uscita 2";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "tempo ingresso 2";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "tempo uscita1";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "tempo ingresso1";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "codice install abilitato";
                  console.log(risultato);
                  c_inst_auth_on = true;
                  binarioInArray(colonna18bin, arrayzone);
                  break;
                case "00000100":
                  risultato = "centrale in test";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "centrale in blocco";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "centrale in programmazione";
                  console.log(risultato);
                  break;
              }
              switch (stato2bin) {
                case "00100000":
                  risultato = "guasto fusibile 4";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "guasto fusibile 3";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "guasto fusibile 2";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "guasto fusibile 1";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "batteria scarica";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "mancanza rete";
                  console.log(risultato);
                  break;
              }
              switch (stato3bin) {
                case "10000000":
                  risultato = "mancanza risposta comunicatore(temporanea)";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "preavviso inserimento";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "preallarme rapina";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "din-don zone";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "tamper centrale escluso";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "tamper centrale aperto";
                  console.log(risultato);
                  break;
              }
              switch (stato3bin.slice(3, 4)) {
                case "1":
                  console.log("timer abilitato");
                  break;
                case "0":
                  console.log("timer disabilitato");
                  break;
              }
              binarioInArray(stato4bin, mancanzaRispostaEspansione);
              binarioInArray(stato5bin, mancanzaRispostaEspansioneRadio);
              binarioInArray(colonna13bin, uscite);
              binarioInArray2(colonna14bin, uscite);
              binarioInArray(colonna17bin, areeAperte);
              binarioInArray(colonna18bin, zoneAperte);
              binarioInArray2(colonna19bin, zoneAperte);
              binarioInArray3(colonna20bin, zoneAperte);
              binarioInArray4(colonna21bin, zoneAperte);
              binarioInArray5(colonna22bin, zoneAperte);
              binarioInArray6(colonna23bin, zoneAperte);
              binarioInArray7(colonna24bin, zoneAperte);
              binarioInArray8(colonna25bin, zoneAperte);
              binarioInArray(colonna26bin, arrayareeinserite);
              binarioInArray(colonna27bin, arrayzoneinserite);
              binarioInArray2(colonna28bin, arrayzoneinserite);
              binarioInArray3(colonna29bin, arrayzoneinserite);
              binarioInArray4(colonna30bin, arrayzoneinserite);
              binarioInArray5(colonna31bin, arrayzoneinserite);
              binarioInArray6(colonna32bin, arrayzoneinserite);
              binarioInArray7(colonna33bin, arrayzoneinserite);
              binarioInArray8(colonna34bin, arrayzoneinserite);
              binarioInArray(colonna35bin, arrayareeinallarme);
              binarioInArray(colonna37bin, arrayzoneinallarme);
              binarioInArray2(colonna38bin, arrayzoneinallarme);
              binarioInArray3(colonna39bin, arrayzoneinallarme);
              binarioInArray4(colonna40bin, arrayzoneinallarme);
              binarioInArray5(colonna41bin, arrayzoneinallarme);
              binarioInArray6(colonna42bin, arrayzoneinallarme);
              binarioInArray7(colonna43bin, arrayzoneinallarme);
              binarioInArray8(colonna44bin, arrayzoneinallarme);
              binarioInArray(colonna45bin, arrayareeinmemoriaallarme);
              binarioInArray(colonna47bin, arrayzoneinmemoria);
              binarioInArray2(colonna48bin, arrayzoneinmemoria);
              binarioInArray3(colonna49bin, arrayzoneinmemoria);
              binarioInArray4(colonna50bin, arrayzoneinmemoria);
              binarioInArray5(colonna51bin, arrayzoneinmemoria);
              binarioInArray6(colonna52bin, arrayzoneinmemoria);
              binarioInArray7(colonna53bin, arrayzoneinmemoria);
              binarioInArray8(colonna54bin, arrayzoneinmemoria);
              binarioInArray(colonna55bin, arrayzoneescluse);
              binarioInArray2(colonna56bin, arrayzoneescluse);
              binarioInArray3(colonna57bin, arrayzoneescluse);
              binarioInArray4(colonna58bin, arrayzoneescluse);
              binarioInArray5(colonna59bin, arrayzoneescluse);
              binarioInArray6(colonna60bin, arrayzoneescluse);
              binarioInArray7(colonna61bin, arrayzoneescluse);
              binarioInArray8(colonna62bin, arrayzoneescluse);
              binarioInArray(colonna64bin, arrayzonerapine);
              binarioInArray2(colonna65bin, arrayzonerapine);
              binarioInArray3(colonna66bin, arrayzonerapine);
              binarioInArray4(colonna67bin, arrayzonerapine);
              binarioInArray5(colonna68bin, arrayzonerapine);
              binarioInArray6(colonna69bin, arrayzonerapine);
              binarioInArray7(colonna70bin, arrayzonerapine);
              binarioInArray8(colonna71bin, arrayzonerapine);
              binarioInArray(colonna72bin, arrayzonetampap);
              binarioInArray2(colonna73bin, arrayzonetampap);
              binarioInArray3(colonna74bin, arrayzonetampap);
              binarioInArray4(colonna75bin, arrayzonetampap);
              binarioInArray5(colonna76bin, arrayzonetampap);
              binarioInArray6(colonna77bin, arrayzonetampap);
              binarioInArray7(colonna78bin, arrayzonetampap);
              binarioInArray8(colonna79bin, arrayzonetampap);
              binarioInArray(colonna80bin, arrayzoneradiomr);
              binarioInArray2(colonna81bin, arrayzoneradiomr);
              binarioInArray3(colonna82bin, arrayzoneradiomr);
              binarioInArray4(colonna83bin, arrayzoneradiomr);
              binarioInArray5(colonna84bin, arrayzoneradiomr);
              binarioInArray6(colonna85bin, arrayzoneradiomr);
              binarioInArray7(colonna86bin, arrayzoneradiomr);
              binarioInArray8(colonna87bin, arrayzoneradiomr);
              binarioInArray(colonna88bin, arrayzoneradiobatt);
              binarioInArray2(colonna89bin, arrayzoneradiobatt);
              binarioInArray3(colonna90bin, arrayzoneradiobatt);
              binarioInArray4(colonna91bin, arrayzoneradiobatt);
              binarioInArray5(colonna92bin, arrayzoneradiobatt);
              binarioInArray6(colonna93bin, arrayzoneradiobatt);
              binarioInArray7(colonna94bin, arrayzoneradiobatt);
              binarioInArray8(colonna95bin, arrayzoneradiobatt);
              binarioInArray(colonna96bin, arraytelecombatt);
              binarioInArray2(colonna97bin, arraytelecombatt);
              console.log("zoneAperte lunghe:", zoneAperte.length);
              switch (colonna36bin) {
                case "01000000":
                  risultato =
                    "mancanza risposta su una o più espansioni ingresso"; //(bit 7 del byte 2 di p_com_all, se è 1 accendere anche tutte le aree presenti in aree_all_p_com) DA CAPIRE QUESTO
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = " mancanza risposta del comunicatore"; //(bit comunicatore di p_com_all, se è 1 accendere anche tutte le aree presenti in aree_all_p_com) DA CAPIRE QUESTO
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = " allarme per codici falsi"; // serv_t_sw_all, se è 1 accendere anche tutte le aree presenti in aree_all_serv_t_sw)DA CAPIRE QUESTO
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "allarme per spinotti falsi"; //(bit 7 del byte 14 di serv_t_sw_all, se è 1 accendere anche tutte le aree presenti in aree_all_serv_t_sw)
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "allarme tamper tastiera"; //(bit 7 del byte 10 di serv_tamp_all, se è 1 accendere anche tutte le aree presenti in aree_all_serv_tamp)DA CAPIRE QUESTO
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "allarme tamper centrale"; //(bit centrale di serv_tamp_all, se è 1 accendere anche tutte le aree presenti in aree_all_serv_tamp) DA CAPIRE QUESTO
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "allarme zone programmate H24"; //(se è 1 accendere tutte le aree presenti in aree_all_cont_sens)DA CAPIRE QUESTO
                  console.log(risultato);
                  break;
              }

              switch (colonna46bin) {
                case "01000000":
                  risultato =
                    "memoria mancanza risposta su una o più espansioni ingresso"; //DA CAPIRE (bit 7 del byte 2 di p_com_all_mem, se è 1 accendere anche tutte le aree presenti in aree_all_mem_p_com)
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "memoria mancanza risposta del comunicatore"; //da capire (bit comunicatore di p_com_all_mem, se è 1 accendere anche tutte le aree presenti in aree_all_mem_p_com)
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "memoria allarme per codici falsi"; // DA CAPIRE (bit 7 del byte 10 di serv_t_sw_all_mem, se è 1 accendere anche tutte le aree presenti in aree_all_mem_serv_ t_sw)
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "memoria allarme per spinotti falsi"; //DA CAPIRE (bit 7 del byte 14 di serv_t_sw_all_mem, se è 1 accendere anche tutte le aree presenti in aree_all_mem_serv_ t_sw)
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "memoria allarme tamper tastiera"; //DA CAPIRE QUESTO (bit 7 del byte 10 di serv_tamp_all_mem, se è 1 accendere anche tutte le aree presenti in aree_all_mem_serv_ tamp)
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "memoria allarme tamper centrale"; //DA CAPIRE QUESTO (bit centrale di serv_tamp_all_mem, se è 1 accendere anche tutte le aree presenti in aree_all_mem_serv_ tamp)
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "memoria allarme zone programmate H24"; //DA CAPIRE QUESTO (se è 1 accendere tutte le aree presenti in aree_all_mem_cont_ sens)
                  console.log(risultato);
                  break;
              }
              switch (colonna63bin) {
                case "00000100":
                  risultato = "allarme rapina dovuto a codice";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "allarme rapina al disinserimento";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "allarme rapina da zona programmata"; //DA CAPIREN (accendere o spegnere tutte le aree presenti in aree_rap)
                  console.log(risultato);
                  break;
              }
            }
            function riempiEsito(
              payload,
              uscite,
              areeAperte,
              zoneAperte,
              mancanzaRispostaEspansione,
              arrayaree,
              arrayareeinserite,
              arrayzoneinserite,
              arrayzoneinallarme,
              arrayareeinallarme,
              arrayareeinmemoriaallarme,
              arrayzoneinmemoria,
              arrayzoneescluse,
              arrayzonerapine,
              arrayzonetampap,
              arrayzoneradiomr,
              arrayzonetampap,
              arrayzoneradiobatt,
              arraytelecombatt,
              arrayzoneallarmetamper,
              arrayzonemr,
              arrayzonebatt
            ) {
              return {
                payload: payload,
                uscite: uscite,
                areeAperte: areeAperte,
                zoneAperte: zoneAperte,
                mancanzaRispostaEspansione: mancanzaRispostaEspansione,
                arrayaree: arrayaree,
                arrayareeinserite: arrayareeinserite,
                arrayzoneinserite: arrayzoneinserite,
                arrayzoneinallarme: arrayzoneinallarme,
                arrayareeinallarme: arrayareeinallarme,
                arrayareeinmemoriaallarme: arrayareeinmemoriaallarme,
                arrayzoneinmemoria: arrayzoneinmemoria,
                arrayzoneescluse: arrayzoneescluse,
                arrayzonerapine: arrayzonerapine,
                arrayzonetampap: arrayzonetampap,
                arrayzoneradiomr: arrayzoneradiomr,
                arrayzoneradiobatt: arrayzoneradiobatt,
                arraytelecombatt: arraytelecombatt,
                arrayzoneallarmetamper: arrayzoneallarmetamper,
                arrayzonemr: arrayzonemr,
                arrayzonebatt: arrayzonebatt,
              };
            }
            let esito = riempiEsito(
              payload,
              uscite,
              areeAperte,
              zoneAperte,
              mancanzaRispostaEspansione,
              arrayaree,
              arrayareeinserite,
              arrayzoneinserite,
              arrayzoneinallarme,
              arrayareeinallarme,
              arrayareeinmemoriaallarme,
              arrayzoneinmemoria,
              arrayzoneescluse,
              arrayzonerapine,
              arrayzonetampap,
              arrayzoneradiomr,
              arrayzonetampap,
              arrayzoneradiobatt,
              arraytelecombatt,
              arrayzoneallarmetamper,
              arrayzonemr,
              arrayzonebatt
            );
            exports.esito = esito;
            if (esito) {
              server.mandaEsito();
            }
          }
          if (payload == 02) {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna10bin = hex2bin(result[9]);
            var colonna11bin = hex2bin(result[10]);
            var colonna12bin = hex2bin(result[11]);
            var colonna13bin = hex2bin(result[12]);
            var colonna14bin = hex2bin(result[13]);
            var colonna15bin = hex2bin(result[14]);
            var colonna16bin = hex2bin(result[15]);
            var colonna17bin = hex2bin(result[16]);
            var colonna18bin = hex2bin(result[17]);
            var colonna19bin = hex2bin(result[18]);
            var colonna20bin = hex2bin(result[19]);
            var colonna21bin = hex2bin(result[20]);
            var colonna22bin = hex2bin(result[21]);
            var colonna23bin = hex2bin(result[22]);
            var colonna24bin = hex2bin(result[23]);
            var colonna25bin = hex2bin(result[24]);
            var colonna26bin = hex2bin(result[25]);
            var colonna27bin = hex2bin(result[26]);
            var colonna28bin = hex2bin(result[27]);
            var colonna29bin = hex2bin(result[28]);
            var colonna30bin = hex2bin(result[29]);
            var colonna31bin = hex2bin(result[30]);
            var colonna32bin = hex2bin(result[31]);
            var colonna33bin = hex2bin(result[32]);
            var colonna34bin = hex2bin(result[33]);
            var colonna35bin = hex2bin(result[34]);
            var colonna36bin = hex2bin(result[35]);
            var colonna37bin = hex2bin(result[36]);
            var colonna38bin = hex2bin(result[37]);
            var colonna39bin = hex2bin(result[38]);
            var colonna40bin = hex2bin(result[39]);
            var colonna41bin = hex2bin(result[40]);
            var colonna42bin = hex2bin(result[41]);
            var colonna43bin = hex2bin(result[42]);
            var colonna44bin = hex2bin(result[43]);
            var colonna45bin = hex2bin(result[44]);
            var colonna46bin = hex2bin(result[45]);
            var colonna47bin = hex2bin(result[46]);
            var colonna48bin = hex2bin(result[47]);
            var colonna49bin = hex2bin(result[48]);
            var colonna50bin = hex2bin(result[49]);
            var colonna51bin = hex2bin(result[50]);
            var colonna52bin = hex2bin(result[51]);
            var colonna53bin = hex2bin(result[52]);
            var colonna54bin = hex2bin(result[53]);
            var colonna55bin = hex2bin(result[54]);
            var risultato;
            var usciteAbilitate = [];
            var zoneAbilitate = [];
            var areeAbilitate = [];
            var zoneA = [];
            var zoneB = [];
            var zoneC = [];
            var zoneD = [];
            var usciteConFunzionamentoManuale = [];
            console.log("prima cifra versione fw", result[3]);
            console.log("seconda cifra versione fw", result[4]);
            console.log("prima cifra numero seriale della centrale", result[5]);
            console.log(
              "seconda cifra numero seriale della centrale",
              result[6]
            );
            console.log("terza cifra numero seriale della centrale", result[7]);
            console.log(
              "quarta cifra numero seriale della centrale",
              result[8]
            );
            binarioInArray(colonna14bin, areeAbilitate);
            binarioInArray(colonna12bin, usciteConFunzionamentoManuale);
            binarioInArray2(colonna13bin, usciteConFunzionamentoManuale);
            binarioInArray(colonna10bin, usciteAbilitate);
            binarioInArray2(colonna11bin, usciteAbilitate);
            binarioInArray(colonna16bin, zoneAbilitate);
            binarioInArray2(colonna21bin, zoneAbilitate);
            binarioInArray3(colonna26bin, zoneAbilitate);
            binarioInArray4(colonna31bin, zoneAbilitate);
            binarioInArray5(colonna36bin, zoneAbilitate);
            binarioInArray6(colonna41bin, zoneAbilitate);
            binarioInArray7(colonna46bin, zoneAbilitate);
            binarioInArray8(colonna51bin, zoneAbilitate);
            binarioInArray(colonna17bin, zoneA);
            binarioInArray2(colonna22bin, zoneA);
            binarioInArray3(colonna27bin, zoneA);
            binarioInArray4(colonna32bin, zoneA);
            binarioInArray5(colonna37bin, zoneA);
            binarioInArray6(colonna42bin, zoneA);
            binarioInArray7(colonna47bin, zoneA);
            binarioInArray8(colonna52bin, zoneA);
            binarioInArray(colonna18bin, zoneB);
            binarioInArray2(colonna23bin, zoneB);
            binarioInArray3(colonna28bin, zoneB);
            binarioInArray4(colonna33bin, zoneB);
            binarioInArray5(colonna38bin, zoneB);
            binarioInArray6(colonna43bin, zoneB);
            binarioInArray7(colonna48bin, zoneB);
            binarioInArray8(colonna53bin, zoneB);
            binarioInArray(colonna19bin, zoneC);
            binarioInArray2(colonna24bin, zoneC);
            binarioInArray3(colonna29bin, zoneC);
            binarioInArray4(colonna34bin, zoneC);
            binarioInArray5(colonna39bin, zoneC);
            binarioInArray6(colonna44bin, zoneC);
            binarioInArray7(colonna49bin, zoneC);
            binarioInArray8(colonna54bin, zoneC);
            binarioInArray(colonna20bin, zoneD);
            binarioInArray2(colonna25bin, zoneD);
            binarioInArray3(colonna30bin, zoneD);
            binarioInArray4(colonna35bin, zoneD);
            binarioInArray5(colonna40bin, zoneD);
            binarioInArray6(colonna45bin, zoneD);
            binarioInArray7(colonna50bin, zoneD);
            binarioInArray8(colonna55bin, zoneD);
            console.log("zoneAbilitate", zoneAbilitate);
            console.log("zoneA", zoneA);
            console.log("zoneB", zoneB);
            console.log("zoneD", zoneC);
            console.log("zoneD", zoneD);
            function riempiEsito(
              payload,
              usciteAbilitate,
              usciteConFunzionamentoManuale,
              zoneAbilitate,
              zoneA,
              zoneB,
              zoneC,
              zoneD
            ) {
              return {
                payload: payload,
                usciteAbilitate: usciteAbilitate,
                usciteConFunzionamentoManuale: usciteConFunzionamentoManuale,
                zoneAbilitate: zoneAbilitate,
                zoneA: zoneA,
                zoneB: zoneB,
                zoneC: zoneC,
                zoneD: zoneD,
              };
            }

            let esito = riempiEsito(
              payload,
              usciteAbilitate,
              usciteConFunzionamentoManuale,
              zoneAbilitate,
              zoneA,
              zoneB,
              zoneC,
              zoneD
            );

            exports.esito = esito;
            if (esito) {
              server.mandaEsito();
            }
          }
          if (payload == "04") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var tipoutente;
            var numeroutente;
            var risultato;
            console.log("non inserito perché aperto:", colonna6bin);
            console.log("ENTRA PAYLOAD GIUSTO");
            switch (colonna4bin) {
              case "0010":
                tipoutente = "codice";
              case "0100":
                tipoutente = "spinotto";
              case "0110":
                tipoutente = "comunicatore";
              case "1000":
                tipoutente = "chiave esterna";
            }
            numeroutente = colonna4bin.slice(4, 7);
            console.log("utente:", tipoutente, numeroutente);
            binarioInArray(colonna5bin, areeInserite);
            binarioInArray(colonna6bin, areeNonInserite);
            binarioInArray(colonna7bin, areeReset);

            switch (colonna8bin) {
              case "00000100":
                risultato = "reset rapina al disinserimento aree";
                console.log(risultato);
                motivazione = risultato;
                break;
              case "00000010":
                risultato = "reset rapina";
                console.log(risultato);
                motivazione = risultato;
                break;
              case "00000001":
                risultato = "reset sabotaggio";
                console.log(risultato);
                motivazione = risultato;
                break;
            }

            function riempiEsito(
              payload,
              areeInserite,
              areeNonInserite,
              areeReset,
              motivazione
            ) {
              return {
                payload: payload,
                areeInserite: areeInserite,
                areeNonInserite: areeNonInserite,
                areeReset: areeReset,
                motivazione: motivazione,
              };
            }
            let esito = riempiEsito(
              payload,
              areeInserite,
              areeNonInserite,
              areeReset,
              motivazione
            );
            exports.esito = esito;
            if (esito) {
              server.mandaEsito();
            }
          }
          if (payload == "05") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var tipoutente;
            var numeroutente;
            var risultato;
            console.log("non inserito perché aperto:", colonna6bin);
            console.log("ENTRA PAYLOAD GIUSTO");
            switch (colonna4bin.slice(0, 3)) {
              case "0010":
                tipoutente = "codice";
              case "0100":
                tipoutente = "spinotto";
              case "0110":
                tipoutente = "comunicatore";
              case "1000":
                tipoutente = "chiave esterna";
            }
            numeroutente = colonna4bin.slice(4, 7);
            console.log("utente:", tipoutente, numeroutente);
            binarioInArray(colonna5bin, areeDisinserite);
            binarioInArray(colonna6bin, areeReset);
            switch (colonna8bin) {
              case "00000100":
                risultato = "reset rapina al disinserimento aree";
                console.log(risultato);
                motivazione = risultato;
                break;
              case "00000010":
                risultato = "reset rapina";
                console.log(risultato);
                motivazione = risultato;
                break;
              case "00000001":
                risultato = "reset sabotaggio";
                console.log(risultato);
                motivazione = risultato;
                break;
            }
            function riempiEsito(
              payload,
              areeDisinserite,
              areeReset,
              motivazione
            ) {
              return {
                payload: payload,
                areeDisinserite: areeDisinserite,
                areeReset: areeReset,
                motivazione: motivazione,
              };
            }
            let esito = riempiEsito(
              payload,
              areeDisinserite,
              areeReset,
              motivazione
            );
            exports.esito = esito;
            if (esito) {
              server.mandaEsito();
            }
          }
          if (payload == "06") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var colonna9bin = hex2bin(result[8]);
            var colonna10bin = hex2bin(result[9]);
            var colonna11bin = hex2bin(result[10]);
            binarioInArray(colonna4bin, zoneAllMem);
            binarioInArray2(colonna5bin, zoneAllMem);
            binarioInArray3(colonna6bin, zoneAllMem);
            binarioInArray4(colonna7bin, zoneAllMem);
            binarioInArray5(colonna8bin, zoneAllMem);
            binarioInArray6(colonna9bin, zoneAllMem);
            binarioInArray7(colonna10bin, zoneAllMem);
            binarioInArray8(colonna11bin, zoneAllMem);
          }
          if (payload == "08") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var colonna9bin = hex2bin(result[8]);
            var colonna10bin = hex2bin(result[9]);
            var colonna11bin = hex2bin(result[10]);
            var colonna12bin = hex2bin(result[11]);
            var tipoutente;
            var numeroutente;
            var risultato;
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 4)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 8);
              console.log("utente:", tipoutente, numeroutente);
            }
            binarioInArray(colonna5bin, zoneEscluse);
            binarioInArray2(colonna6bin, zoneEscluse);
            binarioInArray3(colonna7bin, zoneEscluse);
            binarioInArray4(colonna8bin, zoneEscluse);
            binarioInArray5(colonna9bin, zoneEscluse);
            binarioInArray6(colonna10bin, zoneEscluse);
            binarioInArray7(colonna11bin, zoneEscluse);
            binarioInArray8(colonna12bin, zoneEscluse);
          }
          if (payload == "09") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var colonna9bin = hex2bin(result[8]);
            var colonna10bin = hex2bin(result[9]);
            var colonna11bin = hex2bin(result[10]);
            var colonna12bin = hex2bin(result[11]);
            var tipoutente;
            var numeroutente;
            var risultato;
            switch (colonna4bin.slice(0, 3)) {
              case "0010":
                tipoutente = "codice";
              case "0100":
                tipoutente = "spinotto";
              case "0110":
                tipoutente = "comunicatore";
              case "1000":
                tipoutente = "chiave esterna";
            }
            numeroutente = colonna4bin.slice(4, 7);
            console.log("utente:", tipoutente, numeroutente);

            binarioInArray(colonna5bin, zoneIncluse);
            binarioInArray2(colonna6bin, zoneIncluse);
            binarioInArray3(colonna7bin, zoneIncluse);
            binarioInArray4(colonna8bin, zoneIncluse);
            binarioInArray5(colonna9bin, zoneIncluse);
            binarioInArray6(colonna10bin, zoneIncluse);
            binarioInArray7(colonna11bin, zoneIncluse);
            binarioInArray8(colonna12bin, zoneIncluse);
          }
          if (payload == "0A") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var colonna9bin = hex2bin(result[8]);
            var colonna10bin = hex2bin(result[9]);
            var colonna11bin = hex2bin(result[10]);
            binarioInArray(colonna4bin, arrayzonerapine);
            binarioInArray2(colonna5bin, arrayzonerapine);
            binarioInArray3(colonna6bin, arrayzonerapine);
            binarioInArray4(colonna7bin, arrayzonerapine);
            binarioInArray5(colonna8bin, arrayzonerapine);
            binarioInArray6(colonna9bin, arrayzonerapine);
            binarioInArray7(colonna10bin, arrayzonerapine);
            binarioInArray8(colonna11bin, arrayzonerapine);
          }
          if (payload == "0B") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var colonna9bin = hex2bin(result[8]);
            var colonna10bin = hex2bin(result[9]);
            var colonna11bin = hex2bin(result[10]);
            binarioInArray(colonna4bin, arrayzonetamp);
            binarioInArray2(colonna5bin, arrayzonetamp);
            binarioInArray3(colonna6bin, arrayzonetamp);
            binarioInArray4(colonna7bin, arrayzonetamp);
            binarioInArray5(colonna8bin, arrayzonetamp);
            binarioInArray6(colonna9bin, arrayzonetamp);
            binarioInArray7(colonna10bin, arrayzonetamp);
            binarioInArray8(colonna11bin, arrayzonetamp);
          }
          if (payload == "0C") {
            risultato = "notifica cancellazione memoria allarme";
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "0D") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            binarioInArray(colonna5bin, arrayareereset);
            if (colonna6 != "06") {
              switch (colonna6bin) {
                case "00000100":
                  risultato = "reset rapina al disinserimento aree";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "reset rapina";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "reset sabotaggio";
                  console.log(risultato);
                  break;
              }
            }
          }
          if (payload == "0E") {
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            var colonna5 = bufferino.slice(8, 10);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
              var uscita = colonna5;
              console.log("uscita:", uscita);
            }
          }
          if (payload == "0F") {
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            var colonna5 = bufferino.slice(8, 10);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
              var uscita = colonna5;
              console.log("uscita:", uscita);
            }
          }
          if (payload == "10") {
            risultato = "allarme tamper centrale";
            console.log(risultato);
          }
          if (payload == "11") {
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              risultato = colonna4;
              console.log("risultato:", risultato);
            }
          }
          if (payload == "12") {
            risultato = "allarme codici falsi su tastiere";
            console.log(risultato);
          }
          if (payload == "13") {
            risultato = "allarme spinotti falsi";
            console.log(risultato);
          }
          if (payload == "14") {
            risultato = "allarme mancata risposta comunicatore";
            console.log(risultato);
          }
          if (payload == "15") {
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              risultato = colonna4;
              console.log("id espansione in allarme:", risultato);
            }
          }
          if (payload == "16") {
            risultato = "fine guasto mancanza rete";
            console.log(risultato);
          }
          if (payload == "17") {
            risultato = "guasto mancanza rete";
            console.log(risultato);
          }
          if (payload == "18") {
            risultato = "guasto batteria scarica";
            console.log(risultato);
          }
          if (payload == "19") {
            //DA CAPIRE
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              risultato = colonna4;
              console.log("risultato:", risultato);
            }
          }
          if (payload == "20") {
            risultato = "notifica di inizio programmazione";
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "21") {
            risultato = "notifica di fine programmazione";
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "22") {
            risultato = "notifica di inizio blocco centrale";
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "23") {
            risultato = "notifica di fine blocco centrale";
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "24") {
            risultato = "notifica di inizio blocco sirene";
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "25") {
            risultato = "notifica di fine blocco sirene";
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "1A") {
            //QUESTO DA CAPIRE MEGLIO, ultimi 4 bit relativi al valore(?)
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              risultato = colonna4;
              console.log("risultato:", risultato);
            }
          }
          if (payload == "1B") {
            risultato = "riavvio centrale";
            console.log(risultato);
          }
          if (payload == "1C") {
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            risultato = colonna4;
            console.log(
              "aggiunta memoria mancanza risposta espansione id:",
              risultato
            );
          }
          if (payload == "1D") {
            risultato = "aggiunta memoria mancanza risposta comunicatore";
            console.log(risultato);
          }
          if (payload == "1E") {
            risultato = "rapina immediata da codice";
            console.log(risultato);
          }
          if (payload == "1F") {
            risultato = "notifica di rapina";
            console.log(risultato);
          }
          if (payload == "20") {
            //DA CAPIRE UTENTE
            console.log("inizio programmazione");
          }
          if (payload == "21") {
            //DA CAPIRE UTENTE
            console.log("notifica di fine programmazione");
          }
          if (payload == "22") {
            risultato = "inizio blocco centrale";
            console.log(risultato);
          }
          if (payload == "23") {
            risultato = "fine blocco centrale";
            console.log(risultato);
          }
          if (payload == "24") {
            risultato = "inizio blocco sirene";
            console.log(risultato);
          }
          if (payload == "25") {
            riusltato = "fine blocco sirene";
            console.log(risultato);
          }
          if (payload == "28") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var secondiBlocco = [];
            var giornoBlocco = [];
            var meseBlocco = [];
            var annoBlocco = [];
            var oreBlocco = [];
            var minutiBlocco = [];
            var blocchetto = [];
            var payloadBlocco;
            var evento;
            var sestaColonna;
            var riferimento;
            //blocco alla quale la centrale è arrivata
            var blocco = result[3];
            //primo blocco
            dato1 = hex2bin(result[4]);
            dato2 = hex2bin(result[5]);
            dato3 = hex2bin(result[6]);
            dato4 = hex2bin(result[7]);
            dato5 = hex2bin(result[8]);
            dato6 = hex2bin(result[9]);
            dato7 = result[10];
            dato8 = hex2bin(result[11]);
            //secondo blocco
            dato9 = hex2bin(result[4]);
            dato10 = hex2bin(result[5]);
            dato11 = hex2bin(result[6]);
            dato12 = hex2bin(result[7]);
            dato13 = hex2bin(result[8]);
            dato14 = hex2bin(result[9]);
            dato15 = result[10];
            dato16 = hex2bin(result[11]);
            //terzo blocco
            dato17 = hex2bin(result[12]);
            dato18 = hex2bin(result[13]);
            dato19 = hex2bin(result[14]);
            dato20 = hex2bin(result[15]);
            dato21 = hex2bin(result[16]);
            dato22 = hex2bin(result[17]);
            dato23 = result[18];
            dato24 = hex2bin(result[19]);
            //quarto blocco
            dato25 = hex2bin(result[20]);
            dato26 = hex2bin(result[21]);
            dato27 = hex2bin(result[22]);
            dato28 = hex2bin(result[23]);
            dato29 = hex2bin(result[24]);
            dato30 = hex2bin(result[25]);
            dato31 = result[27];
            dato32 = hex2bin(result[27]);
            //quinto blocco
            dato33 = hex2bin(result[28]);
            dato34 = hex2bin(result[29]);
            dato35 = hex2bin(result[30]);
            dato36 = hex2bin(result[31]);
            dato37 = hex2bin(result[32]);
            dato38 = hex2bin(result[33]);
            dato39 = result[34];
            dato40 = hex2bin(result[35]);
            // sesto blocco
            dato41 = hex2bin(result[36]);
            dato42 = hex2bin(result[37]);
            dato43 = hex2bin(result[38]);
            dato44 = hex2bin(result[39]);
            dato45 = hex2bin(result[40]);
            dato46 = hex2bin(result[41]);
            dato47 = result[42];
            dato48 = hex2bin(result[43]);
            // settimo blocco
            dato49 = hex2bin(result[44]);
            dato50 = hex2bin(result[45]);
            dato51 = hex2bin(result[46]);
            dato52 = hex2bin(result[47]);
            dato53 = hex2bin(result[48]);
            dato54 = hex2bin(result[49]);
            dato55 = result[50];
            dato56 = hex2bin(result[51]);
            // ottavo blocco

            function convertiDati(
              dato1,
              dato2,
              dato3,
              dato4,
              dato5,
              dato6,
              dato7,
              dato8
            ) {
              function binToDec(binary) {
                return parseInt(binary, 2);
              }

              function estraiDati(dato, start, end) {
                return binToDec(dato.slice(start, end));
              }

              giornoBlocco = estraiDati(dato1, 3, 8);
              meseBlocco = estraiDati(dato2, 3, 8);
              annoBlocco = 2000 + binToDec(dato3);
              oreBlocco = binToDec(dato4);
              minutiBlocco = binToDec(dato5);
              switch (dato7) {
                case "00":
                  evento = "Allarme zona";
                  riferimento = binToDec(dato8);
                  break;
                case "01":
                  evento = "Inserimento aree";
                  riferimento = estraiDati(hex2bin(dato8), 4, 8);
                  break;
                case "02":
                  evento = "Disinserimento aree";
                  riferimento = estraiDati(hex2bin(dato8), 4, 8);
                  break;
                case "03":
                  evento = "Inclusione linee";
                  riferimento = binToDec(dato8);
                  break;
                case "04":
                  evento = "Esclusione linee";
                  riferimento = binToDec(dato8);
                  break;
                case "05":
                  evento = "Reset allarme";
                  riferimento = estraiDati(hex2bin(dato8), 4, 8);
                  break;
                case "06":
                  evento = "Aggiunta memoria allarme zona";
                  riferimento = binToDec(dato8);
                  break;
                case "07":
                  evento = "Allarme zona programmata come H24";
                  riferimento = binToDec(dato8);
                  break;
                case "08":
                  evento = "Rapina immediata zona";
                  riferimento = binToDec(dato8);
                  break;
                case "09":
                  switch (dato8) {
                    case "00":
                      evento = "Allarme sabotaggio per codici falsi";
                      break;
                    case "01":
                      evento = "Allarme sabotaggio per spinotti falsi";
                      break;
                    case "02":
                      evento = "Allarme mancanza risposta espansione ingressi";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
              }
              return {
                giornoBlocco,
                meseBlocco,
                annoBlocco,
                oreBlocco,
                minutiBlocco,
                evento,
                sestaColonna,
                riferimento,
              };
            }

            blocchetto[0] = convertiDati(
              dato1,
              dato2,
              dato3,
              dato4,
              dato5,
              dato6,
              dato7,
              dato8
            );
            blocchetto[1] = convertiDati(
              dato9,
              dato10,
              dato11,
              dato12,
              dato13,
              dato14,
              dato15,
              dato16
            );
            blocchetto[2] = convertiDati(
              dato17,
              dato18,
              dato19,
              dato20,
              dato21,
              dato22,
              dato23,
              dato24
            );
            blocchetto[3] = convertiDati(
              dato25,
              dato26,
              dato27,
              dato28,
              dato29,
              dato30,
              dato31,
              dato32
            );
            blocchetto[4] = convertiDati(
              dato33,
              dato34,
              dato35,
              dato37,
              dato38,
              dato39,
              dato40,
              dato41
            );
            console.log("blocchetto:", blocchetto);
          }
          if (payload == "29") {
            risultato = "alimentazione centrale bassa (<9V)";
            console.log(risultato);
          }
          if (payload == "2A") {
            risultato = "esclusione linea tamper centrale";
            console.log(risultato);
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "2B") {
            risultato = "reinculusione linea tamper centrale";
            console.log(risultato);
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "2C") {
            risultato = "aggiunta memoria allarme tamper centrale";
            console.log(risultato);
          }
          if (payload == "2D") {
            risultato = "aggiunta memoria allarme tamper tastiera";
            console.log(risultato);
          }
          if (payload == "2E") {
            risultato = "errori RS485";
            console.log(risultato);
            //DA CAPIRE COLONNA 4
          }
          if (payload == "2F") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            switch (result[3]) {
              case "00":
                //dato 1 era 8,10
                var nomesms =
                  hex2asci(result[4]) +
                  hex2asci(result[5]) +
                  hex2asci(result[6]) +
                  hex2asci(result[7]) +
                  hex2asci(result[8]) +
                  hex2asci(result[9]) +
                  hex2asci(result[10]) +
                  hex2asci(result[11]) +
                  hex2asci(result[12]) +
                  hex2asci(result[13]) +
                  hex2asci(result[14]) +
                  hex2asci(result[15]) +
                  hex2asci(result[16]) +
                  hex2asci(result[17]) +
                  hex2asci(result[18]) +
                  hex2asci(result[19]);
                var nomecentrale =
                  hex2asci(result[20]) +
                  hex2asci(result[21]) +
                  hex2asci(result[22]) +
                  hex2asci(result[23]) +
                  hex2asci(result[24]) +
                  hex2asci(result[25]) +
                  hex2asci(result[26]) +
                  hex2asci(result[27]) +
                  hex2asci(result[28]) +
                  hex2asci(result[29]) +
                  hex2asci(result[30]) +
                  hex2asci(result[31]) +
                  hex2asci(result[32]) +
                  hex2asci(result[33]) +
                  hex2asci(result[34]) +
                  hex2asci(result[35]);
                console.log("nomesms:", nomesms);
                console.log("nomesms:", nomecentrale);
                break;
              case "01":
                var nomeAreaA =
                  hex2asci(result[4]) +
                  hex2asci(result[5]) +
                  hex2asci(result[6]) +
                  hex2asci(result[7]) +
                  hex2asci(result[8]) +
                  hex2asci(result[9]) +
                  hex2asci(result[10]) +
                  hex2asci(result[11]) +
                  hex2asci(result[12]) +
                  hex2asci(result[13]) +
                  hex2asci(result[14]) +
                  hex2asci(result[15]) +
                  hex2asci(result[16]) +
                  hex2asci(result[17]) +
                  hex2asci(result[18]) +
                  hex2asci(result[19]);
                var nomeAreaB =
                  hex2asci(result[20]) +
                  hex2asci(result[21]) +
                  hex2asci(result[22]) +
                  hex2asci(result[23]) +
                  hex2asci(result[24]) +
                  hex2asci(result[25]) +
                  hex2asci(result[26]) +
                  hex2asci(result[27]) +
                  hex2asci(result[28]) +
                  hex2asci(result[29]) +
                  hex2asci(result[30]) +
                  hex2asci(result[31]) +
                  hex2asci(result[32]) +
                  hex2asci(result[33]) +
                  hex2asci(result[34]) +
                  hex2asci(result[35]);
                var nomeAreaC =
                  hex2asci(result[36]) +
                  hex2asci(result[37]) +
                  hex2asci(result[38]) +
                  hex2asci(result[39]) +
                  hex2asci(result[40]) +
                  hex2asci(result[41]) +
                  hex2asci(result[42]) +
                  hex2asci(result[43]) +
                  hex2asci(result[44]) +
                  hex2asci(result[45]) +
                  hex2asci(result[46]) +
                  hex2asci(result[47]) +
                  hex2asci(result[48]) +
                  hex2asci(result[49]) +
                  hex2asci(result[50]) +
                  hex2asci(result[51]);
                var nomeAreaD =
                  hex2asci(result[52]) +
                  hex2asci(result[53]) +
                  hex2asci(result[54]) +
                  hex2asci(result[55]) +
                  hex2asci(result[56]) +
                  hex2asci(result[57]) +
                  hex2asci(result[58]) +
                  hex2asci(result[59]) +
                  hex2asci(result[60]) +
                  hex2asci(result[61]) +
                  hex2asci(result[62]) +
                  hex2asci(result[63]) +
                  hex2asci(result[64]) +
                  hex2asci(result[65]) +
                  hex2asci(result[66]) +
                  hex2asci(result[67]);
                console.log("nomeAreaA:", nomeAreaA);
                console.log("nomeAreaB:", nomeAreaB);
                console.log("nomeAreaC:", nomeAreaC);
                console.log("nomeAreaD:", nomeAreaD);
                break;
              case "02":
                var nomeUtenteTastiera1 =
                  hex2asci(result[4]) +
                  hex2asci(result[5]) +
                  hex2asci(result[6]) +
                  hex2asci(result[7]) +
                  hex2asci(result[8]) +
                  hex2asci(result[9]) +
                  hex2asci(result[10]) +
                  hex2asci(result[11]) +
                  hex2asci(result[12]) +
                  hex2asci(result[13]) +
                  hex2asci(result[14]) +
                  hex2asci(result[15]) +
                  hex2asci(result[16]) +
                  hex2asci(result[17]) +
                  hex2asci(result[18]) +
                  hex2asci(result[19]);
                var nomeUtenteTastiera2 =
                  hex2asci(result[20]) +
                  hex2asci(result[21]) +
                  hex2asci(result[22]) +
                  hex2asci(result[23]) +
                  hex2asci(result[24]) +
                  hex2asci(result[25]) +
                  hex2asci(result[26]) +
                  hex2asci(result[27]) +
                  hex2asci(result[28]) +
                  hex2asci(result[29]) +
                  hex2asci(result[30]) +
                  hex2asci(result[31]) +
                  hex2asci(result[32]) +
                  hex2asci(result[33]) +
                  hex2asci(result[34]) +
                  hex2asci(result[35]);
                var nomeUtenteTastiera3 =
                  hex2asci(result[36]) +
                  hex2asci(result[37]) +
                  hex2asci(result[38]) +
                  hex2asci(result[39]) +
                  hex2asci(result[40]) +
                  hex2asci(result[41]) +
                  hex2asci(result[42]) +
                  hex2asci(result[43]) +
                  hex2asci(result[44]) +
                  hex2asci(result[45]) +
                  hex2asci(result[46]) +
                  hex2asci(result[47]) +
                  hex2asci(result[48]) +
                  hex2asci(result[49]) +
                  hex2asci(result[50]) +
                  hex2asci(result[51]);
                var nomeUtenteTastiera4 =
                  hex2asci(result[52]) +
                  hex2asci(result[53]) +
                  hex2asci(result[54]) +
                  hex2asci(result[55]) +
                  hex2asci(result[56]) +
                  hex2asci(result[57]) +
                  hex2asci(result[58]) +
                  hex2asci(result[59]) +
                  hex2asci(result[60]) +
                  hex2asci(result[61]) +
                  hex2asci(result[62]) +
                  hex2asci(result[63]) +
                  hex2asci(result[64]) +
                  hex2asci(result[65]) +
                  hex2asci(result[66]) +
                  hex2asci(result[67]);
                var nomeUtenteTastiera5 =
                  hex2asci(result[68]) +
                  hex2asci(result[69]) +
                  hex2asci(result[70]) +
                  hex2asci(result[71]) +
                  hex2asci(result[72]) +
                  hex2asci(result[73]) +
                  hex2asci(result[74]) +
                  hex2asci(result[75]) +
                  hex2asci(result[76]) +
                  hex2asci(result[77]) +
                  hex2asci(result[78]) +
                  hex2asci(result[79]) +
                  hex2asci(result[80]) +
                  hex2asci(result[81]) +
                  hex2asci(result[82]) +
                  hex2asci(result[83]);
                var nomeUtenteTastiera6 =
                  hex2asci(result[84]) +
                  hex2asci(result[85]) +
                  hex2asci(result[86]) +
                  hex2asci(result[87]) +
                  hex2asci(result[88]) +
                  hex2asci(result[89]) +
                  hex2asci(result[90]) +
                  hex2asci(result[91]) +
                  hex2asci(result[92]) +
                  hex2asci(result[93]) +
                  hex2asci(result[94]) +
                  hex2asci(result[95]) +
                  hex2asci(result[96]) +
                  hex2asci(result[97]) +
                  hex2asci(result[98]) +
                  hex2asci(result[99]);
                var nomeUtenteTastiera7 =
                  hex2asci(result[100]) +
                  hex2asci(result[101]) +
                  hex2asci(result[102]) +
                  hex2asci(result[103]) +
                  hex2asci(result[104]) +
                  hex2asci(result[105]) +
                  hex2asci(result[106]) +
                  hex2asci(result[107]) +
                  hex2asci(result[108]) +
                  hex2asci(result[109]) +
                  hex2asci(result[110]) +
                  hex2asci(result[111]) +
                  hex2asci(result[112]) +
                  hex2asci(result[113]) +
                  hex2asci(result[114]) +
                  hex2asci(result[115]);
                var nomeUtenteTastiera8 =
                  hex2asci(result[116]) +
                  hex2asci(result[117]) +
                  hex2asci(result[118]) +
                  hex2asci(result[119]) +
                  hex2asci(result[120]) +
                  hex2asci(result[121]) +
                  hex2asci(result[122]) +
                  hex2asci(result[123]) +
                  hex2asci(result[124]) +
                  hex2asci(result[125]) +
                  hex2asci(result[126]) +
                  hex2asci(result[127]) +
                  hex2asci(result[128]) +
                  hex2asci(result[129]) +
                  hex2asci(result[130]) +
                  hex2asci(result[131]);
                console.log("nomeUtenteTastiera1", nomeUtenteTastiera1);
                console.log("nomeUtenteTastiera2", nomeUtenteTastiera2);
                console.log("nomeUtenteTastiera3", nomeUtenteTastiera3);
                console.log("nomeUtenteTastiera4", nomeUtenteTastiera4);
                console.log("nomeUtenteTastiera5", nomeUtenteTastiera5);
                console.log("nomeUtenteTastiera6", nomeUtenteTastiera6);
                console.log("nomeUtenteTastiera7", nomeUtenteTastiera7);
                console.log("nomeUtenteTastiera8", nomeUtenteTastiera8);
                break;
              case "03":
                var nomeUtenteTastiera9 =
                  hex2asci(result[4]) +
                  hex2asci(result[5]) +
                  hex2asci(result[6]) +
                  hex2asci(result[7]) +
                  hex2asci(result[8]) +
                  hex2asci(result[9]) +
                  hex2asci(result[10]) +
                  hex2asci(result[11]) +
                  hex2asci(result[12]) +
                  hex2asci(result[13]) +
                  hex2asci(result[14]) +
                  hex2asci(result[15]) +
                  hex2asci(result[16]) +
                  hex2asci(result[17]) +
                  hex2asci(result[18]) +
                  hex2asci(result[19]);
                var nomeUtenteTastiera10 =
                  hex2asci(result[20]) +
                  hex2asci(result[21]) +
                  hex2asci(result[22]) +
                  hex2asci(result[23]) +
                  hex2asci(result[24]) +
                  hex2asci(result[25]) +
                  hex2asci(result[26]) +
                  hex2asci(result[27]) +
                  hex2asci(result[28]) +
                  hex2asci(result[29]) +
                  hex2asci(result[30]) +
                  hex2asci(result[31]) +
                  hex2asci(result[32]) +
                  hex2asci(result[33]) +
                  hex2asci(result[34]) +
                  hex2asci(result[35]);
                var nomeUtenteTastiera11 =
                  hex2asci(result[36]) +
                  hex2asci(result[37]) +
                  hex2asci(result[38]) +
                  hex2asci(result[39]) +
                  hex2asci(result[40]) +
                  hex2asci(result[41]) +
                  hex2asci(result[42]) +
                  hex2asci(result[43]) +
                  hex2asci(result[44]) +
                  hex2asci(result[45]) +
                  hex2asci(result[46]) +
                  hex2asci(result[47]) +
                  hex2asci(result[48]) +
                  hex2asci(result[49]) +
                  hex2asci(result[50]) +
                  hex2asci(result[51]);
                var nomeUtenteTastiera12 =
                  hex2asci(result[52]) +
                  hex2asci(result[53]) +
                  hex2asci(result[54]) +
                  hex2asci(result[55]) +
                  hex2asci(result[56]) +
                  hex2asci(result[57]) +
                  hex2asci(result[58]) +
                  hex2asci(result[59]) +
                  hex2asci(result[60]) +
                  hex2asci(result[61]) +
                  hex2asci(result[62]) +
                  hex2asci(result[63]) +
                  hex2asci(result[64]) +
                  hex2asci(result[65]) +
                  hex2asci(result[66]) +
                  hex2asci(result[67]);
                var nomeUtenteTastiera13 =
                  hex2asci(result[68]) +
                  hex2asci(result[69]) +
                  hex2asci(result[70]) +
                  hex2asci(result[71]) +
                  hex2asci(result[72]) +
                  hex2asci(result[73]) +
                  hex2asci(result[74]) +
                  hex2asci(result[75]) +
                  hex2asci(result[76]) +
                  hex2asci(result[77]) +
                  hex2asci(result[78]) +
                  hex2asci(result[79]) +
                  hex2asci(result[80]) +
                  hex2asci(result[81]) +
                  hex2asci(result[82]) +
                  hex2asci(result[83]);
                var nomeUtenteTastiera14 =
                  hex2asci(result[84]) +
                  hex2asci(result[85]) +
                  hex2asci(result[86]) +
                  hex2asci(result[87]) +
                  hex2asci(result[88]) +
                  hex2asci(result[89]) +
                  hex2asci(result[90]) +
                  hex2asci(result[91]) +
                  hex2asci(result[92]) +
                  hex2asci(result[93]) +
                  hex2asci(result[94]) +
                  hex2asci(result[95]) +
                  hex2asci(result[96]) +
                  hex2asci(result[97]) +
                  hex2asci(result[98]) +
                  hex2asci(result[99]);
                var nomeUtenteTastiera15 =
                  hex2asci(result[100]) +
                  hex2asci(result[101]) +
                  hex2asci(result[102]) +
                  hex2asci(result[103]) +
                  hex2asci(result[104]) +
                  hex2asci(result[105]) +
                  hex2asci(result[106]) +
                  hex2asci(result[107]) +
                  hex2asci(result[108]) +
                  hex2asci(result[109]) +
                  hex2asci(result[110]) +
                  hex2asci(result[111]) +
                  hex2asci(result[112]) +
                  hex2asci(result[113]) +
                  hex2asci(result[114]) +
                  hex2asci(result[115]);
                var nomeUtenteTastiera16 =
                  hex2asci(result[116]) +
                  hex2asci(result[117]) +
                  hex2asci(result[118]) +
                  hex2asci(result[119]) +
                  hex2asci(result[120]) +
                  hex2asci(result[121]) +
                  hex2asci(result[122]) +
                  hex2asci(result[123]) +
                  hex2asci(result[124]) +
                  hex2asci(result[125]) +
                  hex2asci(result[126]) +
                  hex2asci(result[127]) +
                  hex2asci(result[128]) +
                  hex2asci(result[129]) +
                  hex2asci(result[130]) +
                  hex2asci(result[131]);
                console.log("nomeUtenteTastiera9", nomeUtenteTastiera9);
                console.log("nomeUtenteTastiera10", nomeUtenteTastiera10);
                console.log("nomeUtenteTastiera11", nomeUtenteTastiera11);
                console.log("nomeUtenteTastiera12", nomeUtenteTastiera12);
                console.log("nomeUtenteTastiera13", nomeUtenteTastiera13);
                console.log("nomeUtenteTastiera14", nomeUtenteTastiera14);
                console.log("nomeUtenteTastiera15", nomeUtenteTastiera15);
                console.log("nomeUtenteTastiera16", nomeUtenteTastiera16);
                break;
              case "04":
                var nomeUtenteSpinotto1 =
                  hex2asci(result[4]) +
                  hex2asci(result[5]) +
                  hex2asci(result[6]) +
                  hex2asci(result[7]) +
                  hex2asci(result[8]) +
                  hex2asci(result[9]) +
                  hex2asci(result[10]) +
                  hex2asci(result[11]) +
                  hex2asci(result[12]) +
                  hex2asci(result[13]) +
                  hex2asci(result[14]) +
                  hex2asci(result[15]) +
                  hex2asci(result[16]) +
                  hex2asci(result[17]) +
                  hex2asci(result[18]) +
                  hex2asci(result[19]);
                var nomeUtenteSpinotto2 =
                  hex2asci(result[20]) +
                  hex2asci(result[21]) +
                  hex2asci(result[22]) +
                  hex2asci(result[23]) +
                  hex2asci(result[24]) +
                  hex2asci(result[25]) +
                  hex2asci(result[26]) +
                  hex2asci(result[27]) +
                  hex2asci(result[28]) +
                  hex2asci(result[29]) +
                  hex2asci(result[30]) +
                  hex2asci(result[31]) +
                  hex2asci(result[32]) +
                  hex2asci(result[33]) +
                  hex2asci(result[34]) +
                  hex2asci(result[35]);
                var nomeUtenteSpinotto3 =
                  hex2asci(result[36]) +
                  hex2asci(result[37]) +
                  hex2asci(result[38]) +
                  hex2asci(result[39]) +
                  hex2asci(result[40]) +
                  hex2asci(result[41]) +
                  hex2asci(result[42]) +
                  hex2asci(result[43]) +
                  hex2asci(result[44]) +
                  hex2asci(result[45]) +
                  hex2asci(result[46]) +
                  hex2asci(result[47]) +
                  hex2asci(result[48]) +
                  hex2asci(result[49]) +
                  hex2asci(result[50]) +
                  hex2asci(result[51]);
                var nomeUtenteSpinotto4 =
                  hex2asci(result[52]) +
                  hex2asci(result[53]) +
                  hex2asci(result[54]) +
                  hex2asci(result[55]) +
                  hex2asci(result[56]) +
                  hex2asci(result[57]) +
                  hex2asci(result[58]) +
                  hex2asci(result[59]) +
                  hex2asci(result[60]) +
                  hex2asci(result[61]) +
                  hex2asci(result[62]) +
                  hex2asci(result[63]) +
                  hex2asci(result[64]) +
                  hex2asci(result[65]) +
                  hex2asci(result[66]) +
                  hex2asci(result[67]);
                var nomeUtenteSpinotto5 =
                  hex2asci(result[68]) +
                  hex2asci(result[69]) +
                  hex2asci(result[70]) +
                  hex2asci(result[71]) +
                  hex2asci(result[72]) +
                  hex2asci(result[73]) +
                  hex2asci(result[74]) +
                  hex2asci(result[75]) +
                  hex2asci(result[76]) +
                  hex2asci(result[77]) +
                  hex2asci(result[78]) +
                  hex2asci(result[79]) +
                  hex2asci(result[80]) +
                  hex2asci(result[81]) +
                  hex2asci(result[82]) +
                  hex2asci(result[83]);
                var nomeUtenteSpinotto6 =
                  hex2asci(result[84]) +
                  hex2asci(result[85]) +
                  hex2asci(result[86]) +
                  hex2asci(result[87]) +
                  hex2asci(result[88]) +
                  hex2asci(result[89]) +
                  hex2asci(result[90]) +
                  hex2asci(result[91]) +
                  hex2asci(result[92]) +
                  hex2asci(result[93]) +
                  hex2asci(result[94]) +
                  hex2asci(result[95]) +
                  hex2asci(result[96]) +
                  hex2asci(result[97]) +
                  hex2asci(result[98]) +
                  hex2asci(result[99]);
                var nomeUtenteSpinotto7 =
                  hex2asci(result[100]) +
                  hex2asci(result[101]) +
                  hex2asci(result[102]) +
                  hex2asci(result[103]) +
                  hex2asci(result[104]) +
                  hex2asci(result[105]) +
                  hex2asci(result[106]) +
                  hex2asci(result[107]) +
                  hex2asci(result[108]) +
                  hex2asci(result[109]) +
                  hex2asci(result[110]) +
                  hex2asci(result[111]) +
                  hex2asci(result[112]) +
                  hex2asci(result[113]) +
                  hex2asci(result[114]) +
                  hex2asci(result[115]);
                var nomeUtenteSpinotto8 =
                  hex2asci(result[116]) +
                  hex2asci(result[117]) +
                  hex2asci(result[118]) +
                  hex2asci(result[119]) +
                  hex2asci(result[120]) +
                  hex2asci(result[121]) +
                  hex2asci(result[122]) +
                  hex2asci(result[123]) +
                  hex2asci(result[124]) +
                  hex2asci(result[125]) +
                  hex2asci(result[126]) +
                  hex2asci(result[127]) +
                  hex2asci(result[128]) +
                  hex2asci(result[129]) +
                  hex2asci(result[130]) +
                  hex2asci(result[131]);
                console.log("nomeUtenteSpinotto1", nomeUtenteSpinotto1);
                console.log("nomeUtenteSpinotto2", nomeUtenteSpinotto2);
                console.log("nomeUtenteSpinotto3", nomeUtenteSpinotto3);
                console.log("nomeUtenteSpinotto4", nomeUtenteSpinotto4);
                console.log("nomeUtenteSpinotto5", nomeUtenteSpinotto5);
                console.log("nomeUtenteSpinotto6", nomeUtenteSpinotto6);
                console.log("nomeUtenteSpinotto7", nomeUtenteSpinotto7);
                console.log("nomeUtenteSpinotto8", nomeUtenteSpinotto8);
                break;
              case "05":
                var nomeUtenteSpinotto9 =
                  hex2asci(result[4]) +
                  hex2asci(result[5]) +
                  hex2asci(result[6]) +
                  hex2asci(result[7]) +
                  hex2asci(result[8]) +
                  hex2asci(result[9]) +
                  hex2asci(result[10]) +
                  hex2asci(result[11]) +
                  hex2asci(result[12]) +
                  hex2asci(result[13]) +
                  hex2asci(result[14]) +
                  hex2asci(result[15]) +
                  hex2asci(result[16]) +
                  hex2asci(result[17]) +
                  hex2asci(result[18]) +
                  hex2asci(result[19]);
                var nomeUtenteSpinotto10 =
                  hex2asci(result[20]) +
                  hex2asci(result[21]) +
                  hex2asci(result[22]) +
                  hex2asci(result[23]) +
                  hex2asci(result[24]) +
                  hex2asci(result[25]) +
                  hex2asci(result[26]) +
                  hex2asci(result[27]) +
                  hex2asci(result[28]) +
                  hex2asci(result[29]) +
                  hex2asci(result[30]) +
                  hex2asci(result[31]) +
                  hex2asci(result[32]) +
                  hex2asci(result[33]) +
                  hex2asci(result[34]) +
                  hex2asci(result[35]);
                var nomeUtenteSpinotto11 =
                  hex2asci(result[36]) +
                  hex2asci(result[37]) +
                  hex2asci(result[38]) +
                  hex2asci(result[39]) +
                  hex2asci(result[40]) +
                  hex2asci(result[41]) +
                  hex2asci(result[42]) +
                  hex2asci(result[43]) +
                  hex2asci(result[44]) +
                  hex2asci(result[45]) +
                  hex2asci(result[46]) +
                  hex2asci(result[47]) +
                  hex2asci(result[48]) +
                  hex2asci(result[49]) +
                  hex2asci(result[50]) +
                  hex2asci(result[51]);
                var nomeUtenteSpinotto12 =
                  hex2asci(result[52]) +
                  hex2asci(result[53]) +
                  hex2asci(result[54]) +
                  hex2asci(result[55]) +
                  hex2asci(result[56]) +
                  hex2asci(result[57]) +
                  hex2asci(result[58]) +
                  hex2asci(result[59]) +
                  hex2asci(result[60]) +
                  hex2asci(result[61]) +
                  hex2asci(result[62]) +
                  hex2asci(result[63]) +
                  hex2asci(result[64]) +
                  hex2asci(result[65]) +
                  hex2asci(result[66]) +
                  hex2asci(result[67]);
                var nomeUtenteSpinotto13 =
                  hex2asci(result[68]) +
                  hex2asci(result[69]) +
                  hex2asci(result[70]) +
                  hex2asci(result[71]) +
                  hex2asci(result[72]) +
                  hex2asci(result[73]) +
                  hex2asci(result[74]) +
                  hex2asci(result[75]) +
                  hex2asci(result[76]) +
                  hex2asci(result[77]) +
                  hex2asci(result[78]) +
                  hex2asci(result[79]) +
                  hex2asci(result[80]) +
                  hex2asci(result[81]) +
                  hex2asci(result[82]) +
                  hex2asci(result[83]);
                var nomeUtenteSpinotto14 =
                  hex2asci(result[84]) +
                  hex2asci(result[85]) +
                  hex2asci(result[86]) +
                  hex2asci(result[87]) +
                  hex2asci(result[88]) +
                  hex2asci(result[89]) +
                  hex2asci(result[90]) +
                  hex2asci(result[91]) +
                  hex2asci(result[92]) +
                  hex2asci(result[93]) +
                  hex2asci(result[94]) +
                  hex2asci(result[95]) +
                  hex2asci(result[96]) +
                  hex2asci(result[97]) +
                  hex2asci(result[98]) +
                  hex2asci(result[99]);
                var nomeUtenteSpinotto15 =
                  hex2asci(result[100]) +
                  hex2asci(result[101]) +
                  hex2asci(result[102]) +
                  hex2asci(result[103]) +
                  hex2asci(result[104]) +
                  hex2asci(result[105]) +
                  hex2asci(result[106]) +
                  hex2asci(result[107]) +
                  hex2asci(result[108]) +
                  hex2asci(result[109]) +
                  hex2asci(result[110]) +
                  hex2asci(result[111]) +
                  hex2asci(result[112]) +
                  hex2asci(result[113]) +
                  hex2asci(result[114]) +
                  hex2asci(result[115]);
                var nomeUtenteSpinotto16 =
                  hex2asci(result[116]) +
                  hex2asci(result[117]) +
                  hex2asci(result[118]) +
                  hex2asci(result[119]) +
                  hex2asci(result[120]) +
                  hex2asci(result[121]) +
                  hex2asci(result[122]) +
                  hex2asci(result[123]) +
                  hex2asci(result[124]) +
                  hex2asci(result[125]) +
                  hex2asci(result[126]) +
                  hex2asci(result[127]) +
                  hex2asci(result[128]) +
                  hex2asci(result[129]) +
                  hex2asci(result[130]) +
                  hex2asci(result[131]);
                console.log("nomeUtenteSpinotto9", nomeUtenteSpinotto9);
                console.log("nomeUtenteSpinotto10", nomeUtenteSpinotto10);
                console.log("nomeUtenteSpinotto11", nomeUtenteSpinotto11);
                console.log("nomeUtenteSpinotto12", nomeUtenteSpinotto12);
                console.log("nomeUtenteSpinotto13", nomeUtenteSpinotto13);
                console.log("nomeUtenteSpinotto14", nomeUtenteSpinotto14);
                console.log("nomeUtenteSpinotto15", nomeUtenteSpinotto15);
                console.log("nomeUtenteSpinotto16", nomeUtenteSpinotto16);
                break;
              case "06":
                var nomeUscita1 =
                  hex2asci(result[4]) +
                  hex2asci(result[5]) +
                  hex2asci(result[6]) +
                  hex2asci(result[7]) +
                  hex2asci(result[8]) +
                  hex2asci(result[9]) +
                  hex2asci(result[10]) +
                  hex2asci(result[11]) +
                  hex2asci(result[12]) +
                  hex2asci(result[13]) +
                  hex2asci(result[14]) +
                  hex2asci(result[15]) +
                  hex2asci(result[16]) +
                  hex2asci(result[17]) +
                  hex2asci(result[18]) +
                  hex2asci(result[19]);
                var nomeUscita2 =
                  hex2asci(result[20]) +
                  hex2asci(result[21]) +
                  hex2asci(result[22]) +
                  hex2asci(result[23]) +
                  hex2asci(result[24]) +
                  hex2asci(result[25]) +
                  hex2asci(result[26]) +
                  hex2asci(result[27]) +
                  hex2asci(result[28]) +
                  hex2asci(result[29]) +
                  hex2asci(result[30]) +
                  hex2asci(result[31]) +
                  hex2asci(result[32]) +
                  hex2asci(result[33]) +
                  hex2asci(result[34]) +
                  hex2asci(result[35]);
                var nomeUscita3 =
                  hex2asci(result[36]) +
                  hex2asci(result[37]) +
                  hex2asci(result[38]) +
                  hex2asci(result[39]) +
                  hex2asci(result[40]) +
                  hex2asci(result[41]) +
                  hex2asci(result[42]) +
                  hex2asci(result[43]) +
                  hex2asci(result[44]) +
                  hex2asci(result[45]) +
                  hex2asci(result[46]) +
                  hex2asci(result[47]) +
                  hex2asci(result[48]) +
                  hex2asci(result[49]) +
                  hex2asci(result[50]) +
                  hex2asci(result[51]);
                var nomeUscita4 =
                  hex2asci(result[52]) +
                  hex2asci(result[53]) +
                  hex2asci(result[54]) +
                  hex2asci(result[55]) +
                  hex2asci(result[56]) +
                  hex2asci(result[57]) +
                  hex2asci(result[58]) +
                  hex2asci(result[59]) +
                  hex2asci(result[60]) +
                  hex2asci(result[61]) +
                  hex2asci(result[62]) +
                  hex2asci(result[63]) +
                  hex2asci(result[64]) +
                  hex2asci(result[65]) +
                  hex2asci(result[66]) +
                  hex2asci(result[67]);
                var nomeUscita5 =
                  hex2asci(result[68]) +
                  hex2asci(result[69]) +
                  hex2asci(result[70]) +
                  hex2asci(result[71]) +
                  hex2asci(result[72]) +
                  hex2asci(result[73]) +
                  hex2asci(result[74]) +
                  hex2asci(result[75]) +
                  hex2asci(result[76]) +
                  hex2asci(result[77]) +
                  hex2asci(result[78]) +
                  hex2asci(result[79]) +
                  hex2asci(result[80]) +
                  hex2asci(result[81]) +
                  hex2asci(result[82]) +
                  hex2asci(result[83]);
                var nomeUscita6 =
                  hex2asci(result[84]) +
                  hex2asci(result[85]) +
                  hex2asci(result[86]) +
                  hex2asci(result[87]) +
                  hex2asci(result[88]) +
                  hex2asci(result[89]) +
                  hex2asci(result[90]) +
                  hex2asci(result[91]) +
                  hex2asci(result[92]) +
                  hex2asci(result[93]) +
                  hex2asci(result[94]) +
                  hex2asci(result[95]) +
                  hex2asci(result[96]) +
                  hex2asci(result[97]) +
                  hex2asci(result[98]) +
                  hex2asci(result[99]);
                var nomeUscita7 =
                  hex2asci(result[100]) +
                  hex2asci(result[101]) +
                  hex2asci(result[102]) +
                  hex2asci(result[103]) +
                  hex2asci(result[104]) +
                  hex2asci(result[105]) +
                  hex2asci(result[106]) +
                  hex2asci(result[107]) +
                  hex2asci(result[108]) +
                  hex2asci(result[109]) +
                  hex2asci(result[110]) +
                  hex2asci(result[111]) +
                  hex2asci(result[112]) +
                  hex2asci(result[113]) +
                  hex2asci(result[114]) +
                  hex2asci(result[115]);
                var nomeUscita8 =
                  hex2asci(result[116]) +
                  hex2asci(result[117]) +
                  hex2asci(result[118]) +
                  hex2asci(result[119]) +
                  hex2asci(result[120]) +
                  hex2asci(result[121]) +
                  hex2asci(result[122]) +
                  hex2asci(result[123]) +
                  hex2asci(result[124]) +
                  hex2asci(result[125]) +
                  hex2asci(result[126]) +
                  hex2asci(result[127]) +
                  hex2asci(result[128]) +
                  hex2asci(result[129]) +
                  hex2asci(result[130]) +
                  hex2asci(result[131]);
                console.log("nomeUscita1", nomeUscita1);
                console.log("nomeUscita2", nomeUscita2);
                console.log("nomeUscita3", nomeUscita3);
                console.log("nomeUscita4", nomeUscita4);
                console.log("nomeUscita5", nomeUscita5);
                console.log("nomeUscita6", nomeUscita6);
                console.log("nomeUscita7", nomeUscita7);
                console.log("nomeUscita8", nomeUscita8);
                break;
              case "07":
                var nomeUscita9 =
                  hex2asci(result[4]) +
                  hex2asci(result[5]) +
                  hex2asci(result[6]) +
                  hex2asci(result[7]) +
                  hex2asci(result[8]) +
                  hex2asci(result[9]) +
                  hex2asci(result[10]) +
                  hex2asci(result[11]) +
                  hex2asci(result[12]) +
                  hex2asci(result[13]) +
                  hex2asci(result[14]) +
                  hex2asci(result[15]) +
                  hex2asci(result[16]) +
                  hex2asci(result[17]) +
                  hex2asci(result[18]) +
                  hex2asci(result[19]);
                var nomeUscita10 =
                  hex2asci(result[20]) +
                  hex2asci(result[21]) +
                  hex2asci(result[22]) +
                  hex2asci(result[23]) +
                  hex2asci(result[24]) +
                  hex2asci(result[25]) +
                  hex2asci(result[26]) +
                  hex2asci(result[27]) +
                  hex2asci(result[28]) +
                  hex2asci(result[29]) +
                  hex2asci(result[30]) +
                  hex2asci(result[31]) +
                  hex2asci(result[32]) +
                  hex2asci(result[33]) +
                  hex2asci(result[34]) +
                  hex2asci(result[35]);
                var nomeUscita11 =
                  hex2asci(result[36]) +
                  hex2asci(result[37]) +
                  hex2asci(result[38]) +
                  hex2asci(result[39]) +
                  hex2asci(result[40]) +
                  hex2asci(result[41]) +
                  hex2asci(result[42]) +
                  hex2asci(result[43]) +
                  hex2asci(result[44]) +
                  hex2asci(result[45]) +
                  hex2asci(result[46]) +
                  hex2asci(result[47]) +
                  hex2asci(result[48]) +
                  hex2asci(result[49]) +
                  hex2asci(result[50]) +
                  hex2asci(result[51]);
                var nomeUscita12 =
                  hex2asci(result[52]) +
                  hex2asci(result[53]) +
                  hex2asci(result[54]) +
                  hex2asci(result[55]) +
                  hex2asci(result[56]) +
                  hex2asci(result[57]) +
                  hex2asci(result[58]) +
                  hex2asci(result[59]) +
                  hex2asci(result[60]) +
                  hex2asci(result[61]) +
                  hex2asci(result[62]) +
                  hex2asci(result[63]) +
                  hex2asci(result[64]) +
                  hex2asci(result[65]) +
                  hex2asci(result[66]) +
                  hex2asci(result[67]);
                var nomeUscita13 =
                  hex2asci(result[68]) +
                  hex2asci(result[69]) +
                  hex2asci(result[70]) +
                  hex2asci(result[71]) +
                  hex2asci(result[72]) +
                  hex2asci(result[73]) +
                  hex2asci(result[74]) +
                  hex2asci(result[75]) +
                  hex2asci(result[76]) +
                  hex2asci(result[77]) +
                  hex2asci(result[78]) +
                  hex2asci(result[79]) +
                  hex2asci(result[80]) +
                  hex2asci(result[81]) +
                  hex2asci(result[82]) +
                  hex2asci(result[83]);
                var nomeUscita14 =
                  hex2asci(result[84]) +
                  hex2asci(result[85]) +
                  hex2asci(result[86]) +
                  hex2asci(result[87]) +
                  hex2asci(result[88]) +
                  hex2asci(result[89]) +
                  hex2asci(result[90]) +
                  hex2asci(result[91]) +
                  hex2asci(result[92]) +
                  hex2asci(result[93]) +
                  hex2asci(result[94]) +
                  hex2asci(result[95]) +
                  hex2asci(result[96]) +
                  hex2asci(result[97]) +
                  hex2asci(result[98]) +
                  hex2asci(result[99]);
                var nomeUscita15 =
                  hex2asci(result[100]) +
                  hex2asci(result[101]) +
                  hex2asci(result[102]) +
                  hex2asci(result[103]) +
                  hex2asci(result[104]) +
                  hex2asci(result[105]) +
                  hex2asci(result[106]) +
                  hex2asci(result[107]) +
                  hex2asci(result[108]) +
                  hex2asci(result[109]) +
                  hex2asci(result[110]) +
                  hex2asci(result[111]) +
                  hex2asci(result[112]) +
                  hex2asci(result[113]) +
                  hex2asci(result[114]) +
                  hex2asci(result[115]);
                var nomeUscita16 =
                  hex2asci(result[116]) +
                  hex2asci(result[117]) +
                  hex2asci(result[118]) +
                  hex2asci(result[119]) +
                  hex2asci(result[120]) +
                  hex2asci(result[121]) +
                  hex2asci(result[122]) +
                  hex2asci(result[123]) +
                  hex2asci(result[124]) +
                  hex2asci(result[125]) +
                  hex2asci(result[126]) +
                  hex2asci(result[127]) +
                  hex2asci(result[128]) +
                  hex2asci(result[129]) +
                  hex2asci(result[130]) +
                  hex2asci(result[131]);
                console.log("nomeUscita9", nomeUscita9);
                console.log("nomeUscita10", nomeUscita10);
                console.log("nomeUscita11", nomeUscita11);
                console.log("nomeUscita12", nomeUscita12);
                console.log("nomeUscita13", nomeUscita13);
                console.log("nomeUscita14", nomeUscita14);
                console.log("nomeUscita15", nomeUscita15);
                console.log("nomeUscita16", nomeUscita16);
                break;
            }
          }
          if (payload == "30") {
            risultato = "abilitazione timer";
            console.log(risultato);
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "31") {
            risultato = "disabilitazione timer";
            console.log(risultato);
            var tipoutente;
            var numeroutente;
            var risultato;
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(0, 3)) {
                case "0010":
                  tipoutente = "codice";
                case "0100":
                  tipoutente = "spinotto";
                case "0110":
                  tipoutente = "comunicatore";
                case "1000":
                  tipoutente = "chiave esterna";
              }
              numeroutente = colonna4bin.slice(4, 7);
              console.log("utente:", tipoutente, numeroutente);
            }
          }
          if (payload == "32") {
            risultato = "abilitazione codici installatore";
            console.log(risultato);
          }
          if (payload == "33") {
            risultato = "disabilitazione codici installatore";
            console.log(risultato);
          }
          if (payload == "34") {
            risultato = "reset preavviso inserimento";
            console.log(risultato);
          }
          if (payload == "35") {
            risultato = "allarme tamper zone";
            console.log(risultato);
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var colonna9bin = hex2bin(result[8]);
            var colonna10bin = hex2bin(result[9]);
            var colonna11bin = hex2bin(result[10]);
            binarioInArray(colonna4bin, arrayzoneallarmetamper);
            binarioInArray2(colonna5bin, arrayzoneallarmetamper);
            binarioInArray3(colonna6bin, arrayzoneallarmetamper);
            binarioInArray4(colonna7bin, arrayzoneallarmetamper);
            binarioInArray5(colonna8bin, arrayzoneallarmetamper);
            binarioInArray6(colonna9bin, arrayzoneallarmetamper);
            binarioInArray7(colonna10bin, arrayzoneallarmetamper);
            binarioInArray8(colonna11bin, arrayzoneallarmetamper);
          }
          if (payload == "36") {
            risultato = "allarme mancata risposta espansione radio";
            console.log(risultato);
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              var id = colonna4;
              console.log("id", id);
            }
          }
          if (payload == "37") {
            risultato =
              "aggiunta memoria allarme mancata risposta espansione radio";
            console.log(risultato);
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              var id = colonna4;
              console.log("id", id);
            }
          }
          if (payload == "38") {
            risultato = "manca risposta zone radio";
            console.log(risultato);
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var colonna9bin = hex2bin(result[8]);
            var colonna10bin = hex2bin(result[9]);
            var colonna11bin = hex2bin(result[10]);
            binarioInArray(colonna4bin, arrayzonemr);
            binarioInArray2(colonna5bin, arrayzonemr);
            binarioInArray3(colonna6bin, arrayzonemr);
            binarioInArray4(colonna7bin, arrayzonemr);
            binarioInArray5(colonna8bin, arrayzonemr);
            binarioInArray6(colonna9bin, arrayzonemr);
            binarioInArray7(colonna10bin, arrayzonemr);
            binarioInArray8(colonna11bin, arrayzonemr);
          }
          if (payload == "3B") {
            risultato = "guasto batteria scarica zone radio";
            console.log(risultato);
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna4bin = hex2bin(result[3]);
            var colonna5bin = hex2bin(result[4]);
            var colonna6bin = hex2bin(result[5]);
            var colonna7bin = hex2bin(result[6]);
            var colonna8bin = hex2bin(result[7]);
            var colonna9bin = hex2bin(result[8]);
            var colonna10bin = hex2bin(result[9]);
            var colonna11bin = hex2bin(result[10]);
            binarioInArray(colonna4bin, arrayzonebatt);
            binarioInArray2(colonna5bin, arrayzonebatt);
            binarioInArray3(colonna6bin, arrayzonebatt);
            binarioInArray4(colonna7bin, arrayzonebatt);
            binarioInArray5(colonna8bin, arrayzonebatt);
            binarioInArray6(colonna9bin, arrayzonebatt);
            binarioInArray7(colonna10bin, arrayzonebatt);
            binarioInArray8(colonna11bin, arrayzonebatt);
          }
          if (payload == "3C") {
            risultato = "notifica rapina generata da radiocomando";
            console.log(risultato);
          }
          if (payload == "3D") {
            risultato = "allarme tamper espansione radio";
            console.log(risultato);
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              risultato = colonna4;
              console.log(risultato);
            }
          }
          if (payload == "3E") {
            risultato = "allarme tamper espansione zone";
            console.log(risultato);
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              risultato = colonna4;
              console.log(risultato);
            }
          }
          if (payload == "3F") {
            risultato = "allarme jammer rilevato espansione radio";
            console.log(risultato);
          }
          if (payload == "40") {
            risultato = "allarme sabotaggio (antistrappo) su zona radio";
            console.log(risultato);
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              risultato = colonna4;
              console.log(risultato);
            }
          }
          if (payload == "41") {
            risultato =
              "allarme sabotaggio (rilevazione mascheramento) su zona radio";
            console.log(risultato);
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              risultato = colonna4;
              console.log(risultato);
            }
          }
        } else if (destinatario == "60") {
          if (payload == "01") {
            console.log("qui arriviamo");
            esito = 1;
            console.log("esito di conferma", esito);
            if (esito == 1) {
              exports.esito = esito;
              server.mandaEsito();
            }
          }
          if (payload == "02") {
            esito = 0;
            console.log("esito di conferma", esito);
            if (esito == 0) {
              exports.esito = esito;
              server.mandaEsito();
            }
          }
        }
      }
    }
  });
}
exports.entrata = entrata;
exports.port = port;
