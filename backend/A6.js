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
function binarioAdEsadecimale(binario) {
  // Controlla se il numero binario è valido
  if (!/^[01]+$/.test(binario)) {
    return "Numero binario non valido";
  }

  // Converte il numero binario in esadecimale utilizzando il metodo parseInt
  const esadecimale = parseInt(binario, 2).toString(16);

  return esadecimale;
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
          if (payload == "02") {
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
              areeAbilitate,
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
                areeAbilitate: areeAbilitate,
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
              areeAbilitate,
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
          if (payload == "27") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var blocco = result[3];
            var posizione = result[4];
            if (result[5].slice(7, 8) == "1") {
              var risultato = "memoria piena";
            }
            function riempiEsito(blocco, posizione, risultato) {
              return {
                blocco: blocco,
                posizione: posizione,
                risultato: risultato,
              };
            }
            let esito = riempiEsito(blocco, posizione, risultato);
            exports.esito = esito;
            server.mandaEsito();
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
            dato9 = hex2bin(result[12]);
            dato10 = hex2bin(result[13]);
            dato11 = hex2bin(result[14]);
            dato12 = hex2bin(result[15]);
            dato13 = hex2bin(result[16]);
            dato14 = hex2bin(result[17]);
            dato15 = result[18];
            dato16 = hex2bin(result[19]);
            //terzo blocco
            dato17 = hex2bin(result[20]);
            dato18 = hex2bin(result[21]);
            dato19 = hex2bin(result[22]);
            dato20 = hex2bin(result[23]);
            dato21 = hex2bin(result[24]);
            dato22 = hex2bin(result[25]);
            dato23 = result[26];
            dato24 = hex2bin(result[27]);
            //quarto blocco
            dato25 = hex2bin(result[28]);
            dato26 = hex2bin(result[29]);
            dato27 = hex2bin(result[30]);
            dato28 = hex2bin(result[31]);
            dato29 = hex2bin(result[32]);
            dato30 = hex2bin(result[33]);
            dato31 = result[34];
            dato32 = hex2bin(result[35]);
            //quinto blocco
            dato33 = hex2bin(result[36]);
            dato34 = hex2bin(result[37]);
            dato35 = hex2bin(result[38]);
            dato36 = hex2bin(result[39]);
            dato37 = hex2bin(result[40]);
            dato38 = hex2bin(result[41]);
            dato39 = result[42];
            dato40 = hex2bin(result[43]);
            // sesto blocco
            dato41 = hex2bin(result[44]);
            dato42 = hex2bin(result[45]);
            dato43 = hex2bin(result[46]);
            dato44 = hex2bin(result[47]);
            dato45 = hex2bin(result[48]);
            dato46 = hex2bin(result[49]);
            dato47 = result[50];
            dato48 = hex2bin(result[51]);
            // settimo blocco
            dato49 = hex2bin(result[52]);
            dato50 = hex2bin(result[53]);
            dato51 = hex2bin(result[54]);
            dato52 = hex2bin(result[55]);
            dato53 = hex2bin(result[56]);
            dato54 = hex2bin(result[57]);
            dato55 = result[58];
            dato56 = hex2bin(result[59]);
            // ottavo blocco
            dato57 = hex2bin(result[60]);
            dato58 = hex2bin(result[61]);
            dato59 = hex2bin(result[62]);
            dato60 = hex2bin(result[63]);
            dato61 = hex2bin(result[64]);
            dato62 = hex2bin(result[65]);
            dato63 = result[66];
            dato64 = hex2bin(result[67]);
            // nono blocco
            dato65 = hex2bin(result[68]);
            dato66 = hex2bin(result[69]);
            dato67 = hex2bin(result[70]);
            dato68 = hex2bin(result[71]);
            dato69 = hex2bin(result[72]);
            dato70 = hex2bin(result[73]);
            dato71 = result[74];
            dato72 = hex2bin(result[75]);
            //decimo blocco
            dato73 = hex2bin(result[76]);
            dato74 = hex2bin(result[77]);
            dato75 = hex2bin(result[78]);
            dato76 = hex2bin(result[79]);
            dato77 = hex2bin(result[80]);
            dato78 = hex2bin(result[81]);
            dato79 = result[82];
            dato80 = hex2bin(result[83]);
            //undicesimo blocco
            dato81 = hex2bin(result[84]);
            dato82 = hex2bin(result[85]);
            dato83 = hex2bin(result[86]);
            dato84 = hex2bin(result[87]);
            dato85 = hex2bin(result[88]);
            dato86 = hex2bin(result[89]);
            dato87 = result[90];
            dato88 = hex2bin(result[91]);
            //dodicesimo blocco
            dato89 = hex2bin(result[92]);
            dato90 = hex2bin(result[93]);
            dato91 = hex2bin(result[94]);
            dato92 = hex2bin(result[95]);
            dato93 = hex2bin(result[96]);
            dato94 = hex2bin(result[97]);
            dato95 = result[98];
            dato96 = hex2bin(result[99]);
            //tredicesimo blocco
            dato97 = hex2bin(result[100]);
            dato98 = hex2bin(result[101]);
            dato99 = hex2bin(result[102]);
            dato100 = hex2bin(result[103]);
            dato101 = hex2bin(result[104]);
            dato102 = hex2bin(result[105]);
            dato103 = result[106];
            dato104 = hex2bin(result[107]);
            //quattordicesimo blocco
            dato105 = hex2bin(result[108]);
            dato106 = hex2bin(result[109]);
            dato107 = hex2bin(result[110]);
            dato108 = hex2bin(result[111]);
            dato109 = hex2bin(result[112]);
            dato110 = hex2bin(result[113]);
            dato111 = result[114];
            dato112 = hex2bin(result[115]);
            //quindicesimo blocco
            dato113 = hex2bin(result[116]);
            dato114 = hex2bin(result[117]);
            dato115 = hex2bin(result[118]);
            dato116 = hex2bin(result[119]);
            dato117 = hex2bin(result[120]);
            dato118 = hex2bin(result[121]);
            dato119 = result[122];
            dato120 = hex2bin(result[123]);
            //sedicesimo blocco
            dato121 = hex2bin(result[124]);
            dato122 = hex2bin(result[125]);
            dato123 = hex2bin(result[126]);
            dato124 = hex2bin(result[127]);
            dato125 = hex2bin(result[128]);
            dato126 = hex2bin(result[129]);
            dato127 = result[130];
            dato128 = hex2bin(result[131]);
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
                    case "03":
                      evento = "Allarme mancanza risposta comunicatore";
                      break;
                    case "04":
                      evento = "Allarme tamper centrale";
                      break;
                    case "05":
                      evento = "Allarme tamper tastiera";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "06":
                      evento = "Allarme mancanza risposta espansione radio";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "07":
                      evento = "Allarme tamper espansione radio";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "08":
                      evento = "Allarme tamper espansione zone";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "09":
                      evento = "Allarme jammer radio";
                      break;
                    case "10":
                      evento = "Allarme mascheramento zone radio";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "0A":
                  switch (dato8) {
                    case "00":
                      evento = "Rapina per codice anticoercizione";
                      break;
                    case "01":
                      evento = "Rapina per disinserimento";
                      break;
                    case "02":
                      evento = "Rapina da telecomando";
                      break;
                  }
                case "0B":
                  switch (dato8) {
                    case "00":
                      evento = "Guasto mancanza rete";
                      break;
                    case "01":
                      evento = "Ripristino guasto mancanza rete";
                      break;
                    case "02":
                      evento = "Guasto batteria scarica";
                      break;
                    case "03":
                      evento = "Ripristino guasto batteria scarica";
                      break;
                    case "04":
                      evento = "Guasto fusibile";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "05":
                      evento = "Ripristino guasto fusibile";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "06":
                      evento = "Guasto alimentazione bassa";
                      break;
                    case "07":
                      evento = "Errori su RS485";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "0C":
                  switch (dato8) {
                    case "00":
                      evento = "Inizio programmazione";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "01":
                      evento = "Fine programmazione";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "02":
                      evento = "Inizio blocco";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "03":
                      evento = "Fine blocco";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "04":
                      evento = "Inizio blocco sirene";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "05":
                      evento = "Fine blocco sirene";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "06":
                      evento = "Riavvio centrale";
                      break;
                    case "07":
                      evento = "Abilitazione timer (fine blocco)";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "08":
                      evento = "Disabilitazione timer (inizio blocco)";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "09":
                      evento = "Abilitazione codici installatore";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "0A":
                      evento = "Disabilitazione codici installatore";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "0D":
                  switch (dato8) {
                    case "00":
                      evento = "Inizio avvisi comunicatore";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "01":
                      evento = "Fine avvisi comunicatore";
                      sestaColonna = dato6;
                      break;
                    case "02":
                      evento = "Inizio chiamata entrante comunicatore";
                      if (dato6 == "ff") {
                        sestaColonna = "Numero non presente";
                      } else {
                        sestaColonna = binToDec(dato6);
                      }
                      break;
                    case "03":
                      evento = "Fine chiamata entrante comunicatore";
                      if (binarioAdEsadecimale(dato6) == "ff") {
                        sestaColonna = "Numero non presente";
                      } else {
                        sestaColonna = binToDec(dato6);
                      }
                      break;
                    case "04":
                      evento = "Inizio segnale assente comunicatore";
                      break;
                    case "05":
                      evento = "Fine segnale assente comunicatore";
                      break;
                    case "06":
                      evento = "Inizio segnale basso comunicatore";
                      break;
                    case "07":
                      evento = "Fine segnale basso comunicatore";
                      break;
                    case "08":
                      evento = "Inizio jamming comunicatore";
                      break;
                    case "09":
                      evento = "Fine jamming comunicatore";
                      break;
                    case "0A":
                      evento = "Inizio ascolto ambientale comunicatore";
                      break;
                    case "0B":
                      evento = "Fine ascolto ambientale";
                      break;
                    case "0C":
                      evento = "Inizio credito basso comunicatore";
                      break;
                    case "0D":
                      evento = "Fine credito basso comunicatore";
                      break;
                    case "0E":
                      evento = "Inizio scadenza SIM comunicatore";
                      break;
                    case "0F":
                      evento = "Fine scadenza SIM comunicatore";
                      break;
                    case "10":
                      evento = "Inizio blocco chiamate comunicatore";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "11":
                      evento = "Fine blocco chiamate comunicatore";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "12":
                      evento = "Life test comunicatore";
                      break;
                    case "13":
                      evento = "Connessione cloud";
                      break;
                    case "14":
                      evento = "Disconnessione cloud";
                      switch (binarioAdEsadecimale(dato6)) {
                        case "01":
                          sestaColonna = "rete";
                          break;
                        case "02":
                          sestaColonna = "timeout";
                          break;
                        case "04":
                          sestaColonna = "impianto sconosciuto";
                          break;
                        case "08":
                          sestaColonna =
                            "impianto non abilitato/impianto già connesso";
                          break;
                        case "10":
                          sestaColonna = "stop da locale";
                          break;
                      }
                    case "15":
                      evento = "Blocco connessione cloud";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "16":
                      evento = "Sblocco connessione cloud";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "0E":
                  evento = "Cancellazione storico eventi";
                  sestaColonna = binToDec(dato6);
                  break;
                case "0F":
                  evento = "Attivazione uscita";
                  sestaColonna = binToDec(dato6);
                  riferimento = binToDec(dato8);
                  break;
                case "10":
                  evento = "Disattivazione uscita";
                  sestaColonna = binToDec(dato6);
                  riferimento = binToDec(dato8);
                  break;
                case "11":
                  switch (dato8) {
                    case "00":
                      evento =
                        "Aggiunta memoria mancanza risposta espansione ingressi";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "01":
                      evento =
                        "Aggiunta memoria mancanza risposta comunicatore";
                      break;
                    case "02":
                      evento = "Aggiunta memoria tamper centrale";
                      break;
                    case "03":
                      evento = "Aggiunta memoria tamper tastiera";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "04":
                      evento =
                        "Aggiunta memoria mancata risposta espansione radio";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "12":
                  evento = "Reinclusione tamper centrale";
                  sestaColonna = binToDec(dato6);
                  break;
                case "13":
                  evento = "Esclusione tamper centrale";
                  sestaColonna = binToDec(dato6);
                  break;
                case "14":
                  evento = "Reset preavviso inserimento in corso";
                  sestaColonna = binToDec(dato6);
                  riferimento = dato8;
                  break;
                case "15":
                  evento = "Mancata risposta su zona radio";
                  riferimento = dato8;
                  break;
                case "14":
                  evento = "Batteria scarica su zona radio";
                  sestaColonna = binToDec(dato6);
                  riferimento = dato8;
                  break;
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
              dato36,
              dato37,
              dato38,
              dato39,
              dato40
            );
            blocchetto[5] = convertiDati(
              dato41,
              dato42,
              dato43,
              dato44,
              dato45,
              dato46,
              dato47,
              dato48
            );
            blocchetto[6] = convertiDati(
              dato49,
              dato50,
              dato51,
              dato52,
              dato53,
              dato54,
              dato55,
              dato56
            );
            blocchetto[7] = convertiDati(
              dato57,
              dato58,
              dato59,
              dato60,
              dato61,
              dato62,
              dato63,
              dato64
            );
            blocchetto[8] = convertiDati(
              dato65,
              dato66,
              dato67,
              dato68,
              dato69,
              dato70,
              dato71,
              dato72
            );
            blocchetto[9] = convertiDati(
              dato73,
              dato74,
              dato75,
              dato76,
              dato77,
              dato78,
              dato79,
              dato80
            );
            blocchetto[10] = convertiDati(
              dato81,
              dato82,
              dato83,
              dato84,
              dato85,
              dato86,
              dato87,
              dato88
            );
            blocchetto[11] = convertiDati(
              dato89,
              dato90,
              dato91,
              dato92,
              dato93,
              dato94,
              dato95,
              dato96
            );
            blocchetto[12] = convertiDati(
              dato97,
              dato98,
              dato99,
              dato100,
              dato101,
              dato102,
              dato103,
              dato104
            );
            blocchetto[13] = convertiDati(
              dato105,
              dato106,
              dato107,
              dato108,
              dato109,
              dato110,
              dato111,
              dato112
            );
            blocchetto[14] = convertiDati(
              dato113,
              dato114,
              dato115,
              dato116,
              dato117,
              dato118,
              dato119,
              dato120
            );
            blocchetto[15] = convertiDati(
              dato121,
              dato122,
              dato123,
              dato124,
              dato125,
              dato126,
              dato127,
              dato128
            );
            function riempiEsito(payload, blocchetto) {
              return {
                payload: payload,
                blocchetto: blocchetto,
              };
            }
            let esito = riempiEsito(payload, blocchetto);
            exports.esito = esito;
            server.mandaEsito();
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
          if (payload == "2f") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var bloccoSwitch = result[3];
            if (bloccoSwitch[3] == "00") {
              console.log("STat trasi");
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
            }
            if (bloccoSwitch == "01") {
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
            }
            if (bloccoSwitch == "02") {
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
            }
            if (bloccoSwitch == "04") {
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
            }
            if (bloccoSwitch == "04") {
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
            }
            if (bloccoSwitch == "05") {
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
            }
            if (bloccoSwitch == "06") {
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
            }
            if (bloccoSwitch == "07") {
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
            }
            if (bloccoSwitch == "08") {
              var nomeZona1 =
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
              var nomeZona2 =
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
              var nomeZona3 =
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
              var nomeZona4 =
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
              var nomeZona5 =
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
              var nomeZona6 =
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
              var nomeZona7 =
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
              var nomeZona8 =
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
            }
            if (bloccoSwitch == "09") {
              var nomeZona9 =
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
              var nomeZona10 =
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
              var nomeZona11 =
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
              var nomeZona12 =
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
              var nomeZona13 =
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
              var nomeZona14 =
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
              var nomeZona15 =
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
              var nomeZona16 =
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
            }
            if (bloccoSwitch == "10") {
              var nomeZona17 =
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
              var nomeZona18 =
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
              var nomeZona19 =
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
              var nomeZona20 =
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
              var nomeZona21 =
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
              var nomeZona22 =
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
              var nomeZona23 =
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
              var nomeZona24 =
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
            }
            if (bloccoSwitch == "11") {
              var nomeZona25 =
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
              var nomeZona26 =
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
              var nomeZona27 =
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
              var nomeZona28 =
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
              var nomeZona29 =
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
              var nomeZona30 =
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
              var nomeZona31 =
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
              var nomeZona32 =
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
            }
            if (bloccoSwitch == "12") {
              var nomeZona33 =
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
              var nomeZona34 =
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
              var nomeZona35 =
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
              var nomeZona36 =
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
              var nomeZona37 =
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
              var nomeZona38 =
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
              var nomeZona39 =
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
              var nomeZona40 =
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
            }
            if (bloccoSwitch == "13") {
              var nomeZona41 =
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
              var nomeZona42 =
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
              var nomeZona43 =
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
              var nomeZona44 =
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
              var nomeZona45 =
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
              var nomeZona46 =
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
              var nomeZona47 =
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
              var nomeZona48 =
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
            }
            if (bloccoSwitch == "14") {
              var nomeZona49 =
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
              var nomeZona50 =
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
              var nomeZona51 =
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
              var nomeZona52 =
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
              var nomeZona53 =
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
              var nomeZona54 =
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
              var nomeZona55 =
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
              var nomeZona56 =
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
            }
            if (bloccoSwitch == "15") {
              var nomeZona57 =
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
              var nomeZona58 =
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
              var nomeZona59 =
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
              var nomeZona60 =
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
              var nomeZona61 =
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
              var nomeZona62 =
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
              var nomeZona63 =
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
              var nomeZona64 =
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
            }
            function riempiEsito(
              payload,
              bloccoSwitch,
              nomesms,
              nomecentrale,
              nomeUtenteTastiera1,
              nomeUtenteTastiera2,
              nomeUtenteTastiera3,
              nomeUtenteTastiera4,
              nomeUtenteTastiera5,
              nomeUtenteTastiera6,
              nomeUtenteTastiera7,
              nomeUtenteTastiera8,
              nomeUtenteTastiera9,
              nomeUtenteTastiera10,
              nomeUtenteTastiera11,
              nomeUtenteTastiera12,
              nomeUtenteTastiera13,
              nomeUtenteTastiera14,
              nomeUtenteTastiera15,
              nomeUtenteTastiera16,
              nomeUtenteSpinotto1,
              nomeUtenteSpinotto2,
              nomeUtenteSpinotto3,
              nomeUtenteSpinotto4,
              nomeUtenteSpinotto5,
              nomeUtenteSpinotto6,
              nomeUtenteSpinotto7,
              nomeUtenteSpinotto8,
              nomeUtenteSpinotto9,
              nomeUtenteSpinotto10,
              nomeUtenteSpinotto11,
              nomeUtenteSpinotto12,
              nomeUtenteSpinotto13,
              nomeUtenteSpinotto14,
              nomeUtenteSpinotto15,
              nomeUtenteSpinotto16,
              nomeUscita1,
              nomeUscita2,
              nomeUscita3,
              nomeUscita4,
              nomeUscita5,
              nomeUscita6,
              nomeUscita7,
              nomeUscita8,
              nomeUscita9,
              nomeUscita10,
              nomeUscita11,
              nomeUscita12,
              nomeUscita13,
              nomeUscita14,
              nomeUscita15,
              nomeUscita16,
              nomeZona1,
              nomeZona2,
              nomeZona3,
              nomeZona4,
              nomeZona5,
              nomeZona6,
              nomeZona7,
              nomeZona8,
              nomeZona9,
              nomeZona10,
              nomeZona11,
              nomeZona12,
              nomeZona13,
              nomeZona14,
              nomeZona15,
              nomeZona16,
              nomeZona17,
              nomeZona18,
              nomeZona19,
              nomeZona20,
              nomeZona21,
              nomeZona22,
              nomeZona23,
              nomeZona24,
              nomeZona25,
              nomeZona26,
              nomeZona27,
              nomeZona28,
              nomeZona29,
              nomeZona30,
              nomeZona31,
              nomeZona32,
              nomeZona33,
              nomeZona34,
              nomeZona35,
              nomeZona36,
              nomeZona37,
              nomeZona38,
              nomeZona39,
              nomeZona40,
              nomeZona41,
              nomeZona42,
              nomeZona43,
              nomeZona44,
              nomeZona45,
              nomeZona46,
              nomeZona47,
              nomeZona48,
              nomeZona49,
              nomeZona50,
              nomeZona51,
              nomeZona52,
              nomeZona53,
              nomeZona54,
              nomeZona55,
              nomeZona56,
              nomeZona57,
              nomeZona58,
              nomeZona59,
              nomeZona60,
              nomeZona61,
              nomeZona62,
              nomeZona63,
              nomeZona64,
              nomeAreaA,
              nomeAreaB,
              nomeAreaC,
              nomeAreaD
            ) {
              return {
                payload: payload,
                bloccoSwitch: bloccoSwitch,
                nomesms: nomesms,
                nomecentrale: nomecentrale,
                nomeUtenteTastiera1: nomeUtenteTastiera1,
                nomeUtenteTastiera2: nomeUtenteTastiera2,
                nomeUtenteTastiera3: nomeUtenteTastiera3,
                nomeUtenteTastiera4: nomeUtenteTastiera4,
                nomeUtenteTastiera5: nomeUtenteTastiera5,
                nomeUtenteTastiera6: nomeUtenteTastiera6,
                nomeUtenteTastiera7: nomeUtenteTastiera7,
                nomeUtenteTastiera8: nomeUtenteTastiera8,
                nomeUtenteTastiera9: nomeUtenteTastiera9,
                nomeUtenteTastiera10: nomeUtenteTastiera10,
                nomeUtenteTastiera11: nomeUtenteTastiera11,
                nomeUtenteTastiera12: nomeUtenteTastiera12,
                nomeUtenteTastiera13: nomeUtenteTastiera13,
                nomeUtenteTastiera14: nomeUtenteTastiera14,
                nomeUtenteTastiera15: nomeUtenteTastiera15,
                nomeUtenteTastiera16: nomeUtenteTastiera16,
                nomeUtenteSpinotto1: nomeUtenteSpinotto1,
                nomeUtenteSpinotto2: nomeUtenteSpinotto2,
                nomeUtenteSpinotto3: nomeUtenteSpinotto3,
                nomeUtenteSpinotto4: nomeUtenteSpinotto4,
                nomeUtenteSpinotto5: nomeUtenteSpinotto5,
                nomeUtenteSpinotto6: nomeUtenteSpinotto6,
                nomeUtenteSpinotto7: nomeUtenteSpinotto7,
                nomeUtenteSpinotto8: nomeUtenteSpinotto8,
                nomeUtenteSpinotto9: nomeUtenteSpinotto9,
                nomeUtenteSpinotto10: nomeUtenteSpinotto10,
                nomeUtenteSpinotto11: nomeUtenteSpinotto11,
                nomeUtenteSpinotto12: nomeUtenteSpinotto12,
                nomeUtenteSpinotto13: nomeUtenteSpinotto13,
                nomeUtenteSpinotto14: nomeUtenteSpinotto14,
                nomeUtenteSpinotto15: nomeUtenteSpinotto15,
                nomeUtenteSpinotto16: nomeUtenteSpinotto16,
                nomeUscita1: nomeUscita1,
                nomeUscita2: nomeUscita2,
                nomeUscita3: nomeUscita3,
                nomeUscita4: nomeUscita4,
                nomeUscita5: nomeUscita5,
                nomeUscita6: nomeUscita6,
                nomeUscita7: nomeUscita7,
                nomeUscita8: nomeUscita8,
                nomeUscita9: nomeUscita9,
                nomeUscita10: nomeUscita10,
                nomeUscita11: nomeUscita11,
                nomeUscita12: nomeUscita12,
                nomeUscita13: nomeUscita13,
                nomeUscita14: nomeUscita14,
                nomeUscita15: nomeUscita15,
                nomeUscita16: nomeUscita16,
                nomeZona1: nomeZona1,
                nomeZona2: nomeZona2,
                nomeZona3: nomeZona3,
                nomeZona4: nomeZona4,
                nomeZona5: nomeZona5,
                nomeZona6: nomeZona6,
                nomeZona7: nomeZona7,
                nomeZona8: nomeZona8,
                nomeZona9: nomeZona9,
                nomeZona10: nomeZona10,
                nomeZona11: nomeZona11,
                nomeZona12: nomeZona12,
                nomeZona13: nomeZona13,
                nomeZona14: nomeZona14,
                nomeZona15: nomeZona15,
                nomeZona16: nomeZona16,
                nomeZona17: nomeZona17,
                nomeZona18: nomeZona18,
                nomeZona19: nomeZona19,
                nomeZona20: nomeZona20,
                nomeZona21: nomeZona21,
                nomeZona22: nomeZona22,
                nomeZona23: nomeZona23,
                nomeZona24: nomeZona24,
                nomeZona25: nomeZona25,
                nomeZona26: nomeZona26,
                nomeZona27: nomeZona27,
                nomeZona28: nomeZona28,
                nomeZona29: nomeZona29,
                nomeZona30: nomeZona30,
                nomeZona31: nomeZona31,
                nomeZona32: nomeZona32,
                nomeZona33: nomeZona33,
                nomeZona34: nomeZona34,
                nomeZona35: nomeZona35,
                nomeZona36: nomeZona36,
                nomeZona37: nomeZona37,
                nomeZona38: nomeZona38,
                nomeZona39: nomeZona39,
                nomeZona40: nomeZona40,
                nomeZona41: nomeZona41,
                nomeZona42: nomeZona42,
                nomeZona43: nomeZona43,
                nomeZona44: nomeZona44,
                nomeZona45: nomeZona45,
                nomeZona46: nomeZona46,
                nomeZona47: nomeZona47,
                nomeZona48: nomeZona48,
                nomeZona49: nomeZona49,
                nomeZona50: nomeZona50,
                nomeZona51: nomeZona51,
                nomeZona52: nomeZona52,
                nomeZona53: nomeZona53,
                nomeZona54: nomeZona54,
                nomeZona55: nomeZona55,
                nomeZona56: nomeZona56,
                nomeZona57: nomeZona57,
                nomeZona58: nomeZona58,
                nomeZona59: nomeZona59,
                nomeZona60: nomeZona60,
                nomeZona61: nomeZona61,
                nomeZona62: nomeZona62,
                nomeZona63: nomeZona63,
                nomeZona64: nomeZona64,
                nomeAreaA: nomeAreaA,
                nomeAreaB: nomeAreaB,
                nomeAreaC: nomeAreaC,
                nomeAreaD: nomeAreaD,
              };
            }
            let esito = riempiEsito(
              payload,
              bloccoSwitch,
              nomesms,
              nomecentrale,
              nomeUtenteTastiera1,
              nomeUtenteTastiera2,
              nomeUtenteTastiera3,
              nomeUtenteTastiera4,
              nomeUtenteTastiera5,
              nomeUtenteTastiera6,
              nomeUtenteTastiera7,
              nomeUtenteTastiera8,
              nomeUtenteTastiera9,
              nomeUtenteTastiera10,
              nomeUtenteTastiera11,
              nomeUtenteTastiera12,
              nomeUtenteTastiera13,
              nomeUtenteTastiera14,
              nomeUtenteTastiera15,
              nomeUtenteTastiera16,
              nomeUtenteSpinotto1,
              nomeUtenteSpinotto2,
              nomeUtenteSpinotto3,
              nomeUtenteSpinotto4,
              nomeUtenteSpinotto5,
              nomeUtenteSpinotto6,
              nomeUtenteSpinotto7,
              nomeUtenteSpinotto8,
              nomeUtenteSpinotto9,
              nomeUtenteSpinotto10,
              nomeUtenteSpinotto11,
              nomeUtenteSpinotto12,
              nomeUtenteSpinotto13,
              nomeUtenteSpinotto14,
              nomeUtenteSpinotto15,
              nomeUtenteSpinotto16,
              nomeUscita1,
              nomeUscita2,
              nomeUscita3,
              nomeUscita4,
              nomeUscita5,
              nomeUscita6,
              nomeUscita7,
              nomeUscita8,
              nomeUscita9,
              nomeUscita10,
              nomeUscita11,
              nomeUscita12,
              nomeUscita13,
              nomeUscita14,
              nomeUscita15,
              nomeUscita16,
              nomeZona1,
              nomeZona2,
              nomeZona3,
              nomeZona4,
              nomeZona5,
              nomeZona6,
              nomeZona7,
              nomeZona8,
              nomeZona9,
              nomeZona10,
              nomeZona11,
              nomeZona12,
              nomeZona13,
              nomeZona14,
              nomeZona15,
              nomeZona16,
              nomeZona17,
              nomeZona18,
              nomeZona19,
              nomeZona20,
              nomeZona21,
              nomeZona22,
              nomeZona23,
              nomeZona24,
              nomeZona25,
              nomeZona26,
              nomeZona27,
              nomeZona28,
              nomeZona29,
              nomeZona30,
              nomeZona31,
              nomeZona32,
              nomeZona33,
              nomeZona34,
              nomeZona35,
              nomeZona36,
              nomeZona37,
              nomeZona38,
              nomeZona39,
              nomeZona40,
              nomeZona41,
              nomeZona42,
              nomeZona43,
              nomeZona44,
              nomeZona45,
              nomeZona46,
              nomeZona47,
              nomeZona48,
              nomeZona49,
              nomeZona50,
              nomeZona51,
              nomeZona52,
              nomeZona53,
              nomeZona54,
              nomeZona55,
              nomeZona56,
              nomeZona57,
              nomeZona58,
              nomeZona59,
              nomeZona60,
              nomeZona61,
              nomeZona62,
              nomeZona63,
              nomeZona64,
              nomeAreaA,
              nomeAreaB,
              nomeAreaC,
              nomeAreaD
            );
            exports.esito = esito;
            if (esito) {
              server.mandaEsito();
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
          if (payload == "0c") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
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
            dato9 = hex2bin(result[12]);
            dato10 = hex2bin(result[13]);
            dato11 = hex2bin(result[14]);
            dato12 = hex2bin(result[15]);
            dato13 = hex2bin(result[16]);
            dato14 = hex2bin(result[17]);
            dato15 = result[18];
            dato16 = hex2bin(result[19]);
            //terzo blocco
            dato17 = hex2bin(result[20]);
            dato18 = hex2bin(result[21]);
            dato19 = hex2bin(result[22]);
            dato20 = hex2bin(result[23]);
            dato21 = hex2bin(result[24]);
            dato22 = hex2bin(result[25]);
            dato23 = result[26];
            dato24 = hex2bin(result[27]);
            //quarto blocco
            dato25 = hex2bin(result[28]);
            dato26 = hex2bin(result[29]);
            dato27 = hex2bin(result[30]);
            dato28 = hex2bin(result[31]);
            dato29 = hex2bin(result[32]);
            dato30 = hex2bin(result[33]);
            dato31 = result[34];
            dato32 = hex2bin(result[35]);
            //quinto blocco
            dato33 = hex2bin(result[36]);
            dato34 = hex2bin(result[37]);
            dato35 = hex2bin(result[38]);
            dato36 = hex2bin(result[39]);
            dato37 = hex2bin(result[40]);
            dato38 = hex2bin(result[41]);
            dato39 = result[42];
            dato40 = hex2bin(result[43]);
            // sesto blocco
            dato41 = hex2bin(result[44]);
            dato42 = hex2bin(result[45]);
            dato43 = hex2bin(result[46]);
            dato44 = hex2bin(result[47]);
            dato45 = hex2bin(result[48]);
            dato46 = hex2bin(result[49]);
            dato47 = result[50];
            dato48 = hex2bin(result[51]);
            // settimo blocco
            dato49 = hex2bin(result[52]);
            dato50 = hex2bin(result[53]);
            dato51 = hex2bin(result[54]);
            dato52 = hex2bin(result[55]);
            dato53 = hex2bin(result[56]);
            dato54 = hex2bin(result[57]);
            dato55 = result[58];
            dato56 = hex2bin(result[59]);
            // ottavo blocco
            dato57 = hex2bin(result[60]);
            dato58 = hex2bin(result[61]);
            dato59 = hex2bin(result[62]);
            dato60 = hex2bin(result[63]);
            dato61 = hex2bin(result[64]);
            dato62 = hex2bin(result[65]);
            dato63 = result[66];
            dato64 = hex2bin(result[67]);
            // nono blocco
            dato65 = hex2bin(result[68]);
            dato66 = hex2bin(result[69]);
            dato67 = hex2bin(result[70]);
            dato68 = hex2bin(result[71]);
            dato69 = hex2bin(result[72]);
            dato70 = hex2bin(result[73]);
            dato71 = result[74];
            dato72 = hex2bin(result[75]);
            //decimo blocco
            dato73 = hex2bin(result[76]);
            dato74 = hex2bin(result[77]);
            dato75 = hex2bin(result[78]);
            dato76 = hex2bin(result[79]);
            dato77 = hex2bin(result[80]);
            dato78 = hex2bin(result[81]);
            dato79 = result[82];
            dato80 = hex2bin(result[83]);
            //undicesimo blocco
            dato81 = hex2bin(result[84]);
            dato82 = hex2bin(result[85]);
            dato83 = hex2bin(result[86]);
            dato84 = hex2bin(result[87]);
            dato85 = hex2bin(result[88]);
            dato86 = hex2bin(result[89]);
            dato87 = result[90];
            dato88 = hex2bin(result[91]);
            //dodicesimo blocco
            dato89 = hex2bin(result[92]);
            dato90 = hex2bin(result[93]);
            dato91 = hex2bin(result[94]);
            dato92 = hex2bin(result[95]);
            dato93 = hex2bin(result[96]);
            dato94 = hex2bin(result[97]);
            dato95 = result[98];
            dato96 = hex2bin(result[99]);
            //tredicesimo blocco
            dato97 = hex2bin(result[100]);
            dato98 = hex2bin(result[101]);
            dato99 = hex2bin(result[102]);
            dato100 = hex2bin(result[103]);
            dato101 = hex2bin(result[104]);
            dato102 = hex2bin(result[105]);
            dato103 = result[106];
            dato104 = hex2bin(result[107]);
            //quattordicesimo blocco
            dato105 = hex2bin(result[108]);
            dato106 = hex2bin(result[109]);
            dato107 = hex2bin(result[110]);
            dato108 = hex2bin(result[111]);
            dato109 = hex2bin(result[112]);
            dato110 = hex2bin(result[113]);
            dato111 = result[114];
            dato112 = hex2bin(result[115]);
            //quindicesimo blocco
            dato113 = hex2bin(result[116]);
            dato114 = hex2bin(result[117]);
            dato115 = hex2bin(result[118]);
            dato116 = hex2bin(result[119]);
            dato117 = hex2bin(result[120]);
            dato118 = hex2bin(result[121]);
            dato119 = result[122];
            dato120 = hex2bin(result[123]);
            //sedicesimo blocco
            dato121 = hex2bin(result[124]);
            dato122 = hex2bin(result[125]);
            dato123 = hex2bin(result[126]);
            dato124 = hex2bin(result[127]);
            dato125 = hex2bin(result[128]);
            dato126 = hex2bin(result[129]);
            dato127 = result[130];
            dato128 = hex2bin(result[131]);
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
                    case "03":
                      evento = "Allarme mancanza risposta comunicatore";
                      break;
                    case "04":
                      evento = "Allarme tamper centrale";
                      break;
                    case "05":
                      evento = "Allarme tamper tastiera";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "06":
                      evento = "Allarme mancanza risposta espansione radio";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "07":
                      evento = "Allarme tamper espansione radio";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "08":
                      evento = "Allarme tamper espansione zone";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "09":
                      evento = "Allarme jammer radio";
                      break;
                    case "10":
                      evento = "Allarme mascheramento zone radio";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "0A":
                  switch (dato8) {
                    case "00":
                      evento = "Rapina per codice anticoercizione";
                      break;
                    case "01":
                      evento = "Rapina per disinserimento";
                      break;
                    case "02":
                      evento = "Rapina da telecomando";
                      break;
                  }
                case "0B":
                  switch (dato8) {
                    case "00":
                      evento = "Guasto mancanza rete";
                      break;
                    case "01":
                      evento = "Ripristino guasto mancanza rete";
                      break;
                    case "02":
                      evento = "Guasto batteria scarica";
                      break;
                    case "03":
                      evento = "Ripristino guasto batteria scarica";
                      break;
                    case "04":
                      evento = "Guasto fusibile";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "05":
                      evento = "Ripristino guasto fusibile";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "06":
                      evento = "Guasto alimentazione bassa";
                      break;
                    case "07":
                      evento = "Errori su RS485";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "0C":
                  switch (dato8) {
                    case "00":
                      evento = "Inizio programmazione";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "01":
                      evento = "Fine programmazione";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "02":
                      evento = "Inizio blocco";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "03":
                      evento = "Fine blocco";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "04":
                      evento = "Inizio blocco sirene";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "05":
                      evento = "Fine blocco sirene";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "06":
                      evento = "Riavvio centrale";
                      break;
                    case "07":
                      evento = "Abilitazione timer (fine blocco)";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "08":
                      evento = "Disabilitazione timer (inizio blocco)";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "09":
                      evento = "Abilitazione codici installatore";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "0A":
                      evento = "Disabilitazione codici installatore";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "0D":
                  switch (dato8) {
                    case "00":
                      evento = "Inizio avvisi comunicatore";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "01":
                      evento = "Fine avvisi comunicatore";
                      sestaColonna = dato6;
                      break;
                    case "02":
                      evento = "Inizio chiamata entrante comunicatore";
                      if (dato6 == "ff") {
                        sestaColonna = "Numero non presente";
                      } else {
                        sestaColonna = binToDec(dato6);
                      }
                      break;
                    case "03":
                      evento = "Fine chiamata entrante comunicatore";
                      if (binarioAdEsadecimale(dato6) == "ff") {
                        sestaColonna = "Numero non presente";
                      } else {
                        sestaColonna = binToDec(dato6);
                      }
                      break;
                    case "04":
                      evento = "Inizio segnale assente comunicatore";
                      break;
                    case "05":
                      evento = "Fine segnale assente comunicatore";
                      break;
                    case "06":
                      evento = "Inizio segnale basso comunicatore";
                      break;
                    case "07":
                      evento = "Fine segnale basso comunicatore";
                      break;
                    case "08":
                      evento = "Inizio jamming comunicatore";
                      break;
                    case "09":
                      evento = "Fine jamming comunicatore";
                      break;
                    case "0A":
                      evento = "Inizio ascolto ambientale comunicatore";
                      break;
                    case "0B":
                      evento = "Fine ascolto ambientale";
                      break;
                    case "0C":
                      evento = "Inizio credito basso comunicatore";
                      break;
                    case "0D":
                      evento = "Fine credito basso comunicatore";
                      break;
                    case "0E":
                      evento = "Inizio scadenza SIM comunicatore";
                      break;
                    case "0F":
                      evento = "Fine scadenza SIM comunicatore";
                      break;
                    case "10":
                      evento = "Inizio blocco chiamate comunicatore";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "11":
                      evento = "Fine blocco chiamate comunicatore";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "12":
                      evento = "Life test comunicatore";
                      break;
                    case "13":
                      evento = "Connessione cloud";
                      break;
                    case "14":
                      evento = "Disconnessione cloud";
                      switch (binarioAdEsadecimale(dato6)) {
                        case "01":
                          sestaColonna = "rete";
                          break;
                        case "02":
                          sestaColonna = "timeout";
                          break;
                        case "04":
                          sestaColonna = "impianto sconosciuto";
                          break;
                        case "08":
                          sestaColonna =
                            "impianto non abilitato/impianto già connesso";
                          break;
                        case "10":
                          sestaColonna = "stop da locale";
                          break;
                      }
                    case "15":
                      evento = "Blocco connessione cloud";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "16":
                      evento = "Sblocco connessione cloud";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "0E":
                  evento = "Cancellazione storico eventi";
                  sestaColonna = binToDec(dato6);
                  break;
                case "0F":
                  evento = "Attivazione uscita";
                  sestaColonna = binToDec(dato6);
                  riferimento = binToDec(dato8);
                  break;
                case "10":
                  evento = "Disattivazione uscita";
                  sestaColonna = binToDec(dato6);
                  riferimento = binToDec(dato8);
                  break;
                case "11":
                  switch (dato8) {
                    case "00":
                      evento =
                        "Aggiunta memoria mancanza risposta espansione ingressi";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "01":
                      evento =
                        "Aggiunta memoria mancanza risposta comunicatore";
                      break;
                    case "02":
                      evento = "Aggiunta memoria tamper centrale";
                      break;
                    case "03":
                      evento = "Aggiunta memoria tamper tastiera";
                      sestaColonna = binToDec(dato6);
                      break;
                    case "04":
                      evento =
                        "Aggiunta memoria mancata risposta espansione radio";
                      sestaColonna = binToDec(dato6);
                      break;
                  }
                case "12":
                  evento = "Reinclusione tamper centrale";
                  sestaColonna = binToDec(dato6);
                  break;
                case "13":
                  evento = "Esclusione tamper centrale";
                  sestaColonna = binToDec(dato6);
                  break;
                case "14":
                  evento = "Reset preavviso inserimento in corso";
                  sestaColonna = binToDec(dato6);
                  riferimento = dato8;
                  break;
                case "15":
                  evento = "Mancata risposta su zona radio";
                  riferimento = dato8;
                  break;
                case "14":
                  evento = "Batteria scarica su zona radio";
                  sestaColonna = binToDec(dato6);
                  riferimento = dato8;
                  break;
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
              dato36,
              dato37,
              dato38,
              dato39,
              dato40
            );
            blocchetto[5] = convertiDati(
              dato41,
              dato42,
              dato43,
              dato44,
              dato45,
              dato46,
              dato47,
              dato48
            );
            blocchetto[6] = convertiDati(
              dato49,
              dato50,
              dato51,
              dato52,
              dato53,
              dato54,
              dato55,
              dato56
            );
            blocchetto[7] = convertiDati(
              dato57,
              dato58,
              dato59,
              dato60,
              dato61,
              dato62,
              dato63,
              dato64
            );
            blocchetto[8] = convertiDati(
              dato65,
              dato66,
              dato67,
              dato68,
              dato69,
              dato70,
              dato71,
              dato72
            );
            blocchetto[9] = convertiDati(
              dato73,
              dato74,
              dato75,
              dato76,
              dato77,
              dato78,
              dato79,
              dato80
            );
            blocchetto[10] = convertiDati(
              dato81,
              dato82,
              dato83,
              dato84,
              dato85,
              dato86,
              dato87,
              dato88
            );
            blocchetto[11] = convertiDati(
              dato89,
              dato90,
              dato91,
              dato92,
              dato93,
              dato94,
              dato95,
              dato96
            );
            blocchetto[12] = convertiDati(
              dato97,
              dato98,
              dato99,
              dato100,
              dato101,
              dato102,
              dato103,
              dato104
            );
            blocchetto[13] = convertiDati(
              dato105,
              dato106,
              dato107,
              dato108,
              dato109,
              dato110,
              dato111,
              dato112
            );
            blocchetto[14] = convertiDati(
              dato113,
              dato114,
              dato115,
              dato116,
              dato117,
              dato118,
              dato119,
              dato120
            );
            blocchetto[15] = convertiDati(
              dato121,
              dato122,
              dato123,
              dato124,
              dato125,
              dato126,
              dato127,
              dato128
            );
            function riempiEsito(payload, blocco, blocchetto) {
              return {
                payload: payload,
                blocco: blocco,
                blocchetto: blocchetto,
              };
            }
            let esito = riempiEsito(payload, blocco, blocchetto);
            exports.esito = esito;
            server.mandaEsito();
          }
          if (payload == "0d") {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            blocco = result[3];
            ultimoNumero = hexToDecimal(result[4]);
            function riempiEsito(payload, blocco, ultimoNumero) {
              return {
                payload: payload,
                blocco: blocco,
                ultimoNumero: ultimoNumero,
              };
            }
            let esito = riempiEsito(payload, blocco, ultimoNumero);
            exports.esito = esito;
            server.mandaEsito();
          }
        }
      }
    }
  });
}
exports.entrata = entrata;
exports.port = port;
