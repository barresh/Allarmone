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
//array dello stato delle zone
var arrayzone = [];
var arrayaree = [];
var arrayareeinserite = [];
var mancanzaRispostaEspansione = [];
var mancanzaRispostaEspansioneRadio = [];
var uscite = [];
var areeAperte = [];
var zoneAperte = [];
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
              var colonna13bin = hex2bin(result[9]);
              var colonna14bin = hex2bin(result[10]);
              //15 e 16 0001 lasciare stare presenza negativo ecc
              var colonna15bin = hex2bin(result[11]);
              var colonna16bin = hex2bin(result[12]);
              var colonna17bin = hex2bin(result[13]);
              var colonna18bin = hex2bin(result[14]);
              var colonna19bin = hex2bin(result[15]);
              var colonna20bin = hex2bin(result[16]);
              var colonna21bin = hex2bin(result[17]);
              var colonna22bin = hex2bin(result[18]);
              var colonna23bin = hex2bin(result[19]);
              var colonna24bin = hex2bin(result[20]);
              var colonna25bin = hex2bin(result[21]);
              var colonna26bin = hex2bin(result[22]);
              var colonna27bin = hex2bin(result[23]);
              var colonna28bin = hex2bin(result[24]);
              var colonna29bin = hex2bin(result[25]);
              var colonna30bin = hex2bin(result[26]);
              var colonna31bin = hex2bin(result[27]);
              var colonna32bin = hex2bin(result[28]);
              var colonna33bin = hex2bin(result[29]);
              var colonna34bin = hex2bin(result[30]);
              var colonna35bin = hex2bin(result[31]);
              var colonna36bin = hex2bin(result[32]);
              var colonna37bin = hex2bin(result[33]);
              var colonna38bin = hex2bin(result[34]);
              var colonna39bin = hex2bin(result[35]);
              var colonna40bin = hex2bin(result[36]);
              var colonna41bin = hex2bin(result[37]);
              var colonna42bin = hex2bin(result[38]);
              var colonna43bin = hex2bin(result[39]);
              var colonna44bin = hex2bin(result[40]);
              var colonna45bin = hex2bin(result[41]);
              var colonna46bin = hex2bin(result[42]);
              var colonna47bin = hex2bin(result[43]);
              var colonna48bin = hex2bin(result[44]);
              var colonna49bin = hex2bin(result[45]);
              var colonna50bin = hex2bin(result[46]);
              var colonna51bin = hex2bin(result[47]);
              var colonna52bin = hex2bin(result[48]);
              var colonna53bin = hex2bin(result[49]);
              var colonna54bin = hex2bin(result[50]);
              var colonna55bin = hex2bin(result[51]);
              var colonna56bin = hex2bin(result[52]);
              var colonna57bin = hex2bin(result[53]);
              var colonna58bin = hex2bin(result[54]);
              var colonna59bin = hex2bin(result[55]);
              var colonna60bin = hex2bin(result[56]);
              var colonna61bin = hex2bin(result[57]);
              var colonna62bin = hex2bin(result[58]);
              var colonna63bin = hex2bin(result[59]);
              var colonna64bin = hex2bin(result[60]);
              var colonna65bin = hex2bin(result[61]);
              var colonna66bin = hex2bin(result[62]);
              var colonna67bin = hex2bin(result[63]);
              var colonna68bin = hex2bin(result[64]);
              var colonna69bin = hex2bin(result[65]);
              var colonna70bin = hex2bin(result[66]);
              var colonna71bin = hex2bin(result[67]);
              var colonna72bin = hex2bin(result[68]);
              var colonna73bin = hex2bin(result[69]);
              var colonna74bin = hex2bin(result[70]);
              var colonna75bin = hex2bin(result[71]);
              var colonna76bin = hex2bin(result[72]);
              var colonna77bin = hex2bin(result[73]);
              var colonna78bin = hex2bin(result[74]);
              var colonna79bin = hex2bin(result[75]);
              var colonna80bin = hex2bin(result[76]);
              var colonna81bin = hex2bin(result[77]);
              var colonna82bin = hex2bin(result[78]);
              var colonna83bin = hex2bin(result[79]);
              var colonna84bin = hex2bin(result[80]);
              var colonna85bin = hex2bin(result[81]);
              var colonna86bin = hex2bin(result[82]);
              var colonna87bin = hex2bin(result[83]);
              var colonna88bin = hex2bin(result[84]);
              var colonna89bin = hex2bin(result[85]);
              var colonna90bin = hex2bin(result[86]);
              var colonna91bin = hex2bin(result[87]);
              var colonna92bin = hex2bin(result[88]);
              var colonna93bin = hex2bin(result[89]);
              var colonna94bin = hex2bin(result[90]);
              var colonna95bin = hex2bin(result[91]);
              var colonna96bin = hex2bin(result[92]);
              var colonna97bin = hex2bin(result[93]);
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
                  switch (colonna18bin.slice(0, 1)) {
                    case "1":
                      console.log("zona 8 aperta");
                      arrayzone[7] = 1;
                      break;
                    case "0":
                      arrayzone[7] = 0;
                      break;
                  }
                  switch (colonna18bin.slice(1, 2)) {
                    case "1":
                      console.log("zona 7 aperta");
                      arrayzone[6] = 1;
                      break;
                    case "0":
                      arrayzone[6] = 0;
                      break;
                  }
                  switch (colonna18bin.slice(2, 3)) {
                    case "1":
                      console.log("zona 6 aperta");
                      arrayzone[5] = 1;
                      break;
                    case "0":
                      arrayzone[5] = 0;
                      break;
                  }
                  switch (colonna18bin.slice(3, 4)) {
                    case "1":
                      console.log("zona 5 aperta");
                      arrayzone[4] = 1;
                      break;
                    case "0":
                      arrayzone[4] = 0;
                      break;
                  }
                  switch (colonna18bin.slice(4, 5)) {
                    case "1":
                      console.log("zona 4 aperta");
                      arrayzone[3] = 1;
                      break;
                    case "0":
                      arrayzone[3] = 0;
                      break;
                  }
                  switch (colonna18bin.slice(5, 6)) {
                    case "1":
                      console.log("zona 3 aperta");
                      arrayzone[2] = 1;
                      break;
                    case "0":
                      arrayzone[2] = 0;
                      break;
                  }
                  switch (colonna18bin.slice(6, 7)) {
                    case "1":
                      console.log("zona 2 aperta");
                      arrayzone[1] = 1;
                      break;
                    case "0":
                      arrayzone[1] = 0;
                      break;
                  }
                  switch (colonna18bin.slice(7, 8)) {
                    case "1":
                      console.log("zona 1 aperta");
                      arrayzone[0] = 1;
                      console.log(arrayzone);
                      break;
                    case "0":
                      arrayzone[0] = 0;
                      console.log(arrayzone);
                      break;
                  }
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

              function binarioInArray(binario, destinazione) {
                for (let i = 0; i < binario.length; i++) {
                  destinazione[i] = binario[i] === "1" ? 1 : 0;
                }
              }
              function binarioInArray2(binario, destinazione) {
                for (let i = 8; i < 16; i++) {
                  destinazione[i] = binario[i] === "1" ? 1 : 0;
                }
              }
              function binarioInArray3(binario, destinazione) {
                for (let i = 16; i < 24; i++) {
                  destinazione[i] = binario[i] === "1" ? 1 : 0;
                }
              }
              function binarioInArray4(binario, destinazione) {
                for (let i = 24; i < 32; i++) {
                  destinazione[i] = binario[i] === "1" ? 1 : 0;
                }
              }
              function binarioInArray5(binario, destinazione) {
                for (let i = 32; i < 40; i++) {
                  destinazione[i] = binario[i] === "1" ? 1 : 0;
                }
              }
              function binarioInArray6(binario, destinazione) {
                for (let i = 40; i < 48; i++) {
                  destinazione[i] = binario[i] === "1" ? 1 : 0;
                }
              }
              function binarioInArray7(binario, destinazione) {
                for (let i = 48; i < 56; i++) {
                  destinazione[i] = binario[i] === "1" ? 1 : 0;
                }
              }
              function binarioInArray8(binario, destinazione) {
                for (let i = 56; i < 64; i++) {
                  destinazione[i] = binario[i] === "1" ? 1 : 0;
                }
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
              uscite,
              areeAperte,
              zoneAperte,
              mancanzaRispostaEspansione,
              arrayaree,
              arrayareeinserite,
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
                uscite: uscite,
                areeAperte: areeAperte,
                zoneAperte: zoneAperte,
                mancanzaRispostaEspansione: mancanzaRispostaEspansione,
                arrayaree: arrayaree,
                arrayareeinserite: arrayareeinserite,
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
              uscite,
              areeAperte,
              zoneAperte,
              mancanzaRispostaEspansione,
              arrayaree,
              arrayareeinserite,
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
            server.mandaEsito();
          }
          if (payload == 02) {
            const result = bufferino.match(/.{1,2}/g) ?? [];
            var colonna10bin = hex2bin(result[4]);
            var colonna11bin = hex2bin(result[5]);
            var colonna12bin = hex2bin(result[6]);
            var colonna13bin = hex2bin(result[7]);
            var colonna14bin = hex2bin(result[8]);
            var colonna15bin = hex2bin(result[9]);
            var colonna16bin = hex2bin(result[10]);
            var colonna17bin = hex2bin(result[11]);
            var colonna18bin = hex2bin(result[12]);
            var colonna19bin = hex2bin(result[13]);
            var colonna20bin = hex2bin(result[14]);
            var colonna21bin = hex2bin(result[15]);
            var colonna22bin = hex2bin(result[16]);
            var colonna23bin = hex2bin(result[17]);
            var colonna24bin = hex2bin(result[18]);
            var colonna25bin = hex2bin(result[19]);
            var colonna26bin = hex2bin(result[20]);
            var colonna27bin = hex2bin(result[21]);
            var colonna28bin = hex2bin(result[22]);
            var colonna29bin = hex2bin(result[23]);
            var colonna30bin = hex2bin(result[24]);
            var colonna31bin = hex2bin(result[25]);
            var colonna32bin = hex2bin(result[26]);
            var colonna33bin = hex2bin(result[27]);
            var colonna34bin = hex2bin(result[28]);
            var colonna35bin = hex2bin(result[29]);
            var colonna36bin = hex2bin(result[30]);
            var colonna37bin = hex2bin(result[31]);
            var colonna38bin = hex2bin(result[32]);
            var colonna39bin = hex2bin(result[33]);
            var colonna40bin = hex2bin(result[34]);
            var colonna41bin = hex2bin(result[35]);
            var colonna42bin = hex2bin(result[36]);
            var colonna43bin = hex2bin(result[37]);
            var colonna44bin = hex2bin(result[38]);
            var colonna45bin = hex2bin(result[39]);
            var colonna46bin = hex2bin(result[40]);
            var colonna47bin = hex2bin(result[41]);
            var colonna48bin = hex2bin(result[42]);
            var colonna49bin = hex2bin(result[43]);
            var colonna50bin = hex2bin(result[44]);
            var colonna51bin = hex2bin(result[45]);
            var colonna52bin = hex2bin(result[46]);
            var colonna53bin = hex2bin(result[47]);
            var colonna54bin = hex2bin(result[48]);
            var colonna55bin = hex2bin(result[49]);
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
            function binarioInArray(binario, destinazione) {
              for (let i = 0; i < binario.length; i++) {
                destinazione[i] = binario[i] === "1" ? 1 : 0;
              }
            }
            function binarioInArray2(binario, destinazione) {
              for (let i = 8; i < 16; i++) {
                destinazione[i] = binario[i] === "1" ? 1 : 0;
              }
            }
            function binarioInArray3(binario, destinazione) {
              for (let i = 16; i < 24; i++) {
                destinazione[i] = binario[i] === "1" ? 1 : 0;
              }
            }
            function binarioInArray4(binario, destinazione) {
              for (let i = 24; i < 32; i++) {
                destinazione[i] = binario[i] === "1" ? 1 : 0;
              }
            }
            function binarioInArray5(binario, destinazione) {
              for (let i = 32; i < 40; i++) {
                destinazione[i] = binario[i] === "1" ? 1 : 0;
              }
            }
            function binarioInArray6(binario, destinazione) {
              for (let i = 40; i < 48; i++) {
                destinazione[i] = binario[i] === "1" ? 1 : 0;
              }
            }
            function binarioInArray7(binario, destinazione) {
              for (let i = 48; i < 56; i++) {
                destinazione[i] = binario[i] === "1" ? 1 : 0;
              }
            }
            function binarioInArray8(binario, destinazione) {
              for (let i = 56; i < 64; i++) {
                destinazione[i] = binario[i] === "1" ? 1 : 0;
              }
            }
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
              usciteAbilitate,
              usciteConFunzionamentoManuale,
              zoneAbilitate,
              zoneA,
              zoneB,
              zoneC,
              zoneD
            ) {
              return {
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
            var colonna4 = bufferino.slice(6, 8);
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna4bin = hex2bin(colonna4);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var tipoutente;
            var numeroutente;
            var risultato;
            console.log("non inserito perché aperto:", colonna6bin);
            console.log("ENTRA PAYLOAD GIUSTO");
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

            if (colonna5bin.slice(7, 8) == 1) {
              risultato = "area 1 appena inserita";
              areeInserite[0] = 1;
            } else if (colonna5bin.slice(7, 8) == 0) {
              areeInserite[0] = 0;
            }
            if (colonna5bin.slice(6, 7) == 1) {
              risultato = "area 2 appena inserita";
              areeInserite[1] = 1;
            } else if (colonna5bin.slice(6, 7) == 0) {
              areeInserite[1] = 0;
            }
            if (colonna5bin.slice(5, 6) == 1) {
              risultato = "area 3 appena inserita";
              areeInserite[2] = 1;
            } else if (colonna5bin.slice(5, 6) == 0) {
              areeInserite[2] = 0;
            }
            if (colonna5bin.slice(4, 5) == 1) {
              risultato = "area 4 appena inserita";
              areeInserite[3] = 1;
            } else if (colonna5bin.slice(4, 5) == 0) {
              risultato = "area 4 appena inserita";
              areeInserite[3] = 0;
            }

            if (colonna6bin.slice(7, 8) == 1) {
              risultato = "area 1 non inserita perchè aperta";
              areeNonInserite[0] = 1;
            } else if (colonna6bin.slice(7, 8) == 0) {
              areeNonInserite[0] = 0;
            }
            if (colonna6bin.slice(6, 7) == 1) {
              risultato = "area 2 non inserita perché aperta";
              areeNonInserite[1] = 1;
            } else if (colonna6bin.slice(6, 7) == 0) {
              areeNonInserite[1] = 0;
            }
            if (colonna6bin.slice(5, 6) == 1) {
              risultato = "area 3 non inserita perché aperta";
              areeNonInserite[2] = 1;
            } else if (colonna6bin.slice(5, 6) == 0) {
              areeNonInserite[2] = 0;
            }
            if (colonna6bin.slice(4, 5) == 1) {
              risultato = "area 4 non inserita perché aperta";
              areeNonInserite[3] = 1;
            } else if (colonna6bin.slice(4, 5) == 0) {
              risultato = "area 4 non inserita perché aperta";
              areeNonInserite[3] = 0;
            }

            if (colonna7 != "00") {
              if (colonna7bin.slice(7, 8) == 1) {
                risultato = "area 1 ha provocato reset";
                areeReset[0] = 1;
              }
              if (colonna7bin.slice(6, 7) == 1) {
                risultato = "area 2 ha provocato reset";
                areeReset[1] = 1;
              }
              if (colonna7bin.slice(5, 6) == 1) {
                risultato = "area 3 ha provocato reset";
                areeReset[2] = 1;
              }
              if (colonna7bin.slice(4, 5) == 1) {
                risultato = "area 4 ha provocato reset";
                areeReset[3] = 1;
              }
              if (colonna8 != "00") {
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
              }
            }
            console.log("areeInserite:", areeInserite);
            function riempiEsito(
              areeInserite,
              areeNonInserite,
              areeReset,
              motivazione
            ) {
              return {
                areeInserite: areeInserite,
                areeNonInserite: areeNonInserite,
                areeReset: areeReset,
                motivazione: motivazione,
              };
            }
            let esito = riempiEsito(
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
            var colonna4 = bufferino.slice(6, 8);
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna4bin = hex2bin(colonna4);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var tipoutente;
            var numeroutente;
            var risultato;
            console.log("non inserito perché aperto:", colonna6bin);
            console.log("ENTRA PAYLOAD GIUSTO");
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

            if (colonna5bin.slice(7, 8) == 1) {
              risultato = "area 1 appena inserita";
              areeInserite[0] = 1;
            } else if (colonna5bin.slice(7, 8) == 0) {
              areeInserite[0] = 0;
            }
            if (colonna5bin.slice(6, 7) == 1) {
              risultato = "area 2 appena inserita";
              areeInserite[1] = 1;
            } else if (colonna5bin.slice(6, 7) == 0) {
              areeInserite[1] = 0;
            }
            if (colonna5bin.slice(5, 6) == 1) {
              risultato = "area 3 appena inserita";
              areeInserite[2] = 1;
            } else if (colonna5bin.slice(5, 6) == 0) {
              areeInserite[2] = 0;
            }
            if (colonna5bin.slice(4, 5) == 1) {
              risultato = "area 4 appena inserita";
              areeInserite[3] = 1;
            } else if (colonna5bin.slice(4, 5) == 0) {
              risultato = "area 4 appena inserita";
              areeInserite[3] = 0;
            }
            if (colonna7 != "00") {
              if (colonna7bin.slice(7, 8) == 1) {
                risultato = "area 1 ha provocato reset";
                areeReset[0] = 1;
              }
              if (colonna7bin.slice(6, 7) == 1) {
                risultato = "area 2 ha provocato reset";
                areeReset[1] = 1;
              }
              if (colonna7bin.slice(5, 6) == 1) {
                risultato = "area 3 ha provocato reset";
                areeReset[2] = 1;
              }
              if (colonna7bin.slice(4, 5) == 1) {
                risultato = "area 4 ha provocato reset";
                areeReset[3] = 1;
              }
              if (colonna8 != "00") {
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
              }
            }
            function riempiEsito(areeInserite, areeReset, motivazione) {
              return {
                areeDisinserite: areeInserite,
                areeReset: areeReset,
                motivazione: motivazione,
              };
            }
            let esito = riempiEsito(areeInserite, areeReset, motivazione);
            exports.esito = esito;
            if (esito) {
              server.mandaEsito();
            }
          }
          if (payload == "06") {
            var colonna4 = bufferino.slice(6, 8);
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna9 = bufferino.slice(16, 18);
            var colonna10 = bufferino.slice(18, 20);
            var colonna11 = bufferino.slice(20, 22);
            var colonna4bin = hex2bin(colonna4);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var colonna9bin = hex2bin(colonna9);
            var colonna10bin = hex2bin(colonna10);
            var colonna11bin = hex2bin(colonna11);
            if (colonna4 != "00") {
              switch (colonna4bin) {
                case "10000000":
                  risultato = "zone all mem 8";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zone all mem 7";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zone all mem 6";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zone all mem 5";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zone all mem 4";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zone all mem 3";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zone all mem 2";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zone all mem 1";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna5 != "00") {
              switch (colonna5bin) {
                case "10000000":
                  risultato = "zone all mem 16";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zone all mem 15";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zone all mem 14";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zone all mem 13";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zone all mem 12";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zone all mem 11";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zone all mem 10";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zone all mem 9";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna6 != "00") {
              switch (colonna6bin) {
                case "10000000":
                  risultato = "zone all mem 24";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zone all mem 23";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zone all mem 22";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zone all mem 21";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zone all mem 20";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zone all mem 19";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zone all mem 18";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zone all mem 17";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna7 != "00") {
              switch (colonna7bin) {
                case "10000000":
                  risultato = "zone all mem 32";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zone all mem 31";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zone all mem 30";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zone all mem 29";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zone all mem 28";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zone all mem 27";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zone all mem 26";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zone all mem 25";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna8 != "00") {
              switch (colonna8bin) {
                case "10000000":
                  risultato = "zone all mem 40";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zone all mem 39";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zone all mem 38";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zone all mem 37";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zone all mem 36";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zone all mem 35";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zone all mem 34";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zone all mem 33";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna9 != "00") {
              switch (colonna9bin) {
                case "10000000":
                  risultato = "zone all mem 48";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zone all mem 47";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zone all mem 46";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zone all mem 45";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zone all mem 44";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zone all mem 43";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zone all mem 42";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zone all mem 41";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna10 != "00") {
              switch (colonna10bin) {
                case "10000000":
                  risultato = "zone all mem 56";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zone all mem 55";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zone all mem 54";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zone all mem 53";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zone all mem 52";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zone all mem 51";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zone all mem 50";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zone all mem 49";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna11 != "00") {
              switch (colonna11bin) {
                case "10000000":
                  risultato = "zone all mem 64";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zone all mem 63";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zone all mem 62";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zone all mem 61";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zone all mem 60";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zone all mem 59";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zone all mem 58";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zone all mem 57";
                  console.log(risultato);
                  break;
              }
            }
          }
          if (payload == "08") {
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna9 = bufferino.slice(16, 18);
            var colonna10 = bufferino.slice(18, 20);
            var colonna11 = bufferino.slice(20, 22);
            var colonna12 = bufferino.slice(22, 24);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var colonna9bin = hex2bin(colonna9);
            var colonna10bin = hex2bin(colonna10);
            var colonna11bin = hex2bin(colonna11);
            var colonna12bin = hex2bin(colonna12);
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            var tipoutente;
            var numeroutente;
            var risultato;
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
            if (colonna5 != "00") {
              switch (colonna5bin) {
                case "10000000":
                  risultato = "zona esclusa 8";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona esclusa 7";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona esclusa 6";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona esclusa 5";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona esclusa 4";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona esclusa 3";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona esclusa 2";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona esclusa 1";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna6 != "00") {
              switch (colonna6bin) {
                case "10000000":
                  risultato = "zona esclusa 16";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona esclusa 15";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona esclusa 14";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona esclusa 13";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona esclusa 12";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona esclusa 11";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona esclusa 10";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona esclusa 9";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna7 != "00") {
              switch (colonna7bin) {
                case "10000000":
                  risultato = "zona esclusa 24";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona esclusa 23";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona esclusa 22";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona esclusa 21";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona esclusa 20";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona esclusa 19";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona esclusa 18";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona esclusa 17";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna8 != "00") {
              switch (colonna8bin) {
                case "10000000":
                  risultato = "zona esclusa 32";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona esclusa 31";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona esclusa 30";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona esclusa 29";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona esclusa 28";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona esclusa 27";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona esclusa 26";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona esclusa 25";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna9 != "00") {
              switch (colonna9bin) {
                case "10000000":
                  risultato = "zona esclusa 40";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona esclusa 39";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona esclusa 38";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona esclusa 37";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona esclusa 36";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona esclusa 35";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona esclusa 34";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona esclusa 33";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna10 != "00") {
              switch (colonna10bin) {
                case "10000000":
                  risultato = "zona esclusa 48";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona esclusa 47";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona esclusa 46";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona esclusa 45";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona esclusa 44";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona esclusa 43";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona esclusa 42";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona esclusa 41";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna11 != "00") {
              switch (colonna11bin) {
                case "10000000":
                  risultato = "zona esclusa 56";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona esclusa 55";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona esclusa 54";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona esclusa 53";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona esclusa 52";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona esclusa 51";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona esclusa 50";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona esclusa 49";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna12 != "00") {
              switch (colonna12bin) {
                case "10000000":
                  risultato = "zona esclusa 64";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona esclusa 63";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona esclusa 62";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona esclusa 61";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona esclusa 60";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona esclusa 59";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona esclusa 58";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona esclusa 57";
                  console.log(risultato);
                  break;
              }
            }
          }
          if (payload == "09") {
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna9 = bufferino.slice(16, 18);
            var colonna10 = bufferino.slice(18, 20);
            var colonna11 = bufferino.slice(20, 22);
            var colonna12 = bufferino.slice(22, 24);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var colonna9bin = hex2bin(colonna9);
            var colonna10bin = hex2bin(colonna10);
            var colonna11bin = hex2bin(colonna11);
            var colonna12bin = hex2bin(colonna12);
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            var tipoutente;
            var numeroutente;
            var risultato;
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
            if (colonna5 != "00") {
              switch (colonna5bin) {
                case "10000000":
                  risultato = "zona inclusa 8";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona inclusa 7";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona inclusa 6";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona inclusa 5";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona inclusa 4";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona inclusa 3";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona inclusa 2";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona inclusa 1";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna6 != "00") {
              switch (colonna6bin) {
                case "10000000":
                  risultato = "zona inclusa 16";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona inclusa 15";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona inclusa 14";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona inclusa 13";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona inclusa 12";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona inclusa 11";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona inclusa 10";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona inclusa 9";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna7 != "00") {
              switch (colonna7bin) {
                case "10000000":
                  risultato = "zona inclusa 24";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona inclusa 23";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona inclusa 22";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona inclusa 21";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona inclusa 20";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona inclusa 19";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona inclusa 18";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona inclusa 17";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna8 != "00") {
              switch (colonna8bin) {
                case "10000000":
                  risultato = "zona inclusa 32";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona inclusa 31";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona inclusa 30";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona inclusa 29";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona inclusa 28";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona inclusa 27";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona inclusa 26";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona inclusa 25";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna9 != "00") {
              switch (colonna9bin) {
                case "10000000":
                  risultato = "zona inclusa 40";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona inclusa 39";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona inclusa 38";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona inclusa 37";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona inclusa 36";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona inclusa 35";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona inclusa 34";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona inclusa 33";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna10 != "00") {
              switch (colonna10bin) {
                case "10000000":
                  risultato = "zona inclusa 48";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona inclusa 47";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona inclusa 46";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona inclusa 45";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona inclusa 44";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona inclusa 43";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona inclusa 42";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona inclusa 41";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna11 != "00") {
              switch (colonna11bin) {
                case "10000000":
                  risultato = "zona inclusa 56";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona inclusa 55";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona inclusa 54";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona inclusa 53";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona inclusa 52";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona inclusa 51";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona inclusa 50";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona inclusa 49";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna12 != "00") {
              switch (colonna12bin) {
                case "10000000":
                  risultato = "zona inclusa 64";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona inclusa 63";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona inclusa 62";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona inclusa 61";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona inclusa 60";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona inclusa 59";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona inclusa 58";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona inclusa 57";
                  console.log(risultato);
                  break;
              }
            }
          }
          if (payload == "0A") {
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna9 = bufferino.slice(16, 18);
            var colonna10 = bufferino.slice(18, 20);
            var colonna11 = bufferino.slice(20, 22);
            var colonna4 = bufferino.slice(6, 8);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var colonna9bin = hex2bin(colonna9);
            var colonna10bin = hex2bin(colonna10);
            var colonna11bin = hex2bin(colonna11);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin) {
                case "10000000":
                  risultato = "zona rapina 8";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona rapina 7";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona rapina 6";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona rapina 5";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona rapina 4";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona rapina 3";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona rapina 2";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona rapina 1";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna5 != "00") {
              switch (colonna5bin) {
                case "10000000":
                  risultato = "zona rapina 16";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona rapina 15";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona rapina 14";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona rapina 13";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona rapina 12";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona rapina 11";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona rapina 10";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona rapina 9";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna6 != "00") {
              switch (colonna6bin) {
                case "10000000":
                  risultato = "zona rapina 24";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona rapina 23";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona rapina 22";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona rapina 21";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona rapina 20";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona rapina 19";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona rapina 18";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona rapina 17";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna7 != "00") {
              switch (colonna7bin) {
                case "10000000":
                  risultato = "zona rapina 32";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona rapina 31";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona rapina 30";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona rapina 29";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona rapina 28";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona rapina 27";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona rapina 26";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona rapina 25";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna8 != "00") {
              switch (colonna8bin) {
                case "10000000":
                  risultato = "zona rapina 40";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona rapina 39";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona rapina 38";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona rapina 37";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona rapina 36";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona rapina 35";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona rapina 34";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona rapina 33";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna9 != "00") {
              switch (colonna9bin) {
                case "10000000":
                  risultato = "zona rapina 48";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona rapina 47";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona rapina 46";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona rapina 45";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona rapina 44";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona rapina 43";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona rapina 42";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona rapina 41";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna10 != "00") {
              switch (colonna10bin) {
                case "10000000":
                  risultato = "zona rapina 56";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona rapina 55";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona rapina 54";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona rapina 53";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona rapina 52";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona rapina 51";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona rapina 50";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona rapina 49";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna11 != "00") {
              switch (colonna11bin) {
                case "10000000":
                  risultato = "zona rapina 64";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona rapina 63";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona rapina 62";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona rapina 61";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona rapina 60";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona rapina 59";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona rapina 58";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona rapina 57";
                  console.log(risultato);
                  break;
              }
            }
          }
          if (payload == "0B") {
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna9 = bufferino.slice(16, 18);
            var colonna10 = bufferino.slice(18, 20);
            var colonna11 = bufferino.slice(20, 22);
            var colonna4 = bufferino.slice(6, 8);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var colonna9bin = hex2bin(colonna9);
            var colonna10bin = hex2bin(colonna10);
            var colonna11bin = hex2bin(colonna11);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin) {
                case "10000000":
                  risultato = "zona tamp 8";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona tamp 7";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona tamp 6";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona tamp 5";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona tamp 4";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona tamp 3";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona tamp 2";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona tamp 1";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna5 != "00") {
              switch (colonna5bin) {
                case "10000000":
                  risultato = "zona tamp 16";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona tamp 15";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona tamp 14";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona tamp 13";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona tamp 12";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona tamp 11";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona tamp 10";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona tamp 9";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna6 != "00") {
              switch (colonna6bin) {
                case "10000000":
                  risultato = "zona tamp 24";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona tamp 23";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona tamp 22";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona tamp 21";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona tamp 20";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona tamp 19";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona tamp 18";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona tamp 17";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna7 != "00") {
              switch (colonna7bin) {
                case "10000000":
                  risultato = "zona tamp 32";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona tamp 31";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona tamp 30";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona tamp 29";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona tamp 28";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona tamp 27";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona tamp 26";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona tamp 25";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna8 != "00") {
              switch (colonna8bin) {
                case "10000000":
                  risultato = "zona tamp 40";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona tamp 39";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona tamp 38";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona tamp 37";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona tamp 36";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona tamp 35";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona tamp 34";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona tamp 33";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna9 != "00") {
              switch (colonna9bin) {
                case "10000000":
                  risultato = "zona tamp 48";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona tamp 47";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona tamp 46";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona tamp 45";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona tamp 44";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona tamp 43";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona tamp 42";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona tamp 41";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna10 != "00") {
              switch (colonna10bin) {
                case "10000000":
                  risultato = "zona tamp 56";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona tamp 55";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona tamp 54";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona tamp 53";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona tamp 52";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona tamp 51";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona tamp 50";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona tamp 49";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna11 != "00") {
              switch (colonna11bin) {
                case "10000000":
                  risultato = "zona tamp 64";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona tamp 63";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona tamp 62";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona tamp 61";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona tamp 60";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona tamp 59";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona tamp 58";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona tamp 57";
                  console.log(risultato);
                  break;
              }
            }
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
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna4 = bufferino.slice(6, 8);
            var colonna4bin = hex2bin(colonna4);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            if (colonna5 != "00") {
              switch (colonna5bin.slice(7, 8)) {
                case "1":
                  console.log("area 1 ha agito il reset");
                  arrayareereset[0] = 1;
                  break;
                case "0":
                  console.log("area 1 non ha agito il reset");
                  arrayareereset[0] = 0;
                  break;
              }
              switch (colonna5bin.slice(6, 7)) {
                case "1":
                  console.log("area 2 ha agito il reset");
                  arrayareereset[1] = 1;
                  break;
                case "0":
                  console.log("area 2 non ha agito il reset");
                  arrayareereset[1] = 0;
                  break;
              }
              switch (colonna5bin.slice(5, 6)) {
                case "1":
                  console.log("area 3 ha agito il reset");
                  arrayareereset[2] = 1;
                  break;
                case "0":
                  console.log("area 3 non ha agito il reset");
                  arrayareereset[2] = 0;
                  break;
              }
              switch (colonna5bin.slice(4, 5)) {
                case "1":
                  console.log("area 4 ha agito il reset");
                  arrayareereset[3] = 1;
                  break;
                case "0":
                  console.log("area 4 non ha agito il reset");
                  arrayareereset[3] = 0;
                  break;
              }
            }
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
            var blocco = bufferino.slice(6, 8);
            switch (blocco) {
              case "00":
                var dato1 = bufferino.slice(8, 10);
                var dato2 = bufferino.slice(10, 12);
                var dato3 = bufferino.slice(12, 14);
                var dato4 = bufferino.slice(14, 16);
                var dato5 = bufferino.slice(16, 18);
                var dato6 = bufferino.slice(18, 20);
                var dato7 = bufferino.slice(20, 22);
                var dato8 = bufferino.slice(22, 24);
                var dato9 = bufferino.slice(24, 26);
                var dato10 = bufferino.slice(26, 28);
                var dato11 = bufferino.slice(28, 30);
                var dato12 = bufferino.slice(30, 32);
                var dato13 = bufferino.slice(32, 34);
                var dato14 = bufferino.slice(34, 36);
                var dato15 = bufferino.slice(36, 38);
                var dato16 = bufferino.slice(38, 40);
                var dato17 = bufferino.slice(40, 42);
                var dato18 = bufferino.slice(42, 44);
                var dato19 = bufferino.slice(44, 46);
                var dato20 = bufferino.slice(46, 48);
                var dato21 = bufferino.slice(48, 50);
                var dato22 = bufferino.slice(50, 52);
                var dato23 = bufferino.slice(52, 54);
                var dato24 = bufferino.slice(54, 56);
                var dato25 = bufferino.slice(56, 58);
                var dato26 = bufferino.slice(58, 60);
                var dato27 = bufferino.slice(60, 62);
                var dato28 = bufferino.slice(62, 64);
                var dato29 = bufferino.slice(64, 66);
                var dato30 = bufferino.slice(66, 68);
                var dato31 = bufferino.slice(68, 70);
                var dato32 = bufferino.slice(70, 72);
                var nomesms =
                  hex2asci(dato1) +
                  hex2asci(dato2) +
                  hex2asci(dato3) +
                  hex2asci(dato4) +
                  hex2asci(dato5) +
                  hex2asci(dato6) +
                  hex2asci(dato7) +
                  hex2asci(dato8) +
                  hex2asci(dato9) +
                  hex2asci(dato10) +
                  hex2asci(dato11) +
                  hex2asci(dato12) +
                  hex2asci(dato13) +
                  hex2asci(dato14) +
                  hex2asci(dato15) +
                  hex2asci(dato16);
                var nomecentrale =
                  hex2asci(dato17) +
                  hex2asci(dato18) +
                  hex2asci(dato19) +
                  hex2asci(dato20) +
                  hex2asci(dato21) +
                  hex2asci(dato22) +
                  hex2asci(dato23) +
                  hex2asci(dato24) +
                  hex2asci(dato25) +
                  hex2asci(dato26) +
                  hex2asci(dato27) +
                  hex2asci(dato28) +
                  hex2asci(dato29) +
                  hex2asci(dato30) +
                  hex2asci(dato31) +
                  hex2asci(dato32);
                console.log("nomesms:", nomesms);
                console.log("nomesms:", nomecentrale);
                break;
              case "01":
                var dato1 = bufferino.slice(8, 10);
                var dato2 = bufferino.slice(10, 12);
                var dato3 = bufferino.slice(12, 14);
                var dato4 = bufferino.slice(14, 16);
                var dato5 = bufferino.slice(16, 18);
                var dato6 = bufferino.slice(18, 20);
                var dato7 = bufferino.slice(20, 22);
                var dato8 = bufferino.slice(22, 24);
                var dato9 = bufferino.slice(24, 26);
                var dato10 = bufferino.slice(26, 28);
                var dato11 = bufferino.slice(28, 30);
                var dato12 = bufferino.slice(30, 32);
                var dato13 = bufferino.slice(32, 34);
                var dato14 = bufferino.slice(34, 36);
                var dato15 = bufferino.slice(36, 38);
                var dato16 = bufferino.slice(38, 40);
                var dato17 = bufferino.slice(40, 42);
                var dato18 = bufferino.slice(42, 44);
                var dato19 = bufferino.slice(44, 46);
                var dato20 = bufferino.slice(46, 48);
                var dato21 = bufferino.slice(48, 50);
                var dato22 = bufferino.slice(50, 52);
                var dato23 = bufferino.slice(52, 54);
                var dato24 = bufferino.slice(54, 56);
                var dato25 = bufferino.slice(56, 58);
                var dato26 = bufferino.slice(58, 60);
                var dato27 = bufferino.slice(60, 62);
                var dato28 = bufferino.slice(62, 64);
                var dato29 = bufferino.slice(64, 66);
                var dato30 = bufferino.slice(66, 68);
                var dato31 = bufferino.slice(68, 70);
                var dato32 = bufferino.slice(70, 72);
                var dato33 = bufferino.slice(72, 74);
                var dato34 = bufferino.slice(74, 76);
                var dato35 = bufferino.slice(76, 78);
                var dato36 = bufferino.slice(78, 80);
                var dato37 = bufferino.slice(80, 82);
                var dato38 = bufferino.slice(82, 84);
                var dato39 = bufferino.slice(84, 86);
                var dato40 = bufferino.slice(86, 88);
                var dato41 = bufferino.slice(88, 90);
                var dato42 = bufferino.slice(90, 92);
                var dato43 = bufferino.slice(92, 94);
                var dato44 = bufferino.slice(94, 96);
                var dato45 = bufferino.slice(96, 98);
                var dato46 = bufferino.slice(98, 100);
                var dato47 = bufferino.slice(100, 102);
                var dato48 = bufferino.slice(102, 104);
                var dato49 = bufferino.slice(104, 106);
                var dato50 = bufferino.slice(106, 108);
                var dato51 = bufferino.slice(108, 110);
                var dato52 = bufferino.slice(110, 112);
                var dato53 = bufferino.slice(112, 114);
                var dato54 = bufferino.slice(114, 116);
                var dato55 = bufferino.slice(116, 118);
                var dato56 = bufferino.slice(118, 120);
                var dato57 = bufferino.slice(120, 122);
                var dato58 = bufferino.slice(122, 124);
                var dato59 = bufferino.slice(124, 126);
                var dato60 = bufferino.slice(126, 128);
                var dato61 = bufferino.slice(128, 130);
                var dato62 = bufferino.slice(130, 132);
                var dato63 = bufferino.slice(132, 134);
                var dato64 = bufferino.slice(134, 136);
                var nomeAreaA =
                  hex2asci(dato1) +
                  hex2asci(dato2) +
                  hex2asci(dato3) +
                  hex2asci(dato4) +
                  hex2asci(dato5) +
                  hex2asci(dato6) +
                  hex2asci(dato7) +
                  hex2asci(dato8) +
                  hex2asci(dato9) +
                  hex2asci(dato10) +
                  hex2asci(dato11) +
                  hex2asci(dato12) +
                  hex2asci(dato13) +
                  hex2asci(dato14) +
                  hex2asci(dato15) +
                  hex2asci(dato16);
                var nomeAreaB =
                  hex2asci(dato17) +
                  hex2asci(dato18) +
                  hex2asci(dato19) +
                  hex2asci(dato20) +
                  hex2asci(dato21) +
                  hex2asci(dato22) +
                  hex2asci(dato23) +
                  hex2asci(dato24) +
                  hex2asci(dato25) +
                  hex2asci(dato26) +
                  hex2asci(dato27) +
                  hex2asci(dato28) +
                  hex2asci(dato29) +
                  hex2asci(dato30) +
                  hex2asci(dato31) +
                  hex2asci(dato32);
                var nomeAreaC =
                  hex2asci(dato33) +
                  hex2asci(dato34) +
                  hex2asci(dato35) +
                  hex2asci(dato36) +
                  hex2asci(dato37) +
                  hex2asci(dato38) +
                  hex2asci(dato39) +
                  hex2asci(dato40) +
                  hex2asci(dato41) +
                  hex2asci(dato42) +
                  hex2asci(dato43) +
                  hex2asci(dato44) +
                  hex2asci(dato45) +
                  hex2asci(dato46) +
                  hex2asci(dato47) +
                  hex2asci(dato48);
                var nomeAreaD =
                  hex2asci(dato49) +
                  hex2asci(dato50) +
                  hex2asci(dato51) +
                  hex2asci(dato52) +
                  hex2asci(dato53) +
                  hex2asci(dato54) +
                  hex2asci(dato55) +
                  hex2asci(dato56) +
                  hex2asci(dato57) +
                  hex2asci(dato58) +
                  hex2asci(dato59) +
                  hex2asci(dato60) +
                  hex2asci(dato61) +
                  hex2asci(dato62) +
                  hex2asci(dato63) +
                  hex2asci(dato64);
                console.log("nomeAreaA:", nomeAreaA);
                console.log("nomeAreaB:", nomeAreaB);
                console.log("nomeAreaC:", nomeAreaC);
                console.log("nomeAreaD:", nomeAreaD);
                break;
              case "02":
                var dato1 = bufferino.slice(8, 10);
                var dato2 = bufferino.slice(10, 12);
                var dato3 = bufferino.slice(12, 14);
                var dato4 = bufferino.slice(14, 16);
                var dato5 = bufferino.slice(16, 18);
                var dato6 = bufferino.slice(18, 20);
                var dato7 = bufferino.slice(20, 22);
                var dato8 = bufferino.slice(22, 24);
                var dato9 = bufferino.slice(24, 26);
                var dato10 = bufferino.slice(26, 28);
                var dato11 = bufferino.slice(28, 30);
                var dato12 = bufferino.slice(30, 32);
                var dato13 = bufferino.slice(32, 34);
                var dato14 = bufferino.slice(34, 36);
                var dato15 = bufferino.slice(36, 38);
                var dato16 = bufferino.slice(38, 40);
                var dato17 = bufferino.slice(40, 42);
                var dato18 = bufferino.slice(42, 44);
                var dato19 = bufferino.slice(44, 46);
                var dato20 = bufferino.slice(46, 48);
                var dato21 = bufferino.slice(48, 50);
                var dato22 = bufferino.slice(50, 52);
                var dato23 = bufferino.slice(52, 54);
                var dato24 = bufferino.slice(54, 56);
                var dato25 = bufferino.slice(56, 58);
                var dato26 = bufferino.slice(58, 60);
                var dato27 = bufferino.slice(60, 62);
                var dato28 = bufferino.slice(62, 64);
                var dato29 = bufferino.slice(64, 66);
                var dato30 = bufferino.slice(66, 68);
                var dato31 = bufferino.slice(68, 70);
                var dato32 = bufferino.slice(70, 72);
                var dato33 = bufferino.slice(72, 74);
                var dato34 = bufferino.slice(74, 76);
                var dato35 = bufferino.slice(76, 78);
                var dato36 = bufferino.slice(78, 80);
                var dato37 = bufferino.slice(80, 82);
                var dato38 = bufferino.slice(82, 84);
                var dato39 = bufferino.slice(84, 86);
                var dato40 = bufferino.slice(86, 88);
                var dato41 = bufferino.slice(88, 90);
                var dato42 = bufferino.slice(90, 92);
                var dato43 = bufferino.slice(92, 94);
                var dato44 = bufferino.slice(94, 96);
                var dato45 = bufferino.slice(96, 98);
                var dato46 = bufferino.slice(98, 100);
                var dato47 = bufferino.slice(100, 102);
                var dato48 = bufferino.slice(102, 104);
                var dato49 = bufferino.slice(104, 106);
                var dato50 = bufferino.slice(106, 108);
                var dato51 = bufferino.slice(108, 110);
                var dato52 = bufferino.slice(110, 112);
                var dato53 = bufferino.slice(112, 114);
                var dato54 = bufferino.slice(114, 116);
                var dato55 = bufferino.slice(116, 118);
                var dato56 = bufferino.slice(118, 120);
                var dato57 = bufferino.slice(120, 122);
                var dato58 = bufferino.slice(122, 124);
                var dato59 = bufferino.slice(124, 126);
                var dato60 = bufferino.slice(126, 128);
                var dato61 = bufferino.slice(128, 130);
                var dato62 = bufferino.slice(130, 132);
                var dato63 = bufferino.slice(132, 134);
                var dato64 = bufferino.slice(134, 136);
                var dato65 = bufferino.slice(136, 138);
                var dato66 = bufferino.slice(138, 140);
                var dato67 = bufferino.slice(140, 142);
                var dato68 = bufferino.slice(142, 144);
                var dato69 = bufferino.slice(144, 146);
                var dato70 = bufferino.slice(146, 148);
                var dato71 = bufferino.slice(148, 150);
                var dato72 = bufferino.slice(150, 152);
                var dato73 = bufferino.slice(152, 154);
                var dato74 = bufferino.slice(154, 156);
                var dato75 = bufferino.slice(156, 158);
                var dato76 = bufferino.slice(158, 160);
                var dato77 = bufferino.slice(160, 162);
                var dato78 = bufferino.slice(162, 164);
                var dato79 = bufferino.slice(164, 166);
                var dato80 = bufferino.slice(166, 168);
                var dato81 = bufferino.slice(168, 170);
                var dato82 = bufferino.slice(170, 172);
                var dato83 = bufferino.slice(172, 174);
                var dato84 = bufferino.slice(174, 176);
                var dato85 = bufferino.slice(176, 178);
                var dato86 = bufferino.slice(178, 180);
                var dato87 = bufferino.slice(180, 182);
                var dato88 = bufferino.slice(182, 184);
                var dato89 = bufferino.slice(184, 186);
                var dato90 = bufferino.slice(186, 188);
                var dato91 = bufferino.slice(188, 190);
                var dato92 = bufferino.slice(190, 192);
                var dato93 = bufferino.slice(192, 194);
                var dato94 = bufferino.slice(194, 196);
                var dato95 = bufferino.slice(196, 198);
                var dato96 = bufferino.slice(198, 200);
                var dato97 = bufferino.slice(200, 202);
                var dato98 = bufferino.slice(202, 204);
                var dato99 = bufferino.slice(204, 206);
                var dato100 = bufferino.slice(206, 208);
                var dato101 = bufferino.slice(208, 210);
                var dato102 = bufferino.slice(210, 212);
                var dato103 = bufferino.slice(212, 214);
                var dato104 = bufferino.slice(214, 216);
                var dato105 = bufferino.slice(216, 218);
                var dato106 = bufferino.slice(218, 220);
                var dato107 = bufferino.slice(220, 222);
                var dato108 = bufferino.slice(222, 224);
                var dato109 = bufferino.slice(224, 226);
                var dato110 = bufferino.slice(226, 228);
                var dato111 = bufferino.slice(228, 230);
                var dato112 = bufferino.slice(230, 232);
                var dato113 = bufferino.slice(232, 234);
                var dato114 = bufferino.slice(234, 236);
                var dato115 = bufferino.slice(236, 238);
                var dato116 = bufferino.slice(238, 240);
                var dato117 = bufferino.slice(240, 242);
                var dato118 = bufferino.slice(242, 244);
                var dato119 = bufferino.slice(244, 246);
                var dato120 = bufferino.slice(246, 248);
                var dato121 = bufferino.slice(248, 250);
                var dato122 = bufferino.slice(250, 252);
                var dato123 = bufferino.slice(252, 254);
                var dato124 = bufferino.slice(254, 256);
                var dato125 = bufferino.slice(256, 258);
                var dato126 = bufferino.slice(258, 260);
                var dato127 = bufferino.slice(260, 262);
                var dato128 = bufferino.slice(262, 264);
                var nomeUtenteTastiera1 =
                  hex2asci(dato1) +
                  hex2asci(dato2) +
                  hex2asci(dato3) +
                  hex2asci(dato4) +
                  hex2asci(dato5) +
                  hex2asci(dato6) +
                  hex2asci(dato7) +
                  hex2asci(dato8) +
                  hex2asci(dato9) +
                  hex2asci(dato10) +
                  hex2asci(dato11) +
                  hex2asci(dato12) +
                  hex2asci(dato13) +
                  hex2asci(dato14) +
                  hex2asci(dato15) +
                  hex2asci(dato16);
                var nomeUtenteTastiera2 =
                  hex2asci(dato17) +
                  hex2asci(dato18) +
                  hex2asci(dato19) +
                  hex2asci(dato20) +
                  hex2asci(dato21) +
                  hex2asci(dato22) +
                  hex2asci(dato23) +
                  hex2asci(dato24) +
                  hex2asci(dato25) +
                  hex2asci(dato26) +
                  hex2asci(dato27) +
                  hex2asci(dato28) +
                  hex2asci(dato29) +
                  hex2asci(dato30) +
                  hex2asci(dato31) +
                  hex2asci(dato32);
                var nomeUtenteTastiera3 =
                  hex2asci(dato33) +
                  hex2asci(dato34) +
                  hex2asci(dato35) +
                  hex2asci(dato36) +
                  hex2asci(dato37) +
                  hex2asci(dato38) +
                  hex2asci(dato39) +
                  hex2asci(dato40) +
                  hex2asci(dato41) +
                  hex2asci(dato42) +
                  hex2asci(dato43) +
                  hex2asci(dato44) +
                  hex2asci(dato45) +
                  hex2asci(dato46) +
                  hex2asci(dato47) +
                  hex2asci(dato48);
                var nomeUtenteTastiera4 =
                  hex2asci(dato49) +
                  hex2asci(dato50) +
                  hex2asci(dato51) +
                  hex2asci(dato52) +
                  hex2asci(dato53) +
                  hex2asci(dato54) +
                  hex2asci(dato55) +
                  hex2asci(dato56) +
                  hex2asci(dato57) +
                  hex2asci(dato58) +
                  hex2asci(dato59) +
                  hex2asci(dato60) +
                  hex2asci(dato61) +
                  hex2asci(dato62) +
                  hex2asci(dato63) +
                  hex2asci(dato64);
                var nomeUtenteTastiera5 =
                  hex2asci(dato65) +
                  hex2asci(dato66) +
                  hex2asci(dato67) +
                  hex2asci(dato68) +
                  hex2asci(dato69) +
                  hex2asci(dato70) +
                  hex2asci(dato71) +
                  hex2asci(dato72) +
                  hex2asci(dato73) +
                  hex2asci(dato74) +
                  hex2asci(dato75) +
                  hex2asci(dato76) +
                  hex2asci(dato77) +
                  hex2asci(dato78) +
                  hex2asci(dato79) +
                  hex2asci(dato80);
                var nomeUtenteTastiera6 =
                  hex2asci(dato81) +
                  hex2asci(dato82) +
                  hex2asci(dato83) +
                  hex2asci(dato84) +
                  hex2asci(dato85) +
                  hex2asci(dato86) +
                  hex2asci(dato87) +
                  hex2asci(dato88) +
                  hex2asci(dato89) +
                  hex2asci(dato90) +
                  hex2asci(dato91) +
                  hex2asci(dato92) +
                  hex2asci(dato93) +
                  hex2asci(dato94) +
                  hex2asci(dato95) +
                  hex2asci(dato96);
                var nomeUtenteTastiera7 =
                  hex2asci(dato97) +
                  hex2asci(dato98) +
                  hex2asci(dato99) +
                  hex2asci(dato100) +
                  hex2asci(dato101) +
                  hex2asci(dato102) +
                  hex2asci(dato103) +
                  hex2asci(dato104) +
                  hex2asci(dato105) +
                  hex2asci(dato106) +
                  hex2asci(dato107) +
                  hex2asci(dato108) +
                  hex2asci(dato109) +
                  hex2asci(dato110) +
                  hex2asci(dato111) +
                  hex2asci(dato112);
                var nomeUtenteTastiera8 =
                  hex2asci(dato113) +
                  hex2asci(dato114) +
                  hex2asci(dato115) +
                  hex2asci(dato116) +
                  hex2asci(dato117) +
                  hex2asci(dato118) +
                  hex2asci(dato119) +
                  hex2asci(dato120) +
                  hex2asci(dato121) +
                  hex2asci(dato122) +
                  hex2asci(dato123) +
                  hex2asci(dato124) +
                  hex2asci(dato125) +
                  hex2asci(dato126) +
                  hex2asci(dato127) +
                  hex2asci(dato128);
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
                var dato1 = bufferino.slice(8, 10);
                var dato2 = bufferino.slice(10, 12);
                var dato3 = bufferino.slice(12, 14);
                var dato4 = bufferino.slice(14, 16);
                var dato5 = bufferino.slice(16, 18);
                var dato6 = bufferino.slice(18, 20);
                var dato7 = bufferino.slice(20, 22);
                var dato8 = bufferino.slice(22, 24);
                var dato9 = bufferino.slice(24, 26);
                var dato10 = bufferino.slice(26, 28);
                var dato11 = bufferino.slice(28, 30);
                var dato12 = bufferino.slice(30, 32);
                var dato13 = bufferino.slice(32, 34);
                var dato14 = bufferino.slice(34, 36);
                var dato15 = bufferino.slice(36, 38);
                var dato16 = bufferino.slice(38, 40);
                var dato17 = bufferino.slice(40, 42);
                var dato18 = bufferino.slice(42, 44);
                var dato19 = bufferino.slice(44, 46);
                var dato20 = bufferino.slice(46, 48);
                var dato21 = bufferino.slice(48, 50);
                var dato22 = bufferino.slice(50, 52);
                var dato23 = bufferino.slice(52, 54);
                var dato24 = bufferino.slice(54, 56);
                var dato25 = bufferino.slice(56, 58);
                var dato26 = bufferino.slice(58, 60);
                var dato27 = bufferino.slice(60, 62);
                var dato28 = bufferino.slice(62, 64);
                var dato29 = bufferino.slice(64, 66);
                var dato30 = bufferino.slice(66, 68);
                var dato31 = bufferino.slice(68, 70);
                var dato32 = bufferino.slice(70, 72);
                var dato33 = bufferino.slice(72, 74);
                var dato34 = bufferino.slice(74, 76);
                var dato35 = bufferino.slice(76, 78);
                var dato36 = bufferino.slice(78, 80);
                var dato37 = bufferino.slice(80, 82);
                var dato38 = bufferino.slice(82, 84);
                var dato39 = bufferino.slice(84, 86);
                var dato40 = bufferino.slice(86, 88);
                var dato41 = bufferino.slice(88, 90);
                var dato42 = bufferino.slice(90, 92);
                var dato43 = bufferino.slice(92, 94);
                var dato44 = bufferino.slice(94, 96);
                var dato45 = bufferino.slice(96, 98);
                var dato46 = bufferino.slice(98, 100);
                var dato47 = bufferino.slice(100, 102);
                var dato48 = bufferino.slice(102, 104);
                var dato49 = bufferino.slice(104, 106);
                var dato50 = bufferino.slice(106, 108);
                var dato51 = bufferino.slice(108, 110);
                var dato52 = bufferino.slice(110, 112);
                var dato53 = bufferino.slice(112, 114);
                var dato54 = bufferino.slice(114, 116);
                var dato55 = bufferino.slice(116, 118);
                var dato56 = bufferino.slice(118, 120);
                var dato57 = bufferino.slice(120, 122);
                var dato58 = bufferino.slice(122, 124);
                var dato59 = bufferino.slice(124, 126);
                var dato60 = bufferino.slice(126, 128);
                var dato61 = bufferino.slice(128, 130);
                var dato62 = bufferino.slice(130, 132);
                var dato63 = bufferino.slice(132, 134);
                var dato64 = bufferino.slice(134, 136);
                var dato65 = bufferino.slice(136, 138);
                var dato66 = bufferino.slice(138, 140);
                var dato67 = bufferino.slice(140, 142);
                var dato68 = bufferino.slice(142, 144);
                var dato69 = bufferino.slice(144, 146);
                var dato70 = bufferino.slice(146, 148);
                var dato71 = bufferino.slice(148, 150);
                var dato72 = bufferino.slice(150, 152);
                var dato73 = bufferino.slice(152, 154);
                var dato74 = bufferino.slice(154, 156);
                var dato75 = bufferino.slice(156, 158);
                var dato76 = bufferino.slice(158, 160);
                var dato77 = bufferino.slice(160, 162);
                var dato78 = bufferino.slice(162, 164);
                var dato79 = bufferino.slice(164, 166);
                var dato80 = bufferino.slice(166, 168);
                var dato81 = bufferino.slice(168, 170);
                var dato82 = bufferino.slice(170, 172);
                var dato83 = bufferino.slice(172, 174);
                var dato84 = bufferino.slice(174, 176);
                var dato85 = bufferino.slice(176, 178);
                var dato86 = bufferino.slice(178, 180);
                var dato87 = bufferino.slice(180, 182);
                var dato88 = bufferino.slice(182, 184);
                var dato89 = bufferino.slice(184, 186);
                var dato90 = bufferino.slice(186, 188);
                var dato91 = bufferino.slice(188, 190);
                var dato92 = bufferino.slice(190, 192);
                var dato93 = bufferino.slice(192, 194);
                var dato94 = bufferino.slice(194, 196);
                var dato95 = bufferino.slice(196, 198);
                var dato96 = bufferino.slice(198, 200);
                var dato97 = bufferino.slice(200, 202);
                var dato98 = bufferino.slice(202, 204);
                var dato99 = bufferino.slice(204, 206);
                var dato100 = bufferino.slice(206, 208);
                var dato101 = bufferino.slice(208, 210);
                var dato102 = bufferino.slice(210, 212);
                var dato103 = bufferino.slice(212, 214);
                var dato104 = bufferino.slice(214, 216);
                var dato105 = bufferino.slice(216, 218);
                var dato106 = bufferino.slice(218, 220);
                var dato107 = bufferino.slice(220, 222);
                var dato108 = bufferino.slice(222, 224);
                var dato109 = bufferino.slice(224, 226);
                var dato110 = bufferino.slice(226, 228);
                var dato111 = bufferino.slice(228, 230);
                var dato112 = bufferino.slice(230, 232);
                var dato113 = bufferino.slice(232, 234);
                var dato114 = bufferino.slice(234, 236);
                var dato115 = bufferino.slice(236, 238);
                var dato116 = bufferino.slice(238, 240);
                var dato117 = bufferino.slice(240, 242);
                var dato118 = bufferino.slice(242, 244);
                var dato119 = bufferino.slice(244, 246);
                var dato120 = bufferino.slice(246, 248);
                var dato121 = bufferino.slice(248, 250);
                var dato122 = bufferino.slice(250, 252);
                var dato123 = bufferino.slice(252, 254);
                var dato124 = bufferino.slice(254, 256);
                var dato125 = bufferino.slice(256, 258);
                var dato126 = bufferino.slice(258, 260);
                var dato127 = bufferino.slice(260, 262);
                var dato128 = bufferino.slice(262, 264);
                var nomeUtenteTastiera9 =
                  hex2asci(dato1) +
                  hex2asci(dato2) +
                  hex2asci(dato3) +
                  hex2asci(dato4) +
                  hex2asci(dato5) +
                  hex2asci(dato6) +
                  hex2asci(dato7) +
                  hex2asci(dato8) +
                  hex2asci(dato9) +
                  hex2asci(dato10) +
                  hex2asci(dato11) +
                  hex2asci(dato12) +
                  hex2asci(dato13) +
                  hex2asci(dato14) +
                  hex2asci(dato15) +
                  hex2asci(dato16);
                var nomeUtenteTastiera10 =
                  hex2asci(dato17) +
                  hex2asci(dato18) +
                  hex2asci(dato19) +
                  hex2asci(dato20) +
                  hex2asci(dato21) +
                  hex2asci(dato22) +
                  hex2asci(dato23) +
                  hex2asci(dato24) +
                  hex2asci(dato25) +
                  hex2asci(dato26) +
                  hex2asci(dato27) +
                  hex2asci(dato28) +
                  hex2asci(dato29) +
                  hex2asci(dato30) +
                  hex2asci(dato31) +
                  hex2asci(dato32);
                var nomeUtenteTastiera11 =
                  hex2asci(dato33) +
                  hex2asci(dato34) +
                  hex2asci(dato35) +
                  hex2asci(dato36) +
                  hex2asci(dato37) +
                  hex2asci(dato38) +
                  hex2asci(dato39) +
                  hex2asci(dato40) +
                  hex2asci(dato41) +
                  hex2asci(dato42) +
                  hex2asci(dato43) +
                  hex2asci(dato44) +
                  hex2asci(dato45) +
                  hex2asci(dato46) +
                  hex2asci(dato47) +
                  hex2asci(dato48);
                var nomeUtenteTastiera12 =
                  hex2asci(dato49) +
                  hex2asci(dato50) +
                  hex2asci(dato51) +
                  hex2asci(dato52) +
                  hex2asci(dato53) +
                  hex2asci(dato54) +
                  hex2asci(dato55) +
                  hex2asci(dato56) +
                  hex2asci(dato57) +
                  hex2asci(dato58) +
                  hex2asci(dato59) +
                  hex2asci(dato60) +
                  hex2asci(dato61) +
                  hex2asci(dato62) +
                  hex2asci(dato63) +
                  hex2asci(dato64);
                var nomeUtenteTastiera13 =
                  hex2asci(dato65) +
                  hex2asci(dato66) +
                  hex2asci(dato67) +
                  hex2asci(dato68) +
                  hex2asci(dato69) +
                  hex2asci(dato70) +
                  hex2asci(dato71) +
                  hex2asci(dato72) +
                  hex2asci(dato73) +
                  hex2asci(dato74) +
                  hex2asci(dato75) +
                  hex2asci(dato76) +
                  hex2asci(dato77) +
                  hex2asci(dato78) +
                  hex2asci(dato79) +
                  hex2asci(dato80);
                var nomeUtenteTastiera14 =
                  hex2asci(dato81) +
                  hex2asci(dato82) +
                  hex2asci(dato83) +
                  hex2asci(dato84) +
                  hex2asci(dato85) +
                  hex2asci(dato86) +
                  hex2asci(dato87) +
                  hex2asci(dato88) +
                  hex2asci(dato89) +
                  hex2asci(dato90) +
                  hex2asci(dato91) +
                  hex2asci(dato92) +
                  hex2asci(dato93) +
                  hex2asci(dato94) +
                  hex2asci(dato95) +
                  hex2asci(dato96);
                var nomeUtenteTastiera15 =
                  hex2asci(dato97) +
                  hex2asci(dato98) +
                  hex2asci(dato99) +
                  hex2asci(dato100) +
                  hex2asci(dato101) +
                  hex2asci(dato102) +
                  hex2asci(dato103) +
                  hex2asci(dato104) +
                  hex2asci(dato105) +
                  hex2asci(dato106) +
                  hex2asci(dato107) +
                  hex2asci(dato108) +
                  hex2asci(dato109) +
                  hex2asci(dato110) +
                  hex2asci(dato111) +
                  hex2asci(dato112);
                var nomeUtenteTastiera16 =
                  hex2asci(dato113) +
                  hex2asci(dato114) +
                  hex2asci(dato115) +
                  hex2asci(dato116) +
                  hex2asci(dato117) +
                  hex2asci(dato118) +
                  hex2asci(dato119) +
                  hex2asci(dato120) +
                  hex2asci(dato121) +
                  hex2asci(dato122) +
                  hex2asci(dato123) +
                  hex2asci(dato124) +
                  hex2asci(dato125) +
                  hex2asci(dato126) +
                  hex2asci(dato127) +
                  hex2asci(dato128);
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
                var dato1 = bufferino.slice(8, 10);
                var dato2 = bufferino.slice(10, 12);
                var dato3 = bufferino.slice(12, 14);
                var dato4 = bufferino.slice(14, 16);
                var dato5 = bufferino.slice(16, 18);
                var dato6 = bufferino.slice(18, 20);
                var dato7 = bufferino.slice(20, 22);
                var dato8 = bufferino.slice(22, 24);
                var dato9 = bufferino.slice(24, 26);
                var dato10 = bufferino.slice(26, 28);
                var dato11 = bufferino.slice(28, 30);
                var dato12 = bufferino.slice(30, 32);
                var dato13 = bufferino.slice(32, 34);
                var dato14 = bufferino.slice(34, 36);
                var dato15 = bufferino.slice(36, 38);
                var dato16 = bufferino.slice(38, 40);
                var dato17 = bufferino.slice(40, 42);
                var dato18 = bufferino.slice(42, 44);
                var dato19 = bufferino.slice(44, 46);
                var dato20 = bufferino.slice(46, 48);
                var dato21 = bufferino.slice(48, 50);
                var dato22 = bufferino.slice(50, 52);
                var dato23 = bufferino.slice(52, 54);
                var dato24 = bufferino.slice(54, 56);
                var dato25 = bufferino.slice(56, 58);
                var dato26 = bufferino.slice(58, 60);
                var dato27 = bufferino.slice(60, 62);
                var dato28 = bufferino.slice(62, 64);
                var dato29 = bufferino.slice(64, 66);
                var dato30 = bufferino.slice(66, 68);
                var dato31 = bufferino.slice(68, 70);
                var dato32 = bufferino.slice(70, 72);
                var dato33 = bufferino.slice(72, 74);
                var dato34 = bufferino.slice(74, 76);
                var dato35 = bufferino.slice(76, 78);
                var dato36 = bufferino.slice(78, 80);
                var dato37 = bufferino.slice(80, 82);
                var dato38 = bufferino.slice(82, 84);
                var dato39 = bufferino.slice(84, 86);
                var dato40 = bufferino.slice(86, 88);
                var dato41 = bufferino.slice(88, 90);
                var dato42 = bufferino.slice(90, 92);
                var dato43 = bufferino.slice(92, 94);
                var dato44 = bufferino.slice(94, 96);
                var dato45 = bufferino.slice(96, 98);
                var dato46 = bufferino.slice(98, 100);
                var dato47 = bufferino.slice(100, 102);
                var dato48 = bufferino.slice(102, 104);
                var dato49 = bufferino.slice(104, 106);
                var dato50 = bufferino.slice(106, 108);
                var dato51 = bufferino.slice(108, 110);
                var dato52 = bufferino.slice(110, 112);
                var dato53 = bufferino.slice(112, 114);
                var dato54 = bufferino.slice(114, 116);
                var dato55 = bufferino.slice(116, 118);
                var dato56 = bufferino.slice(118, 120);
                var dato57 = bufferino.slice(120, 122);
                var dato58 = bufferino.slice(122, 124);
                var dato59 = bufferino.slice(124, 126);
                var dato60 = bufferino.slice(126, 128);
                var dato61 = bufferino.slice(128, 130);
                var dato62 = bufferino.slice(130, 132);
                var dato63 = bufferino.slice(132, 134);
                var dato64 = bufferino.slice(134, 136);
                var dato65 = bufferino.slice(136, 138);
                var dato66 = bufferino.slice(138, 140);
                var dato67 = bufferino.slice(140, 142);
                var dato68 = bufferino.slice(142, 144);
                var dato69 = bufferino.slice(144, 146);
                var dato70 = bufferino.slice(146, 148);
                var dato71 = bufferino.slice(148, 150);
                var dato72 = bufferino.slice(150, 152);
                var dato73 = bufferino.slice(152, 154);
                var dato74 = bufferino.slice(154, 156);
                var dato75 = bufferino.slice(156, 158);
                var dato76 = bufferino.slice(158, 160);
                var dato77 = bufferino.slice(160, 162);
                var dato78 = bufferino.slice(162, 164);
                var dato79 = bufferino.slice(164, 166);
                var dato80 = bufferino.slice(166, 168);
                var dato81 = bufferino.slice(168, 170);
                var dato82 = bufferino.slice(170, 172);
                var dato83 = bufferino.slice(172, 174);
                var dato84 = bufferino.slice(174, 176);
                var dato85 = bufferino.slice(176, 178);
                var dato86 = bufferino.slice(178, 180);
                var dato87 = bufferino.slice(180, 182);
                var dato88 = bufferino.slice(182, 184);
                var dato89 = bufferino.slice(184, 186);
                var dato90 = bufferino.slice(186, 188);
                var dato91 = bufferino.slice(188, 190);
                var dato92 = bufferino.slice(190, 192);
                var dato93 = bufferino.slice(192, 194);
                var dato94 = bufferino.slice(194, 196);
                var dato95 = bufferino.slice(196, 198);
                var dato96 = bufferino.slice(198, 200);
                var dato97 = bufferino.slice(200, 202);
                var dato98 = bufferino.slice(202, 204);
                var dato99 = bufferino.slice(204, 206);
                var dato100 = bufferino.slice(206, 208);
                var dato101 = bufferino.slice(208, 210);
                var dato102 = bufferino.slice(210, 212);
                var dato103 = bufferino.slice(212, 214);
                var dato104 = bufferino.slice(214, 216);
                var dato105 = bufferino.slice(216, 218);
                var dato106 = bufferino.slice(218, 220);
                var dato107 = bufferino.slice(220, 222);
                var dato108 = bufferino.slice(222, 224);
                var dato109 = bufferino.slice(224, 226);
                var dato110 = bufferino.slice(226, 228);
                var dato111 = bufferino.slice(228, 230);
                var dato112 = bufferino.slice(230, 232);
                var dato113 = bufferino.slice(232, 234);
                var dato114 = bufferino.slice(234, 236);
                var dato115 = bufferino.slice(236, 238);
                var dato116 = bufferino.slice(238, 240);
                var dato117 = bufferino.slice(240, 242);
                var dato118 = bufferino.slice(242, 244);
                var dato119 = bufferino.slice(244, 246);
                var dato120 = bufferino.slice(246, 248);
                var dato121 = bufferino.slice(248, 250);
                var dato122 = bufferino.slice(250, 252);
                var dato123 = bufferino.slice(252, 254);
                var dato124 = bufferino.slice(254, 256);
                var dato125 = bufferino.slice(256, 258);
                var dato126 = bufferino.slice(258, 260);
                var dato127 = bufferino.slice(260, 262);
                var dato128 = bufferino.slice(262, 264);
                var nomeUtenteSpinotto1 =
                  hex2asci(dato1) +
                  hex2asci(dato2) +
                  hex2asci(dato3) +
                  hex2asci(dato4) +
                  hex2asci(dato5) +
                  hex2asci(dato6) +
                  hex2asci(dato7) +
                  hex2asci(dato8) +
                  hex2asci(dato9) +
                  hex2asci(dato10) +
                  hex2asci(dato11) +
                  hex2asci(dato12) +
                  hex2asci(dato13) +
                  hex2asci(dato14) +
                  hex2asci(dato15) +
                  hex2asci(dato16);
                var nomeUtenteSpinotto2 =
                  hex2asci(dato17) +
                  hex2asci(dato18) +
                  hex2asci(dato19) +
                  hex2asci(dato20) +
                  hex2asci(dato21) +
                  hex2asci(dato22) +
                  hex2asci(dato23) +
                  hex2asci(dato24) +
                  hex2asci(dato25) +
                  hex2asci(dato26) +
                  hex2asci(dato27) +
                  hex2asci(dato28) +
                  hex2asci(dato29) +
                  hex2asci(dato30) +
                  hex2asci(dato31) +
                  hex2asci(dato32);
                var nomeUtenteSpinotto3 =
                  hex2asci(dato33) +
                  hex2asci(dato34) +
                  hex2asci(dato35) +
                  hex2asci(dato36) +
                  hex2asci(dato37) +
                  hex2asci(dato38) +
                  hex2asci(dato39) +
                  hex2asci(dato40) +
                  hex2asci(dato41) +
                  hex2asci(dato42) +
                  hex2asci(dato43) +
                  hex2asci(dato44) +
                  hex2asci(dato45) +
                  hex2asci(dato46) +
                  hex2asci(dato47) +
                  hex2asci(dato48);
                var nomeUtenteSpinotto4 =
                  hex2asci(dato49) +
                  hex2asci(dato50) +
                  hex2asci(dato51) +
                  hex2asci(dato52) +
                  hex2asci(dato53) +
                  hex2asci(dato54) +
                  hex2asci(dato55) +
                  hex2asci(dato56) +
                  hex2asci(dato57) +
                  hex2asci(dato58) +
                  hex2asci(dato59) +
                  hex2asci(dato60) +
                  hex2asci(dato61) +
                  hex2asci(dato62) +
                  hex2asci(dato63) +
                  hex2asci(dato64);
                var nomeUtenteSpinotto5 =
                  hex2asci(dato65) +
                  hex2asci(dato66) +
                  hex2asci(dato67) +
                  hex2asci(dato68) +
                  hex2asci(dato69) +
                  hex2asci(dato70) +
                  hex2asci(dato71) +
                  hex2asci(dato72) +
                  hex2asci(dato73) +
                  hex2asci(dato74) +
                  hex2asci(dato75) +
                  hex2asci(dato76) +
                  hex2asci(dato77) +
                  hex2asci(dato78) +
                  hex2asci(dato79) +
                  hex2asci(dato80);
                var nomeUtenteSpinotto6 =
                  hex2asci(dato81) +
                  hex2asci(dato82) +
                  hex2asci(dato83) +
                  hex2asci(dato84) +
                  hex2asci(dato85) +
                  hex2asci(dato86) +
                  hex2asci(dato87) +
                  hex2asci(dato88) +
                  hex2asci(dato89) +
                  hex2asci(dato90) +
                  hex2asci(dato91) +
                  hex2asci(dato92) +
                  hex2asci(dato93) +
                  hex2asci(dato94) +
                  hex2asci(dato95) +
                  hex2asci(dato96);
                var nomeUtenteSpinotto7 =
                  hex2asci(dato97) +
                  hex2asci(dato98) +
                  hex2asci(dato99) +
                  hex2asci(dato100) +
                  hex2asci(dato101) +
                  hex2asci(dato102) +
                  hex2asci(dato103) +
                  hex2asci(dato104) +
                  hex2asci(dato105) +
                  hex2asci(dato106) +
                  hex2asci(dato107) +
                  hex2asci(dato108) +
                  hex2asci(dato109) +
                  hex2asci(dato110) +
                  hex2asci(dato111) +
                  hex2asci(dato112);
                var nomeUtenteSpinotto8 =
                  hex2asci(dato113) +
                  hex2asci(dato114) +
                  hex2asci(dato115) +
                  hex2asci(dato116) +
                  hex2asci(dato117) +
                  hex2asci(dato118) +
                  hex2asci(dato119) +
                  hex2asci(dato120) +
                  hex2asci(dato121) +
                  hex2asci(dato122) +
                  hex2asci(dato123) +
                  hex2asci(dato124) +
                  hex2asci(dato125) +
                  hex2asci(dato126) +
                  hex2asci(dato127) +
                  hex2asci(dato128);
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
                var dato1 = bufferino.slice(8, 10);
                var dato2 = bufferino.slice(10, 12);
                var dato3 = bufferino.slice(12, 14);
                var dato4 = bufferino.slice(14, 16);
                var dato5 = bufferino.slice(16, 18);
                var dato6 = bufferino.slice(18, 20);
                var dato7 = bufferino.slice(20, 22);
                var dato8 = bufferino.slice(22, 24);
                var dato9 = bufferino.slice(24, 26);
                var dato10 = bufferino.slice(26, 28);
                var dato11 = bufferino.slice(28, 30);
                var dato12 = bufferino.slice(30, 32);
                var dato13 = bufferino.slice(32, 34);
                var dato14 = bufferino.slice(34, 36);
                var dato15 = bufferino.slice(36, 38);
                var dato16 = bufferino.slice(38, 40);
                var dato17 = bufferino.slice(40, 42);
                var dato18 = bufferino.slice(42, 44);
                var dato19 = bufferino.slice(44, 46);
                var dato20 = bufferino.slice(46, 48);
                var dato21 = bufferino.slice(48, 50);
                var dato22 = bufferino.slice(50, 52);
                var dato23 = bufferino.slice(52, 54);
                var dato24 = bufferino.slice(54, 56);
                var dato25 = bufferino.slice(56, 58);
                var dato26 = bufferino.slice(58, 60);
                var dato27 = bufferino.slice(60, 62);
                var dato28 = bufferino.slice(62, 64);
                var dato29 = bufferino.slice(64, 66);
                var dato30 = bufferino.slice(66, 68);
                var dato31 = bufferino.slice(68, 70);
                var dato32 = bufferino.slice(70, 72);
                var dato33 = bufferino.slice(72, 74);
                var dato34 = bufferino.slice(74, 76);
                var dato35 = bufferino.slice(76, 78);
                var dato36 = bufferino.slice(78, 80);
                var dato37 = bufferino.slice(80, 82);
                var dato38 = bufferino.slice(82, 84);
                var dato39 = bufferino.slice(84, 86);
                var dato40 = bufferino.slice(86, 88);
                var dato41 = bufferino.slice(88, 90);
                var dato42 = bufferino.slice(90, 92);
                var dato43 = bufferino.slice(92, 94);
                var dato44 = bufferino.slice(94, 96);
                var dato45 = bufferino.slice(96, 98);
                var dato46 = bufferino.slice(98, 100);
                var dato47 = bufferino.slice(100, 102);
                var dato48 = bufferino.slice(102, 104);
                var dato49 = bufferino.slice(104, 106);
                var dato50 = bufferino.slice(106, 108);
                var dato51 = bufferino.slice(108, 110);
                var dato52 = bufferino.slice(110, 112);
                var dato53 = bufferino.slice(112, 114);
                var dato54 = bufferino.slice(114, 116);
                var dato55 = bufferino.slice(116, 118);
                var dato56 = bufferino.slice(118, 120);
                var dato57 = bufferino.slice(120, 122);
                var dato58 = bufferino.slice(122, 124);
                var dato59 = bufferino.slice(124, 126);
                var dato60 = bufferino.slice(126, 128);
                var dato61 = bufferino.slice(128, 130);
                var dato62 = bufferino.slice(130, 132);
                var dato63 = bufferino.slice(132, 134);
                var dato64 = bufferino.slice(134, 136);
                var dato65 = bufferino.slice(136, 138);
                var dato66 = bufferino.slice(138, 140);
                var dato67 = bufferino.slice(140, 142);
                var dato68 = bufferino.slice(142, 144);
                var dato69 = bufferino.slice(144, 146);
                var dato70 = bufferino.slice(146, 148);
                var dato71 = bufferino.slice(148, 150);
                var dato72 = bufferino.slice(150, 152);
                var dato73 = bufferino.slice(152, 154);
                var dato74 = bufferino.slice(154, 156);
                var dato75 = bufferino.slice(156, 158);
                var dato76 = bufferino.slice(158, 160);
                var dato77 = bufferino.slice(160, 162);
                var dato78 = bufferino.slice(162, 164);
                var dato79 = bufferino.slice(164, 166);
                var dato80 = bufferino.slice(166, 168);
                var dato81 = bufferino.slice(168, 170);
                var dato82 = bufferino.slice(170, 172);
                var dato83 = bufferino.slice(172, 174);
                var dato84 = bufferino.slice(174, 176);
                var dato85 = bufferino.slice(176, 178);
                var dato86 = bufferino.slice(178, 180);
                var dato87 = bufferino.slice(180, 182);
                var dato88 = bufferino.slice(182, 184);
                var dato89 = bufferino.slice(184, 186);
                var dato90 = bufferino.slice(186, 188);
                var dato91 = bufferino.slice(188, 190);
                var dato92 = bufferino.slice(190, 192);
                var dato93 = bufferino.slice(192, 194);
                var dato94 = bufferino.slice(194, 196);
                var dato95 = bufferino.slice(196, 198);
                var dato96 = bufferino.slice(198, 200);
                var dato97 = bufferino.slice(200, 202);
                var dato98 = bufferino.slice(202, 204);
                var dato99 = bufferino.slice(204, 206);
                var dato100 = bufferino.slice(206, 208);
                var dato101 = bufferino.slice(208, 210);
                var dato102 = bufferino.slice(210, 212);
                var dato103 = bufferino.slice(212, 214);
                var dato104 = bufferino.slice(214, 216);
                var dato105 = bufferino.slice(216, 218);
                var dato106 = bufferino.slice(218, 220);
                var dato107 = bufferino.slice(220, 222);
                var dato108 = bufferino.slice(222, 224);
                var dato109 = bufferino.slice(224, 226);
                var dato110 = bufferino.slice(226, 228);
                var dato111 = bufferino.slice(228, 230);
                var dato112 = bufferino.slice(230, 232);
                var dato113 = bufferino.slice(232, 234);
                var dato114 = bufferino.slice(234, 236);
                var dato115 = bufferino.slice(236, 238);
                var dato116 = bufferino.slice(238, 240);
                var dato117 = bufferino.slice(240, 242);
                var dato118 = bufferino.slice(242, 244);
                var dato119 = bufferino.slice(244, 246);
                var dato120 = bufferino.slice(246, 248);
                var dato121 = bufferino.slice(248, 250);
                var dato122 = bufferino.slice(250, 252);
                var dato123 = bufferino.slice(252, 254);
                var dato124 = bufferino.slice(254, 256);
                var dato125 = bufferino.slice(256, 258);
                var dato126 = bufferino.slice(258, 260);
                var dato127 = bufferino.slice(260, 262);
                var dato128 = bufferino.slice(262, 264);
                var nomeUtenteSpinotto9 =
                  hex2asci(dato1) +
                  hex2asci(dato2) +
                  hex2asci(dato3) +
                  hex2asci(dato4) +
                  hex2asci(dato5) +
                  hex2asci(dato6) +
                  hex2asci(dato7) +
                  hex2asci(dato8) +
                  hex2asci(dato9) +
                  hex2asci(dato10) +
                  hex2asci(dato11) +
                  hex2asci(dato12) +
                  hex2asci(dato13) +
                  hex2asci(dato14) +
                  hex2asci(dato15) +
                  hex2asci(dato16);
                var nomeUtenteSpinotto10 =
                  hex2asci(dato17) +
                  hex2asci(dato18) +
                  hex2asci(dato19) +
                  hex2asci(dato20) +
                  hex2asci(dato21) +
                  hex2asci(dato22) +
                  hex2asci(dato23) +
                  hex2asci(dato24) +
                  hex2asci(dato25) +
                  hex2asci(dato26) +
                  hex2asci(dato27) +
                  hex2asci(dato28) +
                  hex2asci(dato29) +
                  hex2asci(dato30) +
                  hex2asci(dato31) +
                  hex2asci(dato32);
                var nomeUtenteSpinotto11 =
                  hex2asci(dato33) +
                  hex2asci(dato34) +
                  hex2asci(dato35) +
                  hex2asci(dato36) +
                  hex2asci(dato37) +
                  hex2asci(dato38) +
                  hex2asci(dato39) +
                  hex2asci(dato40) +
                  hex2asci(dato41) +
                  hex2asci(dato42) +
                  hex2asci(dato43) +
                  hex2asci(dato44) +
                  hex2asci(dato45) +
                  hex2asci(dato46) +
                  hex2asci(dato47) +
                  hex2asci(dato48);
                var nomeUtenteSpinotto12 =
                  hex2asci(dato49) +
                  hex2asci(dato50) +
                  hex2asci(dato51) +
                  hex2asci(dato52) +
                  hex2asci(dato53) +
                  hex2asci(dato54) +
                  hex2asci(dato55) +
                  hex2asci(dato56) +
                  hex2asci(dato57) +
                  hex2asci(dato58) +
                  hex2asci(dato59) +
                  hex2asci(dato60) +
                  hex2asci(dato61) +
                  hex2asci(dato62) +
                  hex2asci(dato63) +
                  hex2asci(dato64);
                var nomeUtenteSpinotto13 =
                  hex2asci(dato65) +
                  hex2asci(dato66) +
                  hex2asci(dato67) +
                  hex2asci(dato68) +
                  hex2asci(dato69) +
                  hex2asci(dato70) +
                  hex2asci(dato71) +
                  hex2asci(dato72) +
                  hex2asci(dato73) +
                  hex2asci(dato74) +
                  hex2asci(dato75) +
                  hex2asci(dato76) +
                  hex2asci(dato77) +
                  hex2asci(dato78) +
                  hex2asci(dato79) +
                  hex2asci(dato80);
                var nomeUtenteSpinotto14 =
                  hex2asci(dato81) +
                  hex2asci(dato82) +
                  hex2asci(dato83) +
                  hex2asci(dato84) +
                  hex2asci(dato85) +
                  hex2asci(dato86) +
                  hex2asci(dato87) +
                  hex2asci(dato88) +
                  hex2asci(dato89) +
                  hex2asci(dato90) +
                  hex2asci(dato91) +
                  hex2asci(dato92) +
                  hex2asci(dato93) +
                  hex2asci(dato94) +
                  hex2asci(dato95) +
                  hex2asci(dato96);
                var nomeUtenteSpinotto15 =
                  hex2asci(dato97) +
                  hex2asci(dato98) +
                  hex2asci(dato99) +
                  hex2asci(dato100) +
                  hex2asci(dato101) +
                  hex2asci(dato102) +
                  hex2asci(dato103) +
                  hex2asci(dato104) +
                  hex2asci(dato105) +
                  hex2asci(dato106) +
                  hex2asci(dato107) +
                  hex2asci(dato108) +
                  hex2asci(dato109) +
                  hex2asci(dato110) +
                  hex2asci(dato111) +
                  hex2asci(dato112);
                var nomeUtenteSpinotto16 =
                  hex2asci(dato113) +
                  hex2asci(dato114) +
                  hex2asci(dato115) +
                  hex2asci(dato116) +
                  hex2asci(dato117) +
                  hex2asci(dato118) +
                  hex2asci(dato119) +
                  hex2asci(dato120) +
                  hex2asci(dato121) +
                  hex2asci(dato122) +
                  hex2asci(dato123) +
                  hex2asci(dato124) +
                  hex2asci(dato125) +
                  hex2asci(dato126) +
                  hex2asci(dato127) +
                  hex2asci(dato128);
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
                var dato1 = bufferino.slice(8, 10);
                var dato2 = bufferino.slice(10, 12);
                var dato3 = bufferino.slice(12, 14);
                var dato4 = bufferino.slice(14, 16);
                var dato5 = bufferino.slice(16, 18);
                var dato6 = bufferino.slice(18, 20);
                var dato7 = bufferino.slice(20, 22);
                var dato8 = bufferino.slice(22, 24);
                var dato9 = bufferino.slice(24, 26);
                var dato10 = bufferino.slice(26, 28);
                var dato11 = bufferino.slice(28, 30);
                var dato12 = bufferino.slice(30, 32);
                var dato13 = bufferino.slice(32, 34);
                var dato14 = bufferino.slice(34, 36);
                var dato15 = bufferino.slice(36, 38);
                var dato16 = bufferino.slice(38, 40);
                var dato17 = bufferino.slice(40, 42);
                var dato18 = bufferino.slice(42, 44);
                var dato19 = bufferino.slice(44, 46);
                var dato20 = bufferino.slice(46, 48);
                var dato21 = bufferino.slice(48, 50);
                var dato22 = bufferino.slice(50, 52);
                var dato23 = bufferino.slice(52, 54);
                var dato24 = bufferino.slice(54, 56);
                var dato25 = bufferino.slice(56, 58);
                var dato26 = bufferino.slice(58, 60);
                var dato27 = bufferino.slice(60, 62);
                var dato28 = bufferino.slice(62, 64);
                var dato29 = bufferino.slice(64, 66);
                var dato30 = bufferino.slice(66, 68);
                var dato31 = bufferino.slice(68, 70);
                var dato32 = bufferino.slice(70, 72);
                var dato33 = bufferino.slice(72, 74);
                var dato34 = bufferino.slice(74, 76);
                var dato35 = bufferino.slice(76, 78);
                var dato36 = bufferino.slice(78, 80);
                var dato37 = bufferino.slice(80, 82);
                var dato38 = bufferino.slice(82, 84);
                var dato39 = bufferino.slice(84, 86);
                var dato40 = bufferino.slice(86, 88);
                var dato41 = bufferino.slice(88, 90);
                var dato42 = bufferino.slice(90, 92);
                var dato43 = bufferino.slice(92, 94);
                var dato44 = bufferino.slice(94, 96);
                var dato45 = bufferino.slice(96, 98);
                var dato46 = bufferino.slice(98, 100);
                var dato47 = bufferino.slice(100, 102);
                var dato48 = bufferino.slice(102, 104);
                var dato49 = bufferino.slice(104, 106);
                var dato50 = bufferino.slice(106, 108);
                var dato51 = bufferino.slice(108, 110);
                var dato52 = bufferino.slice(110, 112);
                var dato53 = bufferino.slice(112, 114);
                var dato54 = bufferino.slice(114, 116);
                var dato55 = bufferino.slice(116, 118);
                var dato56 = bufferino.slice(118, 120);
                var dato57 = bufferino.slice(120, 122);
                var dato58 = bufferino.slice(122, 124);
                var dato59 = bufferino.slice(124, 126);
                var dato60 = bufferino.slice(126, 128);
                var dato61 = bufferino.slice(128, 130);
                var dato62 = bufferino.slice(130, 132);
                var dato63 = bufferino.slice(132, 134);
                var dato64 = bufferino.slice(134, 136);
                var dato65 = bufferino.slice(136, 138);
                var dato66 = bufferino.slice(138, 140);
                var dato67 = bufferino.slice(140, 142);
                var dato68 = bufferino.slice(142, 144);
                var dato69 = bufferino.slice(144, 146);
                var dato70 = bufferino.slice(146, 148);
                var dato71 = bufferino.slice(148, 150);
                var dato72 = bufferino.slice(150, 152);
                var dato73 = bufferino.slice(152, 154);
                var dato74 = bufferino.slice(154, 156);
                var dato75 = bufferino.slice(156, 158);
                var dato76 = bufferino.slice(158, 160);
                var dato77 = bufferino.slice(160, 162);
                var dato78 = bufferino.slice(162, 164);
                var dato79 = bufferino.slice(164, 166);
                var dato80 = bufferino.slice(166, 168);
                var dato81 = bufferino.slice(168, 170);
                var dato82 = bufferino.slice(170, 172);
                var dato83 = bufferino.slice(172, 174);
                var dato84 = bufferino.slice(174, 176);
                var dato85 = bufferino.slice(176, 178);
                var dato86 = bufferino.slice(178, 180);
                var dato87 = bufferino.slice(180, 182);
                var dato88 = bufferino.slice(182, 184);
                var dato89 = bufferino.slice(184, 186);
                var dato90 = bufferino.slice(186, 188);
                var dato91 = bufferino.slice(188, 190);
                var dato92 = bufferino.slice(190, 192);
                var dato93 = bufferino.slice(192, 194);
                var dato94 = bufferino.slice(194, 196);
                var dato95 = bufferino.slice(196, 198);
                var dato96 = bufferino.slice(198, 200);
                var dato97 = bufferino.slice(200, 202);
                var dato98 = bufferino.slice(202, 204);
                var dato99 = bufferino.slice(204, 206);
                var dato100 = bufferino.slice(206, 208);
                var dato101 = bufferino.slice(208, 210);
                var dato102 = bufferino.slice(210, 212);
                var dato103 = bufferino.slice(212, 214);
                var dato104 = bufferino.slice(214, 216);
                var dato105 = bufferino.slice(216, 218);
                var dato106 = bufferino.slice(218, 220);
                var dato107 = bufferino.slice(220, 222);
                var dato108 = bufferino.slice(222, 224);
                var dato109 = bufferino.slice(224, 226);
                var dato110 = bufferino.slice(226, 228);
                var dato111 = bufferino.slice(228, 230);
                var dato112 = bufferino.slice(230, 232);
                var dato113 = bufferino.slice(232, 234);
                var dato114 = bufferino.slice(234, 236);
                var dato115 = bufferino.slice(236, 238);
                var dato116 = bufferino.slice(238, 240);
                var dato117 = bufferino.slice(240, 242);
                var dato118 = bufferino.slice(242, 244);
                var dato119 = bufferino.slice(244, 246);
                var dato120 = bufferino.slice(246, 248);
                var dato121 = bufferino.slice(248, 250);
                var dato122 = bufferino.slice(250, 252);
                var dato123 = bufferino.slice(252, 254);
                var dato124 = bufferino.slice(254, 256);
                var dato125 = bufferino.slice(256, 258);
                var dato126 = bufferino.slice(258, 260);
                var dato127 = bufferino.slice(260, 262);
                var dato128 = bufferino.slice(262, 264);
                var nomeUscita1 =
                  hex2asci(dato1) +
                  hex2asci(dato2) +
                  hex2asci(dato3) +
                  hex2asci(dato4) +
                  hex2asci(dato5) +
                  hex2asci(dato6) +
                  hex2asci(dato7) +
                  hex2asci(dato8) +
                  hex2asci(dato9) +
                  hex2asci(dato10) +
                  hex2asci(dato11) +
                  hex2asci(dato12) +
                  hex2asci(dato13) +
                  hex2asci(dato14) +
                  hex2asci(dato15) +
                  hex2asci(dato16);
                var nomeUscita2 =
                  hex2asci(dato17) +
                  hex2asci(dato18) +
                  hex2asci(dato19) +
                  hex2asci(dato20) +
                  hex2asci(dato21) +
                  hex2asci(dato22) +
                  hex2asci(dato23) +
                  hex2asci(dato24) +
                  hex2asci(dato25) +
                  hex2asci(dato26) +
                  hex2asci(dato27) +
                  hex2asci(dato28) +
                  hex2asci(dato29) +
                  hex2asci(dato30) +
                  hex2asci(dato31) +
                  hex2asci(dato32);
                var nomeUscita3 =
                  hex2asci(dato33) +
                  hex2asci(dato34) +
                  hex2asci(dato35) +
                  hex2asci(dato36) +
                  hex2asci(dato37) +
                  hex2asci(dato38) +
                  hex2asci(dato39) +
                  hex2asci(dato40) +
                  hex2asci(dato41) +
                  hex2asci(dato42) +
                  hex2asci(dato43) +
                  hex2asci(dato44) +
                  hex2asci(dato45) +
                  hex2asci(dato46) +
                  hex2asci(dato47) +
                  hex2asci(dato48);
                var nomeUscita4 =
                  hex2asci(dato49) +
                  hex2asci(dato50) +
                  hex2asci(dato51) +
                  hex2asci(dato52) +
                  hex2asci(dato53) +
                  hex2asci(dato54) +
                  hex2asci(dato55) +
                  hex2asci(dato56) +
                  hex2asci(dato57) +
                  hex2asci(dato58) +
                  hex2asci(dato59) +
                  hex2asci(dato60) +
                  hex2asci(dato61) +
                  hex2asci(dato62) +
                  hex2asci(dato63) +
                  hex2asci(dato64);
                var nomeUscita5 =
                  hex2asci(dato65) +
                  hex2asci(dato66) +
                  hex2asci(dato67) +
                  hex2asci(dato68) +
                  hex2asci(dato69) +
                  hex2asci(dato70) +
                  hex2asci(dato71) +
                  hex2asci(dato72) +
                  hex2asci(dato73) +
                  hex2asci(dato74) +
                  hex2asci(dato75) +
                  hex2asci(dato76) +
                  hex2asci(dato77) +
                  hex2asci(dato78) +
                  hex2asci(dato79) +
                  hex2asci(dato80);
                var nomeUscita6 =
                  hex2asci(dato81) +
                  hex2asci(dato82) +
                  hex2asci(dato83) +
                  hex2asci(dato84) +
                  hex2asci(dato85) +
                  hex2asci(dato86) +
                  hex2asci(dato87) +
                  hex2asci(dato88) +
                  hex2asci(dato89) +
                  hex2asci(dato90) +
                  hex2asci(dato91) +
                  hex2asci(dato92) +
                  hex2asci(dato93) +
                  hex2asci(dato94) +
                  hex2asci(dato95) +
                  hex2asci(dato96);
                var nomeUscita7 =
                  hex2asci(dato97) +
                  hex2asci(dato98) +
                  hex2asci(dato99) +
                  hex2asci(dato100) +
                  hex2asci(dato101) +
                  hex2asci(dato102) +
                  hex2asci(dato103) +
                  hex2asci(dato104) +
                  hex2asci(dato105) +
                  hex2asci(dato106) +
                  hex2asci(dato107) +
                  hex2asci(dato108) +
                  hex2asci(dato109) +
                  hex2asci(dato110) +
                  hex2asci(dato111) +
                  hex2asci(dato112);
                var nomeUscita8 =
                  hex2asci(dato113) +
                  hex2asci(dato114) +
                  hex2asci(dato115) +
                  hex2asci(dato116) +
                  hex2asci(dato117) +
                  hex2asci(dato118) +
                  hex2asci(dato119) +
                  hex2asci(dato120) +
                  hex2asci(dato121) +
                  hex2asci(dato122) +
                  hex2asci(dato123) +
                  hex2asci(dato124) +
                  hex2asci(dato125) +
                  hex2asci(dato126) +
                  hex2asci(dato127) +
                  hex2asci(dato128);
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
                var dato1 = bufferino.slice(8, 10);
                var dato2 = bufferino.slice(10, 12);
                var dato3 = bufferino.slice(12, 14);
                var dato4 = bufferino.slice(14, 16);
                var dato5 = bufferino.slice(16, 18);
                var dato6 = bufferino.slice(18, 20);
                var dato7 = bufferino.slice(20, 22);
                var dato8 = bufferino.slice(22, 24);
                var dato9 = bufferino.slice(24, 26);
                var dato10 = bufferino.slice(26, 28);
                var dato11 = bufferino.slice(28, 30);
                var dato12 = bufferino.slice(30, 32);
                var dato13 = bufferino.slice(32, 34);
                var dato14 = bufferino.slice(34, 36);
                var dato15 = bufferino.slice(36, 38);
                var dato16 = bufferino.slice(38, 40);
                var dato17 = bufferino.slice(40, 42);
                var dato18 = bufferino.slice(42, 44);
                var dato19 = bufferino.slice(44, 46);
                var dato20 = bufferino.slice(46, 48);
                var dato21 = bufferino.slice(48, 50);
                var dato22 = bufferino.slice(50, 52);
                var dato23 = bufferino.slice(52, 54);
                var dato24 = bufferino.slice(54, 56);
                var dato25 = bufferino.slice(56, 58);
                var dato26 = bufferino.slice(58, 60);
                var dato27 = bufferino.slice(60, 62);
                var dato28 = bufferino.slice(62, 64);
                var dato29 = bufferino.slice(64, 66);
                var dato30 = bufferino.slice(66, 68);
                var dato31 = bufferino.slice(68, 70);
                var dato32 = bufferino.slice(70, 72);
                var dato33 = bufferino.slice(72, 74);
                var dato34 = bufferino.slice(74, 76);
                var dato35 = bufferino.slice(76, 78);
                var dato36 = bufferino.slice(78, 80);
                var dato37 = bufferino.slice(80, 82);
                var dato38 = bufferino.slice(82, 84);
                var dato39 = bufferino.slice(84, 86);
                var dato40 = bufferino.slice(86, 88);
                var dato41 = bufferino.slice(88, 90);
                var dato42 = bufferino.slice(90, 92);
                var dato43 = bufferino.slice(92, 94);
                var dato44 = bufferino.slice(94, 96);
                var dato45 = bufferino.slice(96, 98);
                var dato46 = bufferino.slice(98, 100);
                var dato47 = bufferino.slice(100, 102);
                var dato48 = bufferino.slice(102, 104);
                var dato49 = bufferino.slice(104, 106);
                var dato50 = bufferino.slice(106, 108);
                var dato51 = bufferino.slice(108, 110);
                var dato52 = bufferino.slice(110, 112);
                var dato53 = bufferino.slice(112, 114);
                var dato54 = bufferino.slice(114, 116);
                var dato55 = bufferino.slice(116, 118);
                var dato56 = bufferino.slice(118, 120);
                var dato57 = bufferino.slice(120, 122);
                var dato58 = bufferino.slice(122, 124);
                var dato59 = bufferino.slice(124, 126);
                var dato60 = bufferino.slice(126, 128);
                var dato61 = bufferino.slice(128, 130);
                var dato62 = bufferino.slice(130, 132);
                var dato63 = bufferino.slice(132, 134);
                var dato64 = bufferino.slice(134, 136);
                var dato65 = bufferino.slice(136, 138);
                var dato66 = bufferino.slice(138, 140);
                var dato67 = bufferino.slice(140, 142);
                var dato68 = bufferino.slice(142, 144);
                var dato69 = bufferino.slice(144, 146);
                var dato70 = bufferino.slice(146, 148);
                var dato71 = bufferino.slice(148, 150);
                var dato72 = bufferino.slice(150, 152);
                var dato73 = bufferino.slice(152, 154);
                var dato74 = bufferino.slice(154, 156);
                var dato75 = bufferino.slice(156, 158);
                var dato76 = bufferino.slice(158, 160);
                var dato77 = bufferino.slice(160, 162);
                var dato78 = bufferino.slice(162, 164);
                var dato79 = bufferino.slice(164, 166);
                var dato80 = bufferino.slice(166, 168);
                var dato81 = bufferino.slice(168, 170);
                var dato82 = bufferino.slice(170, 172);
                var dato83 = bufferino.slice(172, 174);
                var dato84 = bufferino.slice(174, 176);
                var dato85 = bufferino.slice(176, 178);
                var dato86 = bufferino.slice(178, 180);
                var dato87 = bufferino.slice(180, 182);
                var dato88 = bufferino.slice(182, 184);
                var dato89 = bufferino.slice(184, 186);
                var dato90 = bufferino.slice(186, 188);
                var dato91 = bufferino.slice(188, 190);
                var dato92 = bufferino.slice(190, 192);
                var dato93 = bufferino.slice(192, 194);
                var dato94 = bufferino.slice(194, 196);
                var dato95 = bufferino.slice(196, 198);
                var dato96 = bufferino.slice(198, 200);
                var dato97 = bufferino.slice(200, 202);
                var dato98 = bufferino.slice(202, 204);
                var dato99 = bufferino.slice(204, 206);
                var dato100 = bufferino.slice(206, 208);
                var dato101 = bufferino.slice(208, 210);
                var dato102 = bufferino.slice(210, 212);
                var dato103 = bufferino.slice(212, 214);
                var dato104 = bufferino.slice(214, 216);
                var dato105 = bufferino.slice(216, 218);
                var dato106 = bufferino.slice(218, 220);
                var dato107 = bufferino.slice(220, 222);
                var dato108 = bufferino.slice(222, 224);
                var dato109 = bufferino.slice(224, 226);
                var dato110 = bufferino.slice(226, 228);
                var dato111 = bufferino.slice(228, 230);
                var dato112 = bufferino.slice(230, 232);
                var dato113 = bufferino.slice(232, 234);
                var dato114 = bufferino.slice(234, 236);
                var dato115 = bufferino.slice(236, 238);
                var dato116 = bufferino.slice(238, 240);
                var dato117 = bufferino.slice(240, 242);
                var dato118 = bufferino.slice(242, 244);
                var dato119 = bufferino.slice(244, 246);
                var dato120 = bufferino.slice(246, 248);
                var dato121 = bufferino.slice(248, 250);
                var dato122 = bufferino.slice(250, 252);
                var dato123 = bufferino.slice(252, 254);
                var dato124 = bufferino.slice(254, 256);
                var dato125 = bufferino.slice(256, 258);
                var dato126 = bufferino.slice(258, 260);
                var dato127 = bufferino.slice(260, 262);
                var dato128 = bufferino.slice(262, 264);
                var nomeUscita9 =
                  hex2asci(dato1) +
                  hex2asci(dato2) +
                  hex2asci(dato3) +
                  hex2asci(dato4) +
                  hex2asci(dato5) +
                  hex2asci(dato6) +
                  hex2asci(dato7) +
                  hex2asci(dato8) +
                  hex2asci(dato9) +
                  hex2asci(dato10) +
                  hex2asci(dato11) +
                  hex2asci(dato12) +
                  hex2asci(dato13) +
                  hex2asci(dato14) +
                  hex2asci(dato15) +
                  hex2asci(dato16);
                var nomeUscita10 =
                  hex2asci(dato17) +
                  hex2asci(dato18) +
                  hex2asci(dato19) +
                  hex2asci(dato20) +
                  hex2asci(dato21) +
                  hex2asci(dato22) +
                  hex2asci(dato23) +
                  hex2asci(dato24) +
                  hex2asci(dato25) +
                  hex2asci(dato26) +
                  hex2asci(dato27) +
                  hex2asci(dato28) +
                  hex2asci(dato29) +
                  hex2asci(dato30) +
                  hex2asci(dato31) +
                  hex2asci(dato32);
                var nomeUscita11 =
                  hex2asci(dato33) +
                  hex2asci(dato34) +
                  hex2asci(dato35) +
                  hex2asci(dato36) +
                  hex2asci(dato37) +
                  hex2asci(dato38) +
                  hex2asci(dato39) +
                  hex2asci(dato40) +
                  hex2asci(dato41) +
                  hex2asci(dato42) +
                  hex2asci(dato43) +
                  hex2asci(dato44) +
                  hex2asci(dato45) +
                  hex2asci(dato46) +
                  hex2asci(dato47) +
                  hex2asci(dato48);
                var nomeUscita12 =
                  hex2asci(dato49) +
                  hex2asci(dato50) +
                  hex2asci(dato51) +
                  hex2asci(dato52) +
                  hex2asci(dato53) +
                  hex2asci(dato54) +
                  hex2asci(dato55) +
                  hex2asci(dato56) +
                  hex2asci(dato57) +
                  hex2asci(dato58) +
                  hex2asci(dato59) +
                  hex2asci(dato60) +
                  hex2asci(dato61) +
                  hex2asci(dato62) +
                  hex2asci(dato63) +
                  hex2asci(dato64);
                var nomeUscita13 =
                  hex2asci(dato65) +
                  hex2asci(dato66) +
                  hex2asci(dato67) +
                  hex2asci(dato68) +
                  hex2asci(dato69) +
                  hex2asci(dato70) +
                  hex2asci(dato71) +
                  hex2asci(dato72) +
                  hex2asci(dato73) +
                  hex2asci(dato74) +
                  hex2asci(dato75) +
                  hex2asci(dato76) +
                  hex2asci(dato77) +
                  hex2asci(dato78) +
                  hex2asci(dato79) +
                  hex2asci(dato80);
                var nomeUscita14 =
                  hex2asci(dato81) +
                  hex2asci(dato82) +
                  hex2asci(dato83) +
                  hex2asci(dato84) +
                  hex2asci(dato85) +
                  hex2asci(dato86) +
                  hex2asci(dato87) +
                  hex2asci(dato88) +
                  hex2asci(dato89) +
                  hex2asci(dato90) +
                  hex2asci(dato91) +
                  hex2asci(dato92) +
                  hex2asci(dato93) +
                  hex2asci(dato94) +
                  hex2asci(dato95) +
                  hex2asci(dato96);
                var nomeUscita15 =
                  hex2asci(dato97) +
                  hex2asci(dato98) +
                  hex2asci(dato99) +
                  hex2asci(dato100) +
                  hex2asci(dato101) +
                  hex2asci(dato102) +
                  hex2asci(dato103) +
                  hex2asci(dato104) +
                  hex2asci(dato105) +
                  hex2asci(dato106) +
                  hex2asci(dato107) +
                  hex2asci(dato108) +
                  hex2asci(dato109) +
                  hex2asci(dato110) +
                  hex2asci(dato111) +
                  hex2asci(dato112);
                var nomeUscita16 =
                  hex2asci(dato113) +
                  hex2asci(dato114) +
                  hex2asci(dato115) +
                  hex2asci(dato116) +
                  hex2asci(dato117) +
                  hex2asci(dato118) +
                  hex2asci(dato119) +
                  hex2asci(dato120) +
                  hex2asci(dato121) +
                  hex2asci(dato122) +
                  hex2asci(dato123) +
                  hex2asci(dato124) +
                  hex2asci(dato125) +
                  hex2asci(dato126) +
                  hex2asci(dato127) +
                  hex2asci(dato128);
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
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna9 = bufferino.slice(16, 18);
            var colonna10 = bufferino.slice(18, 20);
            var colonna11 = bufferino.slice(20, 22);
            var colonna4 = bufferino.slice(6, 8);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var colonna9bin = hex2bin(colonna9);
            var colonna10bin = hex2bin(colonna10);
            var colonna11bin = hex2bin(colonna11);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(7, 8)) {
                case "1":
                  console.log("zona 1 allarme amper");
                  arrayzoneallarmetamper[0] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[0] = 0;
                  break;
              }
              switch (colonna4bin.slice(6, 7)) {
                case "1":
                  console.log("zona 2 allarmetamper");
                  arrayzoneallarmetamper[1] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[1] = 0;
                  break;
              }
              switch (colonna4bin.slice(5, 6)) {
                case "1":
                  console.log("zona 3 allarmetamper");
                  arrayzoneallarmetamper[2] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[2] = 0;
                  break;
              }
              switch (colonna4bin.slice(4, 5)) {
                case "1":
                  console.log("zona 4 allarmetamper");
                  arrayzoneallarmetamper[3] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[3] = 0;
                  break;
              }
              switch (colonna4bin.slice(3, 4)) {
                case "1":
                  console.log("zona 5 allarmetamper");
                  arrayzoneallarmetamper[4] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[4] = 0;
                  break;
              }
              switch (colonna4bin.slice(2, 3)) {
                case "1":
                  console.log("zona 6 allarmetamper");
                  arrayzoneallarmetamper[5] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[5] = 0;
                  break;
              }
              switch (colonna4bin.slice(1, 2)) {
                case "1":
                  console.log("zona 7 allarmetamper");
                  arrayzoneallarmetamper[6] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[6] = 0;
                  break;
              }
              switch (colonna4bin.slice(0, 1)) {
                case "1":
                  console.log("zona 8 allarmetamper");
                  arrayzoneallarmetamper[7] = 1;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
                case "0":
                  arrayzoneallarmetamper[7] = 0;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
              }
            } else if (colonna4 == "00") {
              arrayzoneallarmetamper[0] = 0;
              arrayzoneallarmetamper[1] = 0;
              arrayzoneallarmetamper[2] = 0;
              arrayzoneallarmetamper[3] = 0;
              arrayzoneallarmetamper[4] = 0;
              arrayzoneallarmetamper[5] = 0;
              arrayzoneallarmetamper[6] = 0;
              arrayzoneallarmetamper[7] = 0;
            }
            if (colonna5 != "00") {
              switch (colonna5bin.slice(7, 8)) {
                case "1":
                  console.log("zona 9 allarme amper");
                  arrayzoneallarmetamper[8] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[8] = 0;
                  break;
              }
              switch (colonna4bin.slice(6, 7)) {
                case "1":
                  console.log("zona 10 allarmetamper");
                  arrayzoneallarmetamper[9] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[9] = 0;
                  break;
              }
              switch (colonna4bin.slice(5, 6)) {
                case "1":
                  console.log("zona 11 allarmetamper");
                  arrayzoneallarmetamper[10] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[10] = 0;
                  break;
              }
              switch (colonna4bin.slice(4, 5)) {
                case "1":
                  console.log("zona 12 allarmetamper");
                  arrayzoneallarmetamper[11] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[11] = 0;
                  break;
              }
              switch (colonna4bin.slice(3, 4)) {
                case "1":
                  console.log("zona 13 allarmetamper");
                  arrayzoneallarmetamper[12] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[12] = 0;
                  break;
              }
              switch (colonna4bin.slice(2, 3)) {
                case "1":
                  console.log("zona 14 allarmetamper");
                  arrayzoneallarmetamper[13] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[13] = 0;
                  break;
              }
              switch (colonna4bin.slice(1, 2)) {
                case "1":
                  console.log("zona 15 allarmetamper");
                  arrayzoneallarmetamper[14] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[14] = 0;
                  break;
              }
              switch (colonna4bin.slice(0, 1)) {
                case "1":
                  console.log("zona 16 allarmetamper");
                  arrayzoneallarmetamper[15] = 1;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
                case "0":
                  arrayzoneallarmetamper[15] = 0;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
              }
            } else if (colonna5 == "00") {
              arrayzoneallarmetamper[8] = 0;
              arrayzoneallarmetamper[9] = 0;
              arrayzoneallarmetamper[10] = 0;
              arrayzoneallarmetamper[11] = 0;
              arrayzoneallarmetamper[12] = 0;
              arrayzoneallarmetamper[13] = 0;
              arrayzoneallarmetamper[14] = 0;
              arrayzoneallarmetamper[15] = 0;
            }
            if (colonna6 != "00") {
              switch (colonna6bin.slice(7, 8)) {
                case "1":
                  console.log("zona 17 allarmetamper");
                  arrayzoneallarmetamper[16] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[16] = 0;
                  break;
              }
              switch (colonna6bin.slice(6, 7)) {
                case "1":
                  console.log("zona 18 allarmetamper");
                  arrayzoneallarmetamper[17] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[17] = 0;
                  break;
              }
              switch (colonna6bin.slice(5, 6)) {
                case "1":
                  console.log("zona 19 allarmetamper");
                  arrayzoneallarmetamper[18] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[18] = 0;
                  break;
              }
              switch (colonna6bin.slice(4, 5)) {
                case "1":
                  console.log("zona 20 allarmetamper");
                  arrayzoneallarmetamper[19] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[19] = 0;
                  break;
              }
              switch (colonna6bin.slice(3, 4)) {
                case "1":
                  console.log("zona 21 allarmetamper");
                  arrayzoneallarmetamper[20] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[20] = 0;
                  break;
              }
              switch (colonna6bin.slice(2, 3)) {
                case "1":
                  console.log("zona 22 allarmetamper");
                  arrayzoneallarmetamper[21] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[21] = 0;
                  break;
              }
              switch (colonna6bin.slice(1, 2)) {
                case "1":
                  console.log("zona 23 allarmetamper");
                  arrayzoneallarmetamper[22] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[22] = 0;
                  break;
              }
              switch (colonna6bin.slice(0, 1)) {
                case "1":
                  console.log("zona 24 allarmetamper");
                  arrayzoneallarmetamper[23] = 1;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
                case "0":
                  arrayzoneallarmetamper[23] = 0;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
              }
            } else if (colonna6 == "00") {
              arrayzoneallarmetamper[16] = 0;
              arrayzoneallarmetamper[17] = 0;
              arrayzoneallarmetamper[18] = 0;
              arrayzoneallarmetamper[19] = 0;
              arrayzoneallarmetamper[20] = 0;
              arrayzoneallarmetamper[21] = 0;
              arrayzoneallarmetamper[22] = 0;
              arrayzoneallarmetamper[23] = 0;
            }
            if (colonna7 != "00") {
              switch (colonna7bin.slice(7, 8)) {
                case "1":
                  console.log("zona 25 allarmetamper");
                  arrayzoneallarmetamper[24] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[24] = 0;
                  break;
              }
              switch (colonna7bin.slice(6, 7)) {
                case "1":
                  console.log("zona 26 allarmetamper");
                  arrayzoneallarmetamper[25] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[25] = 0;
                  break;
              }
              switch (colonna7bin.slice(5, 6)) {
                case "1":
                  console.log("zona 27 allarmetamper");
                  arrayzoneallarmetamper[26] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[26] = 0;
                  break;
              }
              switch (colonna7bin.slice(4, 5)) {
                case "1":
                  console.log("zona 28 allarmetamper");
                  arrayzoneallarmetamper[27] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[27] = 0;
                  break;
              }
              switch (colonna7bin.slice(3, 4)) {
                case "1":
                  console.log("zona 29 allarmetamper");
                  arrayzoneallarmetamper[28] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[28] = 0;
                  break;
              }
              switch (colonna7bin.slice(2, 3)) {
                case "1":
                  console.log("zona 30 allarmetamper");
                  arrayzoneallarmetamper[29] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[29] = 0;
                  break;
              }
              switch (colonna7bin.slice(1, 2)) {
                case "1":
                  console.log("zona 31 allarmetamper");
                  arrayzoneallarmetamper[30] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[30] = 0;
                  break;
              }
              switch (colonna7bin.slice(0, 1)) {
                case "1":
                  console.log("zona 32 allarmetamper");
                  arrayzoneallarmetamper[31] = 1;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
                case "0":
                  arrayzoneallarmetamper[31] = 0;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
              }
            } else if (colonna7 == "00") {
              arrayzoneallarmetamper[24] = 0;
              arrayzoneallarmetamper[25] = 0;
              arrayzoneallarmetamper[26] = 0;
              arrayzoneallarmetamper[27] = 0;
              arrayzoneallarmetamper[28] = 0;
              arrayzoneallarmetamper[29] = 0;
              arrayzoneallarmetamper[30] = 0;
              arrayzoneallarmetamper[31] = 0;
            }
            if (colonna8 != "00") {
              switch (colonna8bin.slice(7, 8)) {
                case "1":
                  console.log("zona 33 allarmetamper");
                  arrayzoneallarmetamper[32] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[32] = 0;
                  break;
              }
              switch (colonna8bin.slice(6, 7)) {
                case "1":
                  console.log("zona 34 allarmetamper");
                  arrayzoneallarmetamper[33] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[33] = 0;
                  break;
              }
              switch (colonna8bin.slice(5, 6)) {
                case "1":
                  console.log("zona 35 allarmetamper");
                  arrayzoneallarmetamper[34] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[34] = 0;
                  break;
              }
              switch (colonna8bin.slice(4, 5)) {
                case "1":
                  console.log("zona 36 allarmetamper");
                  arrayzoneallarmetamper[35] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[35] = 0;
                  break;
              }
              switch (colonna8bin.slice(3, 4)) {
                case "1":
                  console.log("zona 37 allarmetamper");
                  arrayzoneallarmetamper[36] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[36] = 0;
                  break;
              }
              switch (colonna8bin.slice(2, 3)) {
                case "1":
                  console.log("zona 38 allarmetamper");
                  arrayzoneallarmetamper[37] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[37] = 0;
                  break;
              }
              switch (colonna8bin.slice(1, 2)) {
                case "1":
                  console.log("zona 39 allarmetamper");
                  arrayzoneallarmetamper[38] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[38] = 0;
                  break;
              }
              switch (colonna8bin.slice(0, 1)) {
                case "1":
                  console.log("zona 40 allarmetamper");
                  arrayzoneallarmetamper[39] = 1;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
                case "0":
                  arrayzoneallarmetamper[39] = 0;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
              }
            } else if (colonna8 == "00") {
              arrayzoneallarmetamper[32] = 0;
              arrayzoneallarmetamper[33] = 0;
              arrayzoneallarmetamper[34] = 0;
              arrayzoneallarmetamper[35] = 0;
              arrayzoneallarmetamper[36] = 0;
              arrayzoneallarmetamper[37] = 0;
              arrayzoneallarmetamper[38] = 0;
              arrayzoneallarmetamper[39] = 0;
            }
            if (colonna9 != "00") {
              switch (colonna9bin.slice(7, 8)) {
                case "1":
                  console.log("zona 41 allarmetamper");
                  arrayzoneallarmetamper[40] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[40] = 0;
                  break;
              }
              switch (colonna9bin.slice(6, 7)) {
                case "1":
                  console.log("zona 42 allarmetamper");
                  arrayzoneallarmetamper[41] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[41] = 0;
                  break;
              }
              switch (colonna9bin.slice(5, 6)) {
                case "1":
                  console.log("zona 43 allarmetamper");
                  arrayzoneallarmetamper[42] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[42] = 0;
                  break;
              }
              switch (colonna9bin.slice(4, 5)) {
                case "1":
                  console.log("zona 44 allarmetamper");
                  arrayzoneallarmetamper[43] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[43] = 0;
                  break;
              }
              switch (colonna9bin.slice(3, 4)) {
                case "1":
                  console.log("zona 45 allarmetamper");
                  arrayzoneallarmetamper[44] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[44] = 0;
                  break;
              }
              switch (colonna9bin.slice(2, 3)) {
                case "1":
                  console.log("zona 46 allarmetamper");
                  arrayzoneallarmetamper[45] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[45] = 0;
                  break;
              }
              switch (colonna9bin.slice(1, 2)) {
                case "1":
                  console.log("zona 47 allarmetamper");
                  arrayzoneallarmetamper[46] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[46] = 0;
                  break;
              }
              switch (colonna9bin.slice(0, 1)) {
                case "1":
                  console.log("zona 48 allarmetamper");
                  arrayzoneallarmetamper[47] = 1;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
                case "0":
                  arrayzoneallarmetamper[47] = 0;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
              }
            } else if (colonna9 == "00") {
              arrayzoneallarmetamper[40] = 0;
              arrayzoneallarmetamper[41] = 0;
              arrayzoneallarmetamper[42] = 0;
              arrayzoneallarmetamper[43] = 0;
              arrayzoneallarmetamper[44] = 0;
              arrayzoneallarmetamper[45] = 0;
              arrayzoneallarmetamper[46] = 0;
              arrayzoneallarmetamper[47] = 0;
            }
            if (colonna10 != "00") {
              switch (colonna10bin.slice(7, 8)) {
                case "1":
                  console.log("zona 49 allarmetamper");
                  arrayzoneallarmetamper[48] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[48] = 0;
                  break;
              }
              switch (colonna10bin.slice(6, 7)) {
                case "1":
                  console.log("zona 50 allarmetamper");
                  arrayzoneallarmetamper[49] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[49] = 0;
                  break;
              }
              switch (colonna10bin.slice(5, 6)) {
                case "1":
                  console.log("zona 51 allarmetamper");
                  arrayzoneallarmetamper[50] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[50] = 0;
                  break;
              }
              switch (colonna10bin.slice(4, 5)) {
                case "1":
                  console.log("zona 52 allarmetamper");
                  arrayzoneallarmetamper[51] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[51] = 0;
                  break;
              }
              switch (colonna10bin.slice(3, 4)) {
                case "1":
                  console.log("zona 53 allarmetamper");
                  arrayzoneallarmetamper[52] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[52] = 0;
                  break;
              }
              switch (colonna10bin.slice(2, 3)) {
                case "1":
                  console.log("zona 54 allarmetamper");
                  arrayzoneallarmetamper[53] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[53] = 0;
                  break;
              }
              switch (colonna10bin.slice(1, 2)) {
                case "1":
                  console.log("zona 55 allarmetamper");
                  arrayzoneallarmetamper[54] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[54] = 0;
                  break;
              }
              switch (colonna10bin.slice(0, 1)) {
                case "1":
                  console.log("zona 56 allarmetamper");
                  arrayzoneallarmetamper[55] = 1;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
                case "0":
                  arrayzoneallarmetamper[55] = 0;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
              }
            } else if (colonna10 == "00") {
              arrayzoneallarmetamper[48] = 0;
              arrayzoneallarmetamper[49] = 0;
              arrayzoneallarmetamper[50] = 0;
              arrayzoneallarmetamper[51] = 0;
              arrayzoneallarmetamper[52] = 0;
              arrayzoneallarmetamper[53] = 0;
              arrayzoneallarmetamper[54] = 0;
              arrayzoneallarmetamper[55] = 0;
            }
            if (colonna11 != "00") {
              switch (colonna11bin.slice(7, 8)) {
                case "1":
                  console.log("zona 57 allarmetamper");
                  arrayzoneallarmetamper[56] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[56] = 0;
                  break;
              }
              switch (colonna11bin.slice(6, 7)) {
                case "1":
                  console.log("zona 58 allarmetamper");
                  arrayzoneallarmetamper[57] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[57] = 0;
                  break;
              }
              switch (colonna11bin.slice(5, 6)) {
                case "1":
                  console.log("zona 59 allarmetamper");
                  arrayzoneallarmetamper[58] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[58] = 0;
                  break;
              }
              switch (colonna11bin.slice(4, 5)) {
                case "1":
                  console.log("zona 60 allarmetamper");
                  arrayzoneallarmetamper[59] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[59] = 0;
                  break;
              }
              switch (colonna11bin.slice(3, 4)) {
                case "1":
                  console.log("zona 61 allarmetamper");
                  arrayzoneallarmetamper[60] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[60] = 0;
                  break;
              }
              switch (colonna11bin.slice(2, 3)) {
                case "1":
                  console.log("zona 62 allarmetamper");
                  arrayzoneallarmetamper[61] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[61] = 0;
                  break;
              }
              switch (colonna11bin.slice(1, 2)) {
                case "1":
                  console.log("zona 63 allarmetamper");
                  arrayzoneallarmetamper[62] = 1;
                  break;
                case "0":
                  arrayzoneallarmetamper[62] = 0;
                  break;
              }
              switch (colonna11bin.slice(0, 1)) {
                case "1":
                  console.log("zona 64 allarmetamper");
                  arrayzoneallarmetamper[63] = 1;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
                case "0":
                  arrayzoneallarmetamper[63] = 0;
                  console.log("arrayzoneallarmetamper", arrayzoneallarmetamper);
                  break;
              }
            } else if (colonna11 == "00") {
              arrayzoneallarmetamper[56] = 0;
              arrayzoneallarmetamper[57] = 0;
              arrayzoneallarmetamper[58] = 0;
              arrayzoneallarmetamper[59] = 0;
              arrayzoneallarmetamper[60] = 0;
              arrayzoneallarmetamper[61] = 0;
              arrayzoneallarmetamper[62] = 0;
              arrayzoneallarmetamper[63] = 0;
            }
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
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna9 = bufferino.slice(16, 18);
            var colonna10 = bufferino.slice(18, 20);
            var colonna11 = bufferino.slice(20, 22);
            var colonna4 = bufferino.slice(6, 8);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var colonna9bin = hex2bin(colonna9);
            var colonna10bin = hex2bin(colonna10);
            var colonna11bin = hex2bin(colonna11);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(7, 8)) {
                case "1":
                  console.log("zona 1 mr");
                  arrayzonemr[0] = 1;
                  break;
                case "0":
                  arrayzonemr[0] = 0;
                  break;
              }
              switch (colonna4bin.slice(6, 7)) {
                case "1":
                  console.log("zona 2 mr");
                  arrayzoneamr[1] = 1;
                  break;
                case "0":
                  arrayzonemr[1] = 0;
                  break;
              }
              switch (colonna4bin.slice(5, 6)) {
                case "1":
                  console.log("zona 3 mr");
                  arrayzonemr[2] = 1;
                  break;
                case "0":
                  arrayzonemr[2] = 0;
                  break;
              }
              switch (colonna4bin.slice(4, 5)) {
                case "1":
                  console.log("zona 4 mr");
                  arrayzonemr[3] = 1;
                  break;
                case "0":
                  arrayzonemr[3] = 0;
                  break;
              }
              switch (colonna4bin.slice(3, 4)) {
                case "1":
                  console.log("zona 5 mr");
                  arrayzonemr[4] = 1;
                  break;
                case "0":
                  arrayzonemr[4] = 0;
                  break;
              }
              switch (colonna4bin.slice(2, 3)) {
                case "1":
                  console.log("zona 6 mr");
                  arrayzonemr[5] = 1;
                  break;
                case "0":
                  arrayzonemr[5] = 0;
                  break;
              }
              switch (colonna4bin.slice(1, 2)) {
                case "1":
                  console.log("zona 7 mr");
                  arrayzonemr[6] = 1;
                  break;
                case "0":
                  arrayzonemr[6] = 0;
                  break;
              }
              switch (colonna4bin.slice(0, 1)) {
                case "1":
                  console.log("zona 8 mr");
                  arrayzonemr[7] = 1;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
                case "0":
                  arrayzonemr[7] = 0;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
              }
            } else if (colonna4 == "00") {
              arrayzonemr[0] = 0;
              arrayzonemr[1] = 0;
              arrayzonemr[2] = 0;
              arrayzonemr[3] = 0;
              arrayzonemr[4] = 0;
              arrayzonemr[5] = 0;
              arrayzonemr[6] = 0;
              arrayzonemr[7] = 0;
            }
            if (colonna5 != "00") {
              switch (colonna5bin.slice(7, 8)) {
                case "1":
                  console.log("zona 9 mr");
                  arrayzonemr[8] = 1;
                  break;
                case "0":
                  arrayzonemr[8] = 0;
                  break;
              }
              switch (colonna5bin.slice(6, 7)) {
                case "1":
                  console.log("zona 10 mr");
                  arrayzoneamr[9] = 1;
                  break;
                case "0":
                  arrayzonemr[9] = 0;
                  break;
              }
              switch (colonna5bin.slice(5, 6)) {
                case "1":
                  console.log("zona 11 mr");
                  arrayzonemr[10] = 1;
                  break;
                case "0":
                  arrayzonemr[10] = 0;
                  break;
              }
              switch (colonna5bin.slice(4, 5)) {
                case "1":
                  console.log("zona 12 mr");
                  arrayzonemr[11] = 1;
                  break;
                case "0":
                  arrayzonemr[11] = 0;
                  break;
              }
              switch (colonna5bin.slice(3, 4)) {
                case "1":
                  console.log("zona 13 mr");
                  arrayzonemr[12] = 1;
                  break;
                case "0":
                  arrayzonemr[12] = 0;
                  break;
              }
              switch (colonna5bin.slice(2, 3)) {
                case "1":
                  console.log("zona 14 mr");
                  arrayzonemr[13] = 1;
                  break;
                case "0":
                  arrayzonemr[13] = 0;
                  break;
              }
              switch (colonna5bin.slice(1, 2)) {
                case "1":
                  console.log("zona 15 mr");
                  arrayzonemr[14] = 1;
                  break;
                case "0":
                  arrayzonemr[14] = 0;
                  break;
              }
              switch (colonna5bin.slice(0, 1)) {
                case "1":
                  console.log("zona 16 mr");
                  arrayzonemr[15] = 1;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
                case "0":
                  arrayzonemr[15] = 0;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
              }
            } else if (colonna5 == "00") {
              arrayzonemr[8] = 0;
              arrayzonemr[9] = 0;
              arrayzonemr[10] = 0;
              arrayzonemr[11] = 0;
              arrayzonemr[12] = 0;
              arrayzonemr[13] = 0;
              arrayzonemr[14] = 0;
              arrayzonemr[15] = 0;
            }
            if (colonna6 != "00") {
              switch (colonna6bin.slice(7, 8)) {
                case "1":
                  console.log("zona 17 mr");
                  arrayzonemr[16] = 1;
                  break;
                case "0":
                  arrayzonemr[16] = 0;
                  break;
              }
              switch (colonna6bin.slice(6, 7)) {
                case "1":
                  console.log("zona 18 mr");
                  arrayzonemr[17] = 1;
                  break;
                case "0":
                  arrayzonemr[17] = 0;
                  break;
              }
              switch (colonna6bin.slice(5, 6)) {
                case "1":
                  console.log("zona 19 mr");
                  arrayzonemr[18] = 1;
                  break;
                case "0":
                  arrayzonemr[18] = 0;
                  break;
              }
              switch (colonna6bin.slice(4, 5)) {
                case "1":
                  console.log("zona 20 mr");
                  arrayzonemr[19] = 1;
                  break;
                case "0":
                  arrayzonemr[19] = 0;
                  break;
              }
              switch (colonna6bin.slice(3, 4)) {
                case "1":
                  console.log("zona 21 mr");
                  arrayzonemr[20] = 1;
                  break;
                case "0":
                  arrayzonemr[20] = 0;
                  break;
              }
              switch (colonna6bin.slice(2, 3)) {
                case "1":
                  console.log("zona 22 mr");
                  arrayzonemr[21] = 1;
                  break;
                case "0":
                  arrayzonemr[21] = 0;
                  break;
              }
              switch (colonna6bin.slice(1, 2)) {
                case "1":
                  console.log("zona 23 mr");
                  arrayzonemr[22] = 1;
                  break;
                case "0":
                  arrayzonemr[22] = 0;
                  break;
              }
              switch (colonna6bin.slice(0, 1)) {
                case "1":
                  console.log("zona 24 mr");
                  arrayzonemr[23] = 1;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
                case "0":
                  arrayzonemr[23] = 0;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
              }
            } else if (colonna6 == "00") {
              arrayzonemr[16] = 0;
              arrayzonemr[17] = 0;
              arrayzonemr[18] = 0;
              arrayzonemr[19] = 0;
              arrayzonemr[20] = 0;
              arrayzonemr[21] = 0;
              arrayzonemr[22] = 0;
              arrayzonemr[23] = 0;
            }
            if (colonna7 != "00") {
              switch (colonna7bin.slice(7, 8)) {
                case "1":
                  console.log("zona 25 mr");
                  arrayzonemr[24] = 1;
                  break;
                case "0":
                  arrayzonemr[24] = 0;
                  break;
              }
              switch (colonna7bin.slice(6, 7)) {
                case "1":
                  console.log("zona 26 mr");
                  arrayzonemr[25] = 1;
                  break;
                case "0":
                  arrayzonemr[25] = 0;
                  break;
              }
              switch (colonna7bin.slice(5, 6)) {
                case "1":
                  console.log("zona 27 mr");
                  arrayzonemr[26] = 1;
                  break;
                case "0":
                  arrayzonemr[26] = 0;
                  break;
              }
              switch (colonna7bin.slice(4, 5)) {
                case "1":
                  console.log("zona 28 mr");
                  arrayzonemr[27] = 1;
                  break;
                case "0":
                  arrayzonemr[27] = 0;
                  break;
              }
              switch (colonna7bin.slice(3, 4)) {
                case "1":
                  console.log("zona 29 mr");
                  arrayzonemr[28] = 1;
                  break;
                case "0":
                  arrayzonemr[28] = 0;
                  break;
              }
              switch (colonna7bin.slice(2, 3)) {
                case "1":
                  console.log("zona 30 mr");
                  arrayzonemr[29] = 1;
                  break;
                case "0":
                  arrayzonemr[29] = 0;
                  break;
              }
              switch (colonna7bin.slice(1, 2)) {
                case "1":
                  console.log("zona 31 mr");
                  arrayzonemr[30] = 1;
                  break;
                case "0":
                  arrayzonemr[30] = 0;
                  break;
              }
              switch (colonna7bin.slice(0, 1)) {
                case "1":
                  console.log("zona 32 mr");
                  arrayzonemr[31] = 1;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
                case "0":
                  arrayzonemr[31] = 0;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
              }
            } else if (colonna7 == "00") {
              arrayzonemr[24] = 0;
              arrayzonemr[25] = 0;
              arrayzonemr[26] = 0;
              arrayzonemr[27] = 0;
              arrayzonemr[28] = 0;
              arrayzonemr[29] = 0;
              arrayzonemr[30] = 0;
              arrayzonemr[31] = 0;
            }
            if (colonna8 != "00") {
              switch (colonna8bin.slice(7, 8)) {
                case "1":
                  console.log("zona 33 mr");
                  arrayzonemr[32] = 1;
                  break;
                case "0":
                  arrayzonemr[32] = 0;
                  break;
              }
              switch (colonna8bin.slice(6, 7)) {
                case "1":
                  console.log("zona 34 mr");
                  arrayzonemr[33] = 1;
                  break;
                case "0":
                  arrayzonemr[33] = 0;
                  break;
              }
              switch (colonna8bin.slice(5, 6)) {
                case "1":
                  console.log("zona 35 mr");
                  arrayzonemr[34] = 1;
                  break;
                case "0":
                  arrayzonemr[34] = 0;
                  break;
              }
              switch (colonna8bin.slice(4, 5)) {
                case "1":
                  console.log("zona 36 mr");
                  arrayzonemr[35] = 1;
                  break;
                case "0":
                  arrayzonemr[35] = 0;
                  break;
              }
              switch (colonna8bin.slice(3, 4)) {
                case "1":
                  console.log("zona 37 mr");
                  arrayzonemr[36] = 1;
                  break;
                case "0":
                  arrayzonemr[36] = 0;
                  break;
              }
              switch (colonna8bin.slice(2, 3)) {
                case "1":
                  console.log("zona 38 mr");
                  arrayzonemr[37] = 1;
                  break;
                case "0":
                  arrayzonemr[37] = 0;
                  break;
              }
              switch (colonna8bin.slice(1, 2)) {
                case "1":
                  console.log("zona 39 mr");
                  arrayzonemr[38] = 1;
                  break;
                case "0":
                  arrayzonemr[38] = 0;
                  break;
              }
              switch (colonna8bin.slice(0, 1)) {
                case "1":
                  console.log("zona 40 mr");
                  arrayzonemr[39] = 1;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
                case "0":
                  arrayzonemr[39] = 0;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
              }
            } else if (colonna8 == "00") {
              arrayzonemr[32] = 0;
              arrayzonemr[33] = 0;
              arrayzonemr[34] = 0;
              arrayzonemr[35] = 0;
              arrayzonemr[36] = 0;
              arrayzonemr[37] = 0;
              arrayzonemr[38] = 0;
              arrayzonemr[39] = 0;
            }
            if (colonna9 != "00") {
              switch (colonna9bin.slice(7, 8)) {
                case "1":
                  console.log("zona 41 mr");
                  arrayzonemr[40] = 1;
                  break;
                case "0":
                  arrayzonemr[40] = 0;
                  break;
              }
              switch (colonna9bin.slice(6, 7)) {
                case "1":
                  console.log("zona 42 mr");
                  arrayzonemr[41] = 1;
                  break;
                case "0":
                  arrayzonemr[41] = 0;
                  break;
              }
              switch (colonna9bin.slice(5, 6)) {
                case "1":
                  console.log("zona 43 mr");
                  arrayzonemr[42] = 1;
                  break;
                case "0":
                  arrayzonemr[42] = 0;
                  break;
              }
              switch (colonna9bin.slice(4, 5)) {
                case "1":
                  console.log("zona 44 mr");
                  arrayzonemr[43] = 1;
                  break;
                case "0":
                  arrayzonemr[43] = 0;
                  break;
              }
              switch (colonna9bin.slice(3, 4)) {
                case "1":
                  console.log("zona 45 mr");
                  arrayzonemr[44] = 1;
                  break;
                case "0":
                  arrayzonemr[44] = 0;
                  break;
              }
              switch (colonna9bin.slice(2, 3)) {
                case "1":
                  console.log("zona 46 mr");
                  arrayzonemr[45] = 1;
                  break;
                case "0":
                  arrayzonemr[45] = 0;
                  break;
              }
              switch (colonna9bin.slice(1, 2)) {
                case "1":
                  console.log("zona 47 mr");
                  arrayzonemr[46] = 1;
                  break;
                case "0":
                  arrayzonemr[46] = 0;
                  break;
              }
              switch (colonna9bin.slice(0, 1)) {
                case "1":
                  console.log("zona 48 mr");
                  arrayzonemr[47] = 1;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
                case "0":
                  arrayzonemr[47] = 0;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
              }
            } else if (colonna9 == "00") {
              arrayzonemr[40] = 0;
              arrayzonemr[41] = 0;
              arrayzonemr[42] = 0;
              arrayzonemr[43] = 0;
              arrayzonemr[44] = 0;
              arrayzonemr[45] = 0;
              arrayzonemr[46] = 0;
              arrayzonemr[47] = 0;
            }
            if (colonna10 != "00") {
              switch (colonna10bin.slice(7, 8)) {
                case "1":
                  console.log("zona 49 mr");
                  arrayzonemr[48] = 1;
                  break;
                case "0":
                  arrayzonemr[48] = 0;
                  break;
              }
              switch (colonna10bin.slice(6, 7)) {
                case "1":
                  console.log("zona 50 mr");
                  arrayzonemr[49] = 1;
                  break;
                case "0":
                  arrayzonemr[49] = 0;
                  break;
              }
              switch (colonna10bin.slice(5, 6)) {
                case "1":
                  console.log("zona 51 mr");
                  arrayzonemr[50] = 1;
                  break;
                case "0":
                  arrayzonemr[50] = 0;
                  break;
              }
              switch (colonna10bin.slice(4, 5)) {
                case "1":
                  console.log("zona 52 mr");
                  arrayzonemr[51] = 1;
                  break;
                case "0":
                  arrayzonemr[51] = 0;
                  break;
              }
              switch (colonna10bin.slice(3, 4)) {
                case "1":
                  console.log("zona 53 mr");
                  arrayzonemr[52] = 1;
                  break;
                case "0":
                  arrayzonemr[52] = 0;
                  break;
              }
              switch (colonna10bin.slice(2, 3)) {
                case "1":
                  console.log("zona 54 mr");
                  arrayzonemr[53] = 1;
                  break;
                case "0":
                  arrayzonemr[53] = 0;
                  break;
              }
              switch (colonna10bin.slice(1, 2)) {
                case "1":
                  console.log("zona 55 mr");
                  arrayzonemr[54] = 1;
                  break;
                case "0":
                  arrayzonemr[54] = 0;
                  break;
              }
              switch (colonna10bin.slice(0, 1)) {
                case "1":
                  console.log("zona 56 mr");
                  arrayzonemr[55] = 1;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
                case "0":
                  arrayzonemr[55] = 0;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
              }
            } else if (colonna10 == "00") {
              arrayzonemr[48] = 0;
              arrayzonemr[49] = 0;
              arrayzonemr[50] = 0;
              arrayzonemr[51] = 0;
              arrayzonemr[52] = 0;
              arrayzonemr[53] = 0;
              arrayzonemr[54] = 0;
              arrayzonemr[55] = 0;
            }
            if (colonna11 != "00") {
              switch (colonna11bin.slice(7, 8)) {
                case "1":
                  console.log("zona 57 mr");
                  arrayzonemr[56] = 1;
                  break;
                case "0":
                  arrayzonemr[56] = 0;
                  break;
              }
              switch (colonna11bin.slice(6, 7)) {
                case "1":
                  console.log("zona 58 mr");
                  arrayzonemr[57] = 1;
                  break;
                case "0":
                  arrayzonemr[57] = 0;
                  break;
              }
              switch (colonna11bin.slice(5, 6)) {
                case "1":
                  console.log("zona 59 mr");
                  arrayzonemr[58] = 1;
                  break;
                case "0":
                  arrayzonemr[58] = 0;
                  break;
              }
              switch (colonna11bin.slice(4, 5)) {
                case "1":
                  console.log("zona 60 mr");
                  arrayzonemr[59] = 1;
                  break;
                case "0":
                  arrayzonemr[59] = 0;
                  break;
              }
              switch (colonna11bin.slice(3, 4)) {
                case "1":
                  console.log("zona 61 mr");
                  arrayzonemr[60] = 1;
                  break;
                case "0":
                  arrayzonemr[60] = 0;
                  break;
              }
              switch (colonna11bin.slice(2, 3)) {
                case "1":
                  console.log("zona 62 mr");
                  arrayzonemr[61] = 1;
                  break;
                case "0":
                  arrayzonemr[61] = 0;
                  break;
              }
              switch (colonna11bin.slice(1, 2)) {
                case "1":
                  console.log("zona 63 mr");
                  arrayzonemr[62] = 1;
                  break;
                case "0":
                  arrayzonemr[62] = 0;
                  break;
              }
              switch (colonna11bin.slice(0, 1)) {
                case "1":
                  console.log("zona 64 mr");
                  arrayzonemr[63] = 1;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
                case "0":
                  arrayzonemr[63] = 0;
                  console.log("arrayzonemr", arrayzonemr);
                  break;
              }
            } else if (colonna11 == "00") {
              arrayzonemr[56] = 0;
              arrayzonemr[57] = 0;
              arrayzonemr[58] = 0;
              arrayzonemr[59] = 0;
              arrayzonemr[60] = 0;
              arrayzonemr[61] = 0;
              arrayzonemr[62] = 0;
              arrayzonemr[63] = 0;
            }
          }
          if (payload == "3B") {
            risultato = "guasto batteria scarica zone radio";
            console.log(risultato);
            var colonna5 = bufferino.slice(8, 10);
            var colonna6 = bufferino.slice(10, 12);
            var colonna7 = bufferino.slice(12, 14);
            var colonna8 = bufferino.slice(14, 16);
            var colonna9 = bufferino.slice(16, 18);
            var colonna10 = bufferino.slice(18, 20);
            var colonna11 = bufferino.slice(20, 22);
            var colonna4 = bufferino.slice(6, 8);
            var colonna5bin = hex2bin(colonna5);
            var colonna6bin = hex2bin(colonna6);
            var colonna7bin = hex2bin(colonna7);
            var colonna8bin = hex2bin(colonna8);
            var colonna9bin = hex2bin(colonna9);
            var colonna10bin = hex2bin(colonna10);
            var colonna11bin = hex2bin(colonna11);
            var colonna4bin = hex2bin(colonna4);
            if (colonna4 != "00") {
              switch (colonna4bin.slice(7, 8)) {
                case "1":
                  console.log("zona 1 batt");
                  arrayzonebatt[0] = 1;
                  break;
                case "0":
                  arrayzonebatt[0] = 0;
                  break;
              }
              switch (colonna4bin.slice(6, 7)) {
                case "1":
                  console.log("zona 2 batt");
                  arrayzoneabatt[1] = 1;
                  break;
                case "0":
                  arrayzonebatt[1] = 0;
                  break;
              }
              switch (colonna4bin.slice(5, 6)) {
                case "1":
                  console.log("zona 3 batt");
                  arrayzonebatt[2] = 1;
                  break;
                case "0":
                  arrayzonebatt[2] = 0;
                  break;
              }
              switch (colonna4bin.slice(4, 5)) {
                case "1":
                  console.log("zona 4 batt");
                  arrayzonebatt[3] = 1;
                  break;
                case "0":
                  arrayzonebatt[3] = 0;
                  break;
              }
              switch (colonna4bin.slice(3, 4)) {
                case "1":
                  console.log("zona 5 batt");
                  arrayzonebatt[4] = 1;
                  break;
                case "0":
                  arrayzonebatt[4] = 0;
                  break;
              }
              switch (colonna4bin.slice(2, 3)) {
                case "1":
                  console.log("zona 6 batt");
                  arrayzonebatt[5] = 1;
                  break;
                case "0":
                  arrayzonebatt[5] = 0;
                  break;
              }
              switch (colonna4bin.slice(1, 2)) {
                case "1":
                  console.log("zona 7 batt");
                  arrayzonebatt[6] = 1;
                  break;
                case "0":
                  arrayzonebatt[6] = 0;
                  break;
              }
              switch (colonna4bin.slice(0, 1)) {
                case "1":
                  console.log("zona 8 batt");
                  arrayzonebatt[7] = 1;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
                case "0":
                  arrayzonebatt[7] = 0;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
              }
            } else if (colonna4 == "00") {
              arrayzonebatt[0] = 0;
              arrayzonebatt[1] = 0;
              arrayzonebatt[2] = 0;
              arrayzonebatt[3] = 0;
              arrayzonebatt[4] = 0;
              arrayzonebatt[5] = 0;
              arrayzonebatt[6] = 0;
              arrayzonebatt[7] = 0;
            }
            if (colonna5 != "00") {
              switch (colonna5bin.slice(7, 8)) {
                case "1":
                  console.log("zona 9 batt");
                  arrayzonebatt[8] = 1;
                  break;
                case "0":
                  arrayzonebatt[8] = 0;
                  break;
              }
              switch (colonna5bin.slice(6, 7)) {
                case "1":
                  console.log("zona 10 batt");
                  arrayzoneabatt[9] = 1;
                  break;
                case "0":
                  arrayzonebatt[9] = 0;
                  break;
              }
              switch (colonna5bin.slice(5, 6)) {
                case "1":
                  console.log("zona 11 batt");
                  arrayzonebatt[10] = 1;
                  break;
                case "0":
                  arrayzonebatt[10] = 0;
                  break;
              }
              switch (colonna5bin.slice(4, 5)) {
                case "1":
                  console.log("zona 12 batt");
                  arrayzonebatt[11] = 1;
                  break;
                case "0":
                  arrayzonebatt[11] = 0;
                  break;
              }
              switch (colonna5bin.slice(3, 4)) {
                case "1":
                  console.log("zona 13 batt");
                  arrayzonebatt[12] = 1;
                  break;
                case "0":
                  arrayzonebatt[12] = 0;
                  break;
              }
              switch (colonna5bin.slice(2, 3)) {
                case "1":
                  console.log("zona 14 batt");
                  arrayzonebatt[13] = 1;
                  break;
                case "0":
                  arrayzonebatt[13] = 0;
                  break;
              }
              switch (colonna5bin.slice(1, 2)) {
                case "1":
                  console.log("zona 15 batt");
                  arrayzonebatt[14] = 1;
                  break;
                case "0":
                  arrayzonebatt[14] = 0;
                  break;
              }
              switch (colonna5bin.slice(0, 1)) {
                case "1":
                  console.log("zona 16 batt");
                  arrayzonebatt[15] = 1;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
                case "0":
                  arrayzonebatt[15] = 0;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
              }
            } else if (colonna5 == "00") {
              arrayzonebatt[8] = 0;
              arrayzonebatt[9] = 0;
              arrayzonebatt[10] = 0;
              arrayzonebatt[11] = 0;
              arrayzonebatt[12] = 0;
              arrayzonebatt[13] = 0;
              arrayzonebatt[14] = 0;
              arrayzonebatt[15] = 0;
            }
            if (colonna6 != "00") {
              switch (colonna6bin.slice(7, 8)) {
                case "1":
                  console.log("zona 17 batt");
                  arrayzonebatt[16] = 1;
                  break;
                case "0":
                  arrayzonebatt[16] = 0;
                  break;
              }
              switch (colonna6bin.slice(6, 7)) {
                case "1":
                  console.log("zona 18 batt");
                  arrayzonebatt[17] = 1;
                  break;
                case "0":
                  arrayzonebatt[17] = 0;
                  break;
              }
              switch (colonna6bin.slice(5, 6)) {
                case "1":
                  console.log("zona 19 batt");
                  arrayzonebatt[18] = 1;
                  break;
                case "0":
                  arrayzonebatt[18] = 0;
                  break;
              }
              switch (colonna6bin.slice(4, 5)) {
                case "1":
                  console.log("zona 20 batt");
                  arrayzonebatt[19] = 1;
                  break;
                case "0":
                  arrayzonebatt[19] = 0;
                  break;
              }
              switch (colonna6bin.slice(3, 4)) {
                case "1":
                  console.log("zona 21 batt");
                  arrayzonebatt[20] = 1;
                  break;
                case "0":
                  arrayzonebatt[20] = 0;
                  break;
              }
              switch (colonna6bin.slice(2, 3)) {
                case "1":
                  console.log("zona 22 batt");
                  arrayzonebatt[21] = 1;
                  break;
                case "0":
                  arrayzonebatt[21] = 0;
                  break;
              }
              switch (colonna6bin.slice(1, 2)) {
                case "1":
                  console.log("zona 23 batt");
                  arrayzonebatt[22] = 1;
                  break;
                case "0":
                  arrayzonebatt[22] = 0;
                  break;
              }
              switch (colonna6bin.slice(0, 1)) {
                case "1":
                  console.log("zona 24 batt");
                  arrayzonebatt[23] = 1;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
                case "0":
                  arrayzonebatt[23] = 0;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
              }
            } else if (colonna6 == "00") {
              arrayzonebatt[16] = 0;
              arrayzonebatt[17] = 0;
              arrayzonebatt[18] = 0;
              arrayzonebatt[19] = 0;
              arrayzonebatt[20] = 0;
              arrayzonebatt[21] = 0;
              arrayzonebatt[22] = 0;
              arrayzonebatt[23] = 0;
            }
            if (colonna7 != "00") {
              switch (colonna7bin.slice(7, 8)) {
                case "1":
                  console.log("zona 25 batt");
                  arrayzonebatt[24] = 1;
                  break;
                case "0":
                  arrayzonebatt[24] = 0;
                  break;
              }
              switch (colonna7bin.slice(6, 7)) {
                case "1":
                  console.log("zona 26 batt");
                  arrayzonebatt[25] = 1;
                  break;
                case "0":
                  arrayzonebatt[25] = 0;
                  break;
              }
              switch (colonna7bin.slice(5, 6)) {
                case "1":
                  console.log("zona 27 batt");
                  arrayzonebatt[26] = 1;
                  break;
                case "0":
                  arrayzonebatt[26] = 0;
                  break;
              }
              switch (colonna7bin.slice(4, 5)) {
                case "1":
                  console.log("zona 28 batt");
                  arrayzonebatt[27] = 1;
                  break;
                case "0":
                  arrayzonebatt[27] = 0;
                  break;
              }
              switch (colonna7bin.slice(3, 4)) {
                case "1":
                  console.log("zona 29 batt");
                  arrayzonebatt[28] = 1;
                  break;
                case "0":
                  arrayzonebatt[28] = 0;
                  break;
              }
              switch (colonna7bin.slice(2, 3)) {
                case "1":
                  console.log("zona 30 batt");
                  arrayzonebatt[29] = 1;
                  break;
                case "0":
                  arrayzonebatt[29] = 0;
                  break;
              }
              switch (colonna7bin.slice(1, 2)) {
                case "1":
                  console.log("zona 31 batt");
                  arrayzonebatt[30] = 1;
                  break;
                case "0":
                  arrayzonebatt[30] = 0;
                  break;
              }
              switch (colonna7bin.slice(0, 1)) {
                case "1":
                  console.log("zona 32 batt");
                  arrayzonebatt[31] = 1;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
                case "0":
                  arrayzonebatt[31] = 0;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
              }
            } else if (colonna7 == "00") {
              arrayzonebatt[24] = 0;
              arrayzonebatt[25] = 0;
              arrayzonebatt[26] = 0;
              arrayzonebatt[27] = 0;
              arrayzonebatt[28] = 0;
              arrayzonebatt[29] = 0;
              arrayzonebatt[30] = 0;
              arrayzonebatt[31] = 0;
            }
            if (colonna8 != "00") {
              switch (colonna8bin.slice(7, 8)) {
                case "1":
                  console.log("zona 33 batt");
                  arrayzonebatt[32] = 1;
                  break;
                case "0":
                  arrayzonebatt[32] = 0;
                  break;
              }
              switch (colonna8bin.slice(6, 7)) {
                case "1":
                  console.log("zona 34 batt");
                  arrayzonebatt[33] = 1;
                  break;
                case "0":
                  arrayzonebatt[33] = 0;
                  break;
              }
              switch (colonna8bin.slice(5, 6)) {
                case "1":
                  console.log("zona 35 batt");
                  arrayzonebatt[34] = 1;
                  break;
                case "0":
                  arrayzonebatt[34] = 0;
                  break;
              }
              switch (colonna8bin.slice(4, 5)) {
                case "1":
                  console.log("zona 36 batt");
                  arrayzonebatt[35] = 1;
                  break;
                case "0":
                  arrayzonebatt[35] = 0;
                  break;
              }
              switch (colonna8bin.slice(3, 4)) {
                case "1":
                  console.log("zona 37 batt");
                  arrayzonebatt[36] = 1;
                  break;
                case "0":
                  arrayzonebatt[36] = 0;
                  break;
              }
              switch (colonna8bin.slice(2, 3)) {
                case "1":
                  console.log("zona 38 batt");
                  arrayzonebatt[37] = 1;
                  break;
                case "0":
                  arrayzonebatt[37] = 0;
                  break;
              }
              switch (colonna8bin.slice(1, 2)) {
                case "1":
                  console.log("zona 39 batt");
                  arrayzonebatt[38] = 1;
                  break;
                case "0":
                  arrayzonebatt[38] = 0;
                  break;
              }
              switch (colonna8bin.slice(0, 1)) {
                case "1":
                  console.log("zona 40 batt");
                  arrayzonebatt[39] = 1;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
                case "0":
                  arrayzonebatt[39] = 0;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
              }
            } else if (colonna8 == "00") {
              arrayzonebatt[32] = 0;
              arrayzonebatt[33] = 0;
              arrayzonebatt[34] = 0;
              arrayzonebatt[35] = 0;
              arrayzonebatt[36] = 0;
              arrayzonebatt[37] = 0;
              arrayzonebatt[38] = 0;
              arrayzonebatt[39] = 0;
            }
            if (colonna9 != "00") {
              switch (colonna9bin.slice(7, 8)) {
                case "1":
                  console.log("zona 41 batt");
                  arrayzonebatt[40] = 1;
                  break;
                case "0":
                  arrayzonebatt[40] = 0;
                  break;
              }
              switch (colonna9bin.slice(6, 7)) {
                case "1":
                  console.log("zona 42 batt");
                  arrayzonebatt[41] = 1;
                  break;
                case "0":
                  arrayzonebatt[41] = 0;
                  break;
              }
              switch (colonna9bin.slice(5, 6)) {
                case "1":
                  console.log("zona 43 batt");
                  arrayzonebatt[42] = 1;
                  break;
                case "0":
                  arrayzonebatt[42] = 0;
                  break;
              }
              switch (colonna9bin.slice(4, 5)) {
                case "1":
                  console.log("zona 44 batt");
                  arrayzonebatt[43] = 1;
                  break;
                case "0":
                  arrayzonebatt[43] = 0;
                  break;
              }
              switch (colonna9bin.slice(3, 4)) {
                case "1":
                  console.log("zona 45 batt");
                  arrayzonebatt[44] = 1;
                  break;
                case "0":
                  arrayzonebatt[44] = 0;
                  break;
              }
              switch (colonna9bin.slice(2, 3)) {
                case "1":
                  console.log("zona 46 batt");
                  arrayzonebatt[45] = 1;
                  break;
                case "0":
                  arrayzonebatt[45] = 0;
                  break;
              }
              switch (colonna9bin.slice(1, 2)) {
                case "1":
                  console.log("zona 47 batt");
                  arrayzonebatt[46] = 1;
                  break;
                case "0":
                  arrayzonebatt[46] = 0;
                  break;
              }
              switch (colonna9bin.slice(0, 1)) {
                case "1":
                  console.log("zona 48 batt");
                  arrayzonebatt[47] = 1;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
                case "0":
                  arrayzonebatt[47] = 0;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
              }
            } else if (colonna9 == "00") {
              arrayzonebatt[40] = 0;
              arrayzonebatt[41] = 0;
              arrayzonebatt[42] = 0;
              arrayzonebatt[43] = 0;
              arrayzonebatt[44] = 0;
              arrayzonebatt[45] = 0;
              arrayzonebatt[46] = 0;
              arrayzonebatt[47] = 0;
            }
            if (colonna10 != "00") {
              switch (colonna10bin.slice(7, 8)) {
                case "1":
                  console.log("zona 49 batt");
                  arrayzonebatt[48] = 1;
                  break;
                case "0":
                  arrayzonebatt[48] = 0;
                  break;
              }
              switch (colonna10bin.slice(6, 7)) {
                case "1":
                  console.log("zona 50 batt");
                  arrayzonebatt[49] = 1;
                  break;
                case "0":
                  arrayzonebatt[49] = 0;
                  break;
              }
              switch (colonna10bin.slice(5, 6)) {
                case "1":
                  console.log("zona 51 batt");
                  arrayzonebatt[50] = 1;
                  break;
                case "0":
                  arrayzonebatt[50] = 0;
                  break;
              }
              switch (colonna10bin.slice(4, 5)) {
                case "1":
                  console.log("zona 52 batt");
                  arrayzonebatt[51] = 1;
                  break;
                case "0":
                  arrayzonebatt[51] = 0;
                  break;
              }
              switch (colonna10bin.slice(3, 4)) {
                case "1":
                  console.log("zona 53 batt");
                  arrayzonebatt[52] = 1;
                  break;
                case "0":
                  arrayzonebatt[52] = 0;
                  break;
              }
              switch (colonna10bin.slice(2, 3)) {
                case "1":
                  console.log("zona 54 batt");
                  arrayzonebatt[53] = 1;
                  break;
                case "0":
                  arrayzonebatt[53] = 0;
                  break;
              }
              switch (colonna10bin.slice(1, 2)) {
                case "1":
                  console.log("zona 55 batt");
                  arrayzonebatt[54] = 1;
                  break;
                case "0":
                  arrayzonebatt[54] = 0;
                  break;
              }
              switch (colonna10bin.slice(0, 1)) {
                case "1":
                  console.log("zona 56 batt");
                  arrayzonebatt[55] = 1;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
                case "0":
                  arrayzonebatt[55] = 0;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
              }
            } else if (colonna10 == "00") {
              arrayzonebatt[48] = 0;
              arrayzonebatt[49] = 0;
              arrayzonebatt[50] = 0;
              arrayzonebatt[51] = 0;
              arrayzonebatt[52] = 0;
              arrayzonebatt[53] = 0;
              arrayzonebatt[54] = 0;
              arrayzonebatt[55] = 0;
            }
            if (colonna11 != "00") {
              switch (colonna11bin.slice(7, 8)) {
                case "1":
                  console.log("zona 57 batt");
                  arrayzonebatt[56] = 1;
                  break;
                case "0":
                  arrayzonebatt[56] = 0;
                  break;
              }
              switch (colonna11bin.slice(6, 7)) {
                case "1":
                  console.log("zona 58 batt");
                  arrayzonebatt[57] = 1;
                  break;
                case "0":
                  arrayzonebatt[57] = 0;
                  break;
              }
              switch (colonna11bin.slice(5, 6)) {
                case "1":
                  console.log("zona 59 batt");
                  arrayzonebatt[58] = 1;
                  break;
                case "0":
                  arrayzonebatt[58] = 0;
                  break;
              }
              switch (colonna11bin.slice(4, 5)) {
                case "1":
                  console.log("zona 60 batt");
                  arrayzonebatt[59] = 1;
                  break;
                case "0":
                  arrayzonebatt[59] = 0;
                  break;
              }
              switch (colonna11bin.slice(3, 4)) {
                case "1":
                  console.log("zona 61 batt");
                  arrayzonebatt[60] = 1;
                  break;
                case "0":
                  arrayzonebatt[60] = 0;
                  break;
              }
              switch (colonna11bin.slice(2, 3)) {
                case "1":
                  console.log("zona 62 batt");
                  arrayzonebatt[61] = 1;
                  break;
                case "0":
                  arrayzonebatt[61] = 0;
                  break;
              }
              switch (colonna11bin.slice(1, 2)) {
                case "1":
                  console.log("zona 63 batt");
                  arrayzonebatt[62] = 1;
                  break;
                case "0":
                  arrayzonebatt[62] = 0;
                  break;
              }
              switch (colonna11bin.slice(0, 1)) {
                case "1":
                  console.log("zona 64 batt");
                  arrayzonebatt[63] = 1;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
                case "0":
                  arrayzonebatt[63] = 0;
                  console.log("arrayzonebatt", arrayzonebatt);
                  break;
              }
            } else if (colonna11 == "00") {
              arrayzonebatt[56] = 0;
              arrayzonebatt[57] = 0;
              arrayzonebatt[58] = 0;
              arrayzonebatt[59] = 0;
              arrayzonebatt[60] = 0;
              arrayzonebatt[61] = 0;
              arrayzonebatt[62] = 0;
              arrayzonebatt[63] = 0;
            }
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
