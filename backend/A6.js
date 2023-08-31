const portone = require("./port");
const port = portone.port;
const hexToDecimal = (hex) => parseInt(hex, 16);
const server = require("./server");
var esito = {
};
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
              var stato1 = bufferino.slice(8, 10);
              var stato2 = bufferino.slice(10, 12);
              var stato3 = bufferino.slice(12, 14);
              var stato4 = bufferino.slice(14, 16);
              var stato5 = bufferino.slice(16, 18);
              var colonna13 = bufferino.slice(24, 26);
              var colonna14 = bufferino.slice(26, 28);
              var colonna15 = bufferino.slice(28, 30);
              var colonna16 = bufferino.slice(30, 32);
              var colonna17 = bufferino.slice(32, 34);
              var colonna18 = bufferino.slice(34, 36);
              var colonna19 = bufferino.slice(36, 38);
              var colonna20 = bufferino.slice(38, 40);
              var colonna21 = bufferino.slice(40, 42);
              var colonna22 = bufferino.slice(42, 44);
              var colonna23 = bufferino.slice(44, 46);
              var colonna24 = bufferino.slice(46, 48);
              var colonna25 = bufferino.slice(48, 50);
              var colonna26 = bufferino.slice(50, 52);
              var colonna27 = bufferino.slice(52, 54);
              var colonna28 = bufferino.slice(54, 56);
              var colonna29 = bufferino.slice(56, 58);
              var colonna30 = bufferino.slice(58, 60);
              var colonna31 = bufferino.slice(60, 62);
              var colonna32 = bufferino.slice(62, 64);
              var colonna33 = bufferino.slice(64, 66);
              var colonna34 = bufferino.slice(66, 68);
              var colonna35 = bufferino.slice(68, 70);
              var colonna36 = bufferino.slice(70, 72);
              var colonna37 = bufferino.slice(72, 74);
              var colonna38 = bufferino.slice(74, 76);
              var colonna39 = bufferino.slice(76, 78);
              var colonna40 = bufferino.slice(78, 80);
              var colonna41 = bufferino.slice(80, 82);
              var colonna42 = bufferino.slice(82, 84);
              var colonna43 = bufferino.slice(84, 86);
              var colonna44 = bufferino.slice(86, 88);
              var colonna45 = bufferino.slice(88, 90);
              var colonna46 = bufferino.slice(90, 92);
              var colonna47 = bufferino.slice(92, 94);
              var colonna48 = bufferino.slice(94, 96);
              var colonna49 = bufferino.slice(96, 98);
              var colonna50 = bufferino.slice(98, 100);
              var colonna51 = bufferino.slice(100, 102);
              var colonna52 = bufferino.slice(102, 104);
              var colonna53 = bufferino.slice(104, 106);
              var colonna54 = bufferino.slice(106, 108);
              var colonna55 = bufferino.slice(108, 110);
              var colonna56 = bufferino.slice(110, 112);
              var colonna57 = bufferino.slice(112, 114);
              var colonna58 = bufferino.slice(114, 116);
              var colonna59 = bufferino.slice(116, 118);
              var colonna60 = bufferino.slice(118, 120);
              var colonna61 = bufferino.slice(120, 122);
              var colonna62 = bufferino.slice(122, 124);
              var colonna63 = bufferino.slice(124, 126);
              var colonna64 = bufferino.slice(126, 128);
              var colonna65 = bufferino.slice(128, 130);
              var colonna66 = bufferino.slice(130, 132);
              var colonna67 = bufferino.slice(132, 134);
              var colonna68 = bufferino.slice(134, 136);
              var colonna69 = bufferino.slice(136, 138);
              var colonna70 = bufferino.slice(138, 140);
              var colonna71 = bufferino.slice(140, 142);
              var colonna72 = bufferino.slice(142, 144);
              var colonna73 = bufferino.slice(144, 146);
              var colonna74 = bufferino.slice(146, 148);
              var colonna75 = bufferino.slice(148, 150);
              var colonna76 = bufferino.slice(150, 152);
              var colonna77 = bufferino.slice(152, 154);
              var colonna78 = bufferino.slice(154, 156);
              var colonna79 = bufferino.slice(156, 158);
              var colonna80 = bufferino.slice(158, 160);
              var colonna81 = bufferino.slice(160, 162);
              var colonna82 = bufferino.slice(162, 164);
              var colonna83 = bufferino.slice(164, 166);
              var colonna84 = bufferino.slice(166, 168);
              var colonna85 = bufferino.slice(168, 170);
              var colonna86 = bufferino.slice(170, 172);
              var colonna87 = bufferino.slice(172, 174);
              var colonna88 = bufferino.slice(174, 176);
              var colonna89 = bufferino.slice(176, 178);
              var colonna90 = bufferino.slice(178, 180);
              var colonna91 = bufferino.slice(180, 182);
              var colonna92 = bufferino.slice(182, 184);
              var colonna93 = bufferino.slice(184, 186);
              var colonna94 = bufferino.slice(186, 188);
              var colonna95 = bufferino.slice(188, 190);
              var colonna96 = bufferino.slice(190, 192);
              var colonna97 = bufferino.slice(192, 194);
              var stato1bin = hex2bin(stato1);
              var stato2bin = hex2bin(stato2);
              var stato3bin = hex2bin(stato3);
              var stato4bin = hex2bin(stato4);
              var stato5bin = hex2bin(stato5);
              var colonna13bin = hex2bin(colonna13);
              var colonna14bin = hex2bin(colonna14);
              //15 e 16 0001 lasciare stare presenza negativo ecc
              var colonna15bin = hex2bin(colonna15);
              var colonna16bin = hex2bin(colonna16);
              var colonna17bin = hex2bin(colonna17);
              var colonna18bin = hex2bin(colonna18);
              var colonna19bin = hex2bin(colonna19);
              var colonna20bin = hex2bin(colonna20);
              var colonna21bin = hex2bin(colonna21);
              var colonna22bin = hex2bin(colonna22);
              var colonna23bin = hex2bin(colonna23);
              var colonna24bin = hex2bin(colonna24);
              var colonna25bin = hex2bin(colonna25);
              var colonna26bin = hex2bin(colonna26);
              var colonna27bin = hex2bin(colonna27);
              var colonna28bin = hex2bin(colonna28);
              var colonna29bin = hex2bin(colonna29);
              var colonna30bin = hex2bin(colonna30);
              var colonna31bin = hex2bin(colonna31);
              var colonna32bin = hex2bin(colonna32);
              var colonna33bin = hex2bin(colonna33);
              var colonna34bin = hex2bin(colonna34);
              var colonna35bin = hex2bin(colonna35);
              var colonna36bin = hex2bin(colonna36);
              var colonna37bin = hex2bin(colonna37);
              var colonna38bin = hex2bin(colonna38);
              var colonna39bin = hex2bin(colonna39);
              var colonna40bin = hex2bin(colonna40);
              var colonna41bin = hex2bin(colonna41);
              var colonna42bin = hex2bin(colonna42);
              var colonna43bin = hex2bin(colonna43);
              var colonna44bin = hex2bin(colonna44);
              var colonna45bin = hex2bin(colonna45);
              var colonna46bin = hex2bin(colonna46);
              var colonna47bin = hex2bin(colonna47);
              var colonna48bin = hex2bin(colonna48);
              var colonna49bin = hex2bin(colonna49);
              var colonna50bin = hex2bin(colonna50);
              var colonna51bin = hex2bin(colonna51);
              var colonna52bin = hex2bin(colonna52);
              var colonna53bin = hex2bin(colonna53);
              var colonna54bin = hex2bin(colonna54);
              var colonna55bin = hex2bin(colonna55);
              var colonna56bin = hex2bin(colonna56);
              var colonna57bin = hex2bin(colonna57);
              var colonna58bin = hex2bin(colonna58);
              var colonna59bin = hex2bin(colonna59);
              var colonna60bin = hex2bin(colonna60);
              var colonna61bin = hex2bin(colonna61);
              var colonna62bin = hex2bin(colonna62);
              var colonna63bin = hex2bin(colonna63);
              var colonna64bin = hex2bin(colonna64);
              var colonna65bin = hex2bin(colonna65);
              var colonna66bin = hex2bin(colonna66);
              var colonna67bin = hex2bin(colonna67);
              var colonna68bin = hex2bin(colonna68);
              var colonna69bin = hex2bin(colonna69);
              var colonna70bin = hex2bin(colonna70);
              var colonna71bin = hex2bin(colonna71);
              var colonna72bin = hex2bin(colonna72);
              var colonna73bin = hex2bin(colonna73);
              var colonna74bin = hex2bin(colonna74);
              var colonna75bin = hex2bin(colonna75);
              var colonna76bin = hex2bin(colonna76);
              var colonna77bin = hex2bin(colonna77);
              var colonna78bin = hex2bin(colonna78);
              var colonna79bin = hex2bin(colonna79);
              var colonna80bin = hex2bin(colonna80);
              var colonna81bin = hex2bin(colonna81);
              var colonna82bin = hex2bin(colonna82);
              var colonna83bin = hex2bin(colonna83);
              var colonna84bin = hex2bin(colonna84);
              var colonna85bin = hex2bin(colonna85);
              var colonna86bin = hex2bin(colonna86);
              var colonna87bin = hex2bin(colonna87);
              var colonna88bin = hex2bin(colonna88);
              var colonna89bin = hex2bin(colonna89);
              var colonna90bin = hex2bin(colonna90);
              var colonna91bin = hex2bin(colonna91);
              var colonna92bin = hex2bin(colonna92);
              var colonna93bin = hex2bin(colonna93);
              var colonna94bin = hex2bin(colonna94);
              var colonna95bin = hex2bin(colonna95);
              var colonna96bin = hex2bin(colonna96);
              var colonna97bin = hex2bin(colonna97);
              var risultato;
              if (stato1 != "00") {
                console.log("colonna35binario", colonna35bin);
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
              }
              if (stato2 != "00") {
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
              }
              if (stato3 != "00") {
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
              }
              if (stato4 != "00") {
                switch (stato4bin) {
                  case "10000000":
                    risultato = "mancanza risposta espansione 8(temporanea)";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "mancanza risposta espansione 7(temporanea)";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "mancanza risposta espansione 6(temporanea)";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "mancanza risposta espansione 5(temporanea)";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "mancanza risposta espansione 4(temporanea)";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "mancanza risposta espansione 3(temporanea)";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "mancanza risposta espansione 2(temporanea)";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "mancanza risposta espansione 1(temporanea)";
                    console.log(risultato);
                    break;
                }
              }
              if (stato5 != "00") {
                switch (stato5bin) {
                  case "10000000":
                    risultato =
                      "mancanza risposta espansione radio 8(temporanea)";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato =
                      "mancanza risposta espansione radio 7(temporanea)";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato =
                      "mancanza risposta espansione radio 6(temporanea)";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato =
                      "mancanza risposta espansione radio 5(temporanea)";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato =
                      "mancanza risposta espansione radio 4(temporanea)";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato =
                      "mancanza risposta espansione radio 3(temporanea)";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato =
                      "mancanza risposta espansione radio 2(temporanea)";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato =
                      "mancanza risposta espansione radio 1(temporanea)";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna13 != "00") {
                switch (colonna13bin) {
                  case "10000000":
                    risultato = "uscite 8";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "uscite 7";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "uscite 6";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "uscite 5";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "uscite 4";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "uscite 3";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "uscite 2";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "uscite 1";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna14 != "00") {
                switch (colonna14bin) {
                  case "10000000":
                    risultato = "uscite 16";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "uscite 15";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "uscite 14";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "uscite 13";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "uscite 12";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "uscite 11";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "uscite 10";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "uscite 9";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna17 != "00") {
                switch (colonna17bin.slice(7, 8)) {
                  case "1":
                    console.log("area 1 aperta");
                    arrayaree[0] = 1;
                    break;
                  case "0":
                    console.log("area 1 chiusa");
                    arrayaree[0] = 0;
                    break;
                }
                switch (colonna17bin.slice(6, 7)) {
                  case "1":
                    console.log("area 2 aperta");
                    arrayaree[1] = 1;
                    break;
                  case "0":
                    console.log("area 2 chiusa");
                    arrayaree[1] = 0;
                    break;
                }
                switch (colonna17bin.slice(5, 6)) {
                  case "1":
                    console.log("area 3 aperta");
                    arrayaree[2] = 1;
                    break;
                  case "0":
                    console.log("area 3 chiusa");
                    arrayaree[2] = 0;
                    break;
                }
                switch (colonna17bin.slice(4, 5)) {
                  case "1":
                    console.log("area 4 aperta");
                    arrayaree[3] = 1;
                    console.log("arrayaree", arrayaree);
                    break;
                  case "0":
                    console.log("area 4 chiusa");
                    arrayaree[3] = 0;
                    console.log("arrayaree", arrayaree);
                    break;
                }
              }
              if (colonna18 != "00") {
                switch (colonna18bin) {
                  case "10000000":
                    risultato = "zona aperta 8";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "zona aperta 7";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "zona aperta 6";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "zona aperta 5";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "zona aperta 4";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "zona aperta 3";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "zona aperta 2";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "zona aperta 1";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna19 != "00") {
                switch (colonna19bin) {
                  case "10000000":
                    risultato = "zona aperta 16";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "zona aperta 15";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "zona aperta 14";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "zona aperta 13";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "zona aperta 12";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "zona aperta 11";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "zona aperta 10";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "zona aperta 9";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna20 != "00") {
                switch (colonna20bin) {
                  case "10000000":
                    risultato = "zona aperta 24";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "zona aperta 23";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "zona aperta 22";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "zona aperta 21";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "zona aperta 20";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "zona aperta 19";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "zona aperta 18";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "zona aperta 17";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna21 != "00") {
                switch (colonna21bin) {
                  case "10000000":
                    risultato = "zona aperta 32";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "zona aperta 31";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "zona aperta 30";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "zona aperta 29";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "zona aperta 28";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "zona aperta 27";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "zona aperta 26";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "zona aperta 25";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna22 != "00") {
                switch (colonna22bin) {
                  case "10000000":
                    risultato = "zona aperta 40";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "zona aperta 39";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "zona aperta 38";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "zona aperta 37";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "zona aperta 36";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "zona aperta 35";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "zona aperta 34";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "zona aperta 33";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna23 != "00") {
                switch (colonna23bin) {
                  case "10000000":
                    risultato = "zona aperta 48";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "zona aperta 47";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "zona aperta 46";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "zona aperta 45";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "zona aperta 44";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "zona aperta 43";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "zona aperta 42";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "zona aperta 41";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna24 != "00") {
                switch (colonna24bin) {
                  case "10000000":
                    risultato = "zona aperta 56";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "zona aperta 55";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "zona aperta 54";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "zona aperta 53";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "zona aperta 52";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "zona aperta 51";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "zona aperta 50";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "zona aperta 49";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna25 != "00") {
                switch (colonna25bin) {
                  case "10000000":
                    risultato = "zona aperta 64";
                    console.log(risultato);
                    break;
                  case "01000000":
                    risultato = "zona aperta 63";
                    console.log(risultato);
                    break;
                  case "00100000":
                    risultato = "zona aperta 62";
                    console.log(risultato);
                    break;
                  case "00010000":
                    risultato = "zona aperta 61";
                    console.log(risultato);
                    break;
                  case "00001000":
                    risultato = "zona aperta 60";
                    console.log(risultato);
                    break;
                  case "00000100":
                    risultato = "zona aperta 59";
                    console.log(risultato);
                    break;
                  case "00000010":
                    risultato = "zona aperta 58";
                    console.log(risultato);
                    break;
                  case "00000001":
                    risultato = "zona aperta 57";
                    console.log(risultato);
                    break;
                }
              }
              if (colonna26 != "00") {
                switch (colonna26bin.slice(7, 8)) {
                  case "1":
                    console.log("area 1 inserita");
                    arrayareeinserite[0] = 1;
                    break;
                  case "0":
                    console.log("area 1 disinserita");
                    arrayareeinserite[0] = 0;
                    break;
                }
                switch (colonna26bin.slice(6, 7)) {
                  case "1":
                    console.log("area 2 inserita");
                    arrayareeinserite[1] = 1;
                    break;
                  case "0":
                    console.log("area 2 disinserita");
                    arrayareeinserite[1] = 0;
                    break;
                }
                switch (colonna26bin.slice(5, 6)) {
                  case "1":
                    console.log("area 3 inserita");
                    arrayareeinserite[2] = 1;
                    break;
                  case "0":
                    console.log("area 3 disinserita");
                    arrayareeinserite[2] = 0;
                    break;
                }
                switch (colonna26bin.slice(4, 5)) {
                  case "1":
                    console.log("area 4 inserita");
                    arrayareeinserite[3] = 1;
                    console.log("arrayareeinserite", arrayareeinserite);
                    break;
                  case "0":
                    console.log("area 4 disinserita");
                    arrayareeinserite[3] = 0;
                    console.log("arrayareeinserite", arrayareeinserite);
                    break;
                }
              } else if (colonna26 == "00") {
                arrayareeinserite[0] = 0;
                arrayareeinserite[1] = 0;
                arrayareeinserite[2] = 0;
                arrayareeinserite[3] = 0;
              }
              if (colonna27 != "00") {
                switch (colonna27bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 1 inserita");
                    arrayzoneinserite[0] = 1;
                    break;
                  case "0":
                    console.log("zona 1 disinserita");
                    arrayzoneinserite[0] = 0;
                    break;
                }
                switch (colonna27bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 2 inserita");
                    arrayzoneinserite[1] = 1;
                    break;
                  case "0":
                    console.log("zona 2 disinserita");
                    arrayzoneinserite[1] = 0;
                    break;
                }
                switch (colonna27bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 3 inserita");
                    arrayzoneinserite[2] = 1;
                    break;
                  case "0":
                    console.log("zona 3 disinserita");
                    arrayzoneinserite[2] = 0;
                    break;
                }
                switch (colonna27bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 4 inserita");
                    arrayzoneinserite[3] = 1;
                    break;
                  case "0":
                    console.log("zona 4 inserita");
                    arrayzoneinserite[3] = 0;
                    break;
                }
                switch (colonna27bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 5 inserita");
                    arrayzoneinserite[4] = 1;
                    break;
                  case "0":
                    console.log("zona 5 disinserita");
                    arrayzoneinserite[4] = 0;
                    break;
                }
                switch (colonna27bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 6 inserita");
                    arrayzoneinserite[5] = 1;
                    break;
                  case "0":
                    console.log("zona 6 disinserita");
                    arrayzoneinserite[5] = 0;
                    break;
                }
                switch (colonna27bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 7 inserita");
                    arrayzoneinserite[6] = 1;
                    break;
                  case "0":
                    console.log("zona 7 disinserita");
                    arrayzoneinserite[6] = 0;
                    break;
                }
                switch (colonna27bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 8 inserita");
                    arrayzoneinserite[7] = 1;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                  case "0":
                    console.log("zona 8 disinserita");
                    arrayzoneinserite[7] = 0;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                }
              } else if (colonna27 == "00") {
                arrayzoneinserite[0] = 0;
                arrayzoneinserite[1] = 0;
                arrayzoneinserite[2] = 0;
                arrayzoneinserite[3] = 0;
                arrayzoneinserite[4] = 0;
                arrayzoneinserite[5] = 0;
                arrayzoneinserite[6] = 0;
                arrayzoneinserite[7] = 0;
              }
              if (colonna28 != "00") {
                switch (colonna28bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 9 inserita");
                    arrayzoneinserite[8] = 1;
                    break;
                  case "0":
                    console.log("zona 9 disinserita");
                    arrayzoneinserite[8] = 0;
                    break;
                }
                switch (colonna28bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 10 inserita");
                    arrayzoneinserite[9] = 1;
                    break;
                  case "0":
                    console.log("zona 10 disinserita");
                    arrayzoneinserite[9] = 0;
                    break;
                }
                switch (colonna28bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 11 inserita");
                    arrayzoneinserite[10] = 1;
                    break;
                  case "0":
                    console.log("zona 11 disinserita");
                    arrayzoneinserite[10] = 0;
                    break;
                }
                switch (colonna28bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 12 inserita");
                    arrayzoneinserite[11] = 1;
                    break;
                  case "0":
                    console.log("zona 12 inserita");
                    arrayzoneinserite[11] = 0;
                    break;
                }
                switch (colonna28bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 13 inserita");
                    arrayzoneinserite[12] = 1;
                    break;
                  case "0":
                    console.log("zona 13 disinserita");
                    arrayzoneinserite[12] = 0;
                    break;
                }
                switch (colonna28bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 14 inserita");
                    arrayzoneinserite[13] = 1;
                    break;
                  case "0":
                    console.log("zona 14 disinserita");
                    arrayzoneinserite[13] = 0;
                    break;
                }
                switch (colonna28bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 15 inserita");
                    arrayzoneinserite[14] = 1;
                    break;
                  case "0":
                    console.log("zona 15 disinserita");
                    arrayzoneinserite[14] = 0;
                    break;
                }
                switch (colonna28bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 16 inserita");
                    arrayzoneinserite[15] = 1;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                  case "0":
                    console.log("zona 16 disinserita");
                    arrayzoneinserite[15] = 0;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                }
              } else if (colonna28 == "00") {
                arrayzoneinserite[8] = 0;
                arrayzoneinserite[9] = 0;
                arrayzoneinserite[10] = 0;
                arrayzoneinserite[11] = 0;
                arrayzoneinserite[12] = 0;
                arrayzoneinserite[13] = 0;
                arrayzoneinserite[14] = 0;
                arrayzoneinserite[15] = 0;
              }
              if (colonna29 != "00") {
                switch (colonna29bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 17 inserita");
                    arrayzoneinserite[16] = 1;
                    break;
                  case "0":
                    console.log("zona 17 disinserita");
                    arrayzoneinserite[16] = 0;
                    break;
                }
                switch (colonna29bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 18 inserita");
                    arrayzoneinserite[17] = 1;
                    break;
                  case "0":
                    console.log("zona 18 disinserita");
                    arrayzoneinserite[17] = 0;
                    break;
                }
                switch (colonna29bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 19 inserita");
                    arrayzoneinserite[18] = 1;
                    break;
                  case "0":
                    console.log("zona 19 disinserita");
                    arrayzoneinserite[18] = 0;
                    break;
                }
                switch (colonna29bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 20 inserita");
                    arrayzoneinserite[19] = 1;
                    break;
                  case "0":
                    console.log("zona 20 inserita");
                    arrayzoneinserite[19] = 0;
                    break;
                }
                switch (colonna29bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 21 inserita");
                    arrayzoneinserite[20] = 1;
                    break;
                  case "0":
                    console.log("zona 21 disinserita");
                    arrayzoneinserite[20] = 0;
                    break;
                }
                switch (colonna29bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 22 inserita");
                    arrayzoneinserite[21] = 1;
                    break;
                  case "0":
                    console.log("zona 22 disinserita");
                    arrayzoneinserite[21] = 0;
                    break;
                }
                switch (colonna29bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 23 inserita");
                    arrayzoneinserite[22] = 1;
                    break;
                  case "0":
                    console.log("zona 23 disinserita");
                    arrayzoneinserite[22] = 0;
                    break;
                }
                switch (colonna29bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 24 inserita");
                    arrayzoneinserite[23] = 1;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                  case "0":
                    console.log("zona 24 disinserita");
                    arrayzoneinserite[23] = 0;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                }
              } else if (colonna29 == "00") {
                arrayzoneinserite[16] = 0;
                arrayzoneinserite[17] = 0;
                arrayzoneinserite[18] = 0;
                arrayzoneinserite[19] = 0;
                arrayzoneinserite[20] = 0;
                arrayzoneinserite[21] = 0;
                arrayzoneinserite[22] = 0;
                arrayzoneinserite[23] = 0;
              }
              if (colonna30 != "00") {
                switch (colonna30bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 25 inserita");
                    arrayzoneinserite[24] = 1;
                    break;
                  case "0":
                    console.log("zona 25 disinserita");
                    arrayzoneinserite[24] = 0;
                    break;
                }
                switch (colonna30bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 26 inserita");
                    arrayzoneinserite[25] = 1;
                    break;
                  case "0":
                    console.log("zona 26 disinserita");
                    arrayzoneinserite[25] = 0;
                    break;
                }
                switch (colonna30bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 27 inserita");
                    arrayzoneinserite[26] = 1;
                    break;
                  case "0":
                    console.log("zona 27 disinserita");
                    arrayzoneinserite[26] = 0;
                    break;
                }
                switch (colonna30bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 28 inserita");
                    arrayzoneinserite[27] = 1;
                    break;
                  case "0":
                    console.log("zona 28 inserita");
                    arrayzoneinserite[27] = 0;
                    break;
                }
                switch (colonna30bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 29 inserita");
                    arrayzoneinserite[28] = 1;
                    break;
                  case "0":
                    console.log("zona 29 disinserita");
                    arrayzoneinserite[28] = 0;
                    break;
                }
                switch (colonna30bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 30 inserita");
                    arrayzoneinserite[29] = 1;
                    break;
                  case "0":
                    console.log("zona 30 disinserita");
                    arrayzoneinserite[29] = 0;
                    break;
                }
                switch (colonna30bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 31 inserita");
                    arrayzoneinserite[30] = 1;
                    break;
                  case "0":
                    console.log("zona 31 disinserita");
                    arrayzoneinserite[30] = 0;
                    break;
                }
                switch (colonna30bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 32 inserita");
                    arrayzoneinserite[31] = 1;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                  case "0":
                    console.log("zona 32 disinserita");
                    arrayzoneinserite[31] = 0;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                }
              } else if (colonna30 == "00") {
                arrayzoneinserite[24] = 0;
                arrayzoneinserite[25] = 0;
                arrayzoneinserite[26] = 0;
                arrayzoneinserite[27] = 0;
                arrayzoneinserite[28] = 0;
                arrayzoneinserite[29] = 0;
                arrayzoneinserite[30] = 0;
                arrayzoneinserite[31] = 0;
              }
              if (colonna31 != "00") {
                switch (colonna31bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 33 inserita");
                    arrayzoneinserite[32] = 1;
                    break;
                  case "0":
                    console.log("zona 33 disinserita");
                    arrayzoneinserite[32] = 0;
                    break;
                }
                switch (colonna31bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 34 inserita");
                    arrayzoneinserite[33] = 1;
                    break;
                  case "0":
                    console.log("zona 34 disinserita");
                    arrayzoneinserite[33] = 0;
                    break;
                }
                switch (colonna31bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 35 inserita");
                    arrayzoneinserite[34] = 1;
                    break;
                  case "0":
                    console.log("zona 35 disinserita");
                    arrayzoneinserite[34] = 0;
                    break;
                }
                switch (colonna31bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 36 inserita");
                    arrayzoneinserite[35] = 1;
                    break;
                  case "0":
                    console.log("zona 36 inserita");
                    arrayzoneinserite[35] = 0;
                    break;
                }
                switch (colonna31bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 37 inserita");
                    arrayzoneinserite[36] = 1;
                    break;
                  case "0":
                    console.log("zona 37 disinserita");
                    arrayzoneinserite[36] = 0;
                    break;
                }
                switch (colonna31bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 38 inserita");
                    arrayzoneinserite[37] = 1;
                    break;
                  case "0":
                    console.log("zona 38 disinserita");
                    arrayzoneinserite[37] = 0;
                    break;
                }
                switch (colonna31bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 39 inserita");
                    arrayzoneinserite[38] = 1;
                    break;
                  case "0":
                    console.log("zona 39 disinserita");
                    arrayzoneinserite[38] = 0;
                    break;
                }
                switch (colonna31bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 40 inserita");
                    arrayzoneinserite[39] = 1;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                  case "0":
                    console.log("zona 40 disinserita");
                    arrayzoneinserite[39] = 0;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                }
              } else if (colonna31 == "00") {
                arrayzoneinserite[32] = 0;
                arrayzoneinserite[33] = 0;
                arrayzoneinserite[34] = 0;
                arrayzoneinserite[35] = 0;
                arrayzoneinserite[36] = 0;
                arrayzoneinserite[37] = 0;
                arrayzoneinserite[38] = 0;
                arrayzoneinserite[39] = 0;
              }
              if (colonna32 != "00") {
                switch (colonna32bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 41 inserita");
                    arrayzoneinserite[40] = 1;
                    break;
                  case "0":
                    console.log("zona 41 disinserita");
                    arrayzoneinserite[40] = 0;
                    break;
                }
                switch (colonna32bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 42 inserita");
                    arrayzoneinserite[41] = 1;
                    break;
                  case "0":
                    console.log("zona 42 disinserita");
                    arrayzoneinserite[41] = 0;
                    break;
                }
                switch (colonna32bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 43 inserita");
                    arrayzoneinserite[42] = 1;
                    break;
                  case "0":
                    console.log("zona 43 disinserita");
                    arrayzoneinserite[42] = 0;
                    break;
                }
                switch (colonna32bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 44 inserita");
                    arrayzoneinserite[43] = 1;
                    break;
                  case "0":
                    console.log("zona 44 inserita");
                    arrayzoneinserite[43] = 0;
                    break;
                }
                switch (colonna32bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 45 inserita");
                    arrayzoneinserite[44] = 1;
                    break;
                  case "0":
                    console.log("zona 45 disinserita");
                    arrayzoneinserite[44] = 0;
                    break;
                }
                switch (colonna32bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 46 inserita");
                    arrayzoneinserite[45] = 1;
                    break;
                  case "0":
                    console.log("zona 46 disinserita");
                    arrayzoneinserite[45] = 0;
                    break;
                }
                switch (colonna32bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 47 inserita");
                    arrayzoneinserite[46] = 1;
                    break;
                  case "0":
                    console.log("zona 47 disinserita");
                    arrayzoneinserite[46] = 0;
                    break;
                }
                switch (colonna32bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 48 inserita");
                    arrayzoneinserite[47] = 1;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                  case "0":
                    console.log("zona 48 disinserita");
                    arrayzoneinserite[47] = 0;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                }
              } else if (colonna32 == "00") {
                arrayzoneinserite[40] = 0;
                arrayzoneinserite[41] = 0;
                arrayzoneinserite[42] = 0;
                arrayzoneinserite[43] = 0;
                arrayzoneinserite[44] = 0;
                arrayzoneinserite[45] = 0;
                arrayzoneinserite[46] = 0;
                arrayzoneinserite[47] = 0;
              }
              if (colonna33 != "00") {
                switch (colonna33bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 49 inserita");
                    arrayzoneinserite[48] = 1;
                    break;
                  case "0":
                    console.log("zona 49 disinserita");
                    arrayzoneinserite[48] = 0;
                    break;
                }
                switch (colonna33bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 50 inserita");
                    arrayzoneinserite[49] = 1;
                    break;
                  case "0":
                    console.log("zona 50 disinserita");
                    arrayzoneinserite[49] = 0;
                    break;
                }
                switch (colonna33bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 51 inserita");
                    arrayzoneinserite[50] = 1;
                    break;
                  case "0":
                    console.log("zona 51 disinserita");
                    arrayzoneinserite[50] = 0;
                    break;
                }
                switch (colonna33bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 52 inserita");
                    arrayzoneinserite[51] = 1;
                    break;
                  case "0":
                    console.log("zona 52 inserita");
                    arrayzoneinserite[51] = 0;
                    break;
                }
                switch (colonna33bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 53 inserita");
                    arrayzoneinserite[52] = 1;
                    break;
                  case "0":
                    console.log("zona 53 disinserita");
                    arrayzoneinserite[52] = 0;
                    break;
                }
                switch (colonna33bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 54 inserita");
                    arrayzoneinserite[53] = 1;
                    break;
                  case "0":
                    console.log("zona 54 disinserita");
                    arrayzoneinserite[53] = 0;
                    break;
                }
                switch (colonna33bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 55 inserita");
                    arrayzoneinserite[54] = 1;
                    break;
                  case "0":
                    console.log("zona 55 disinserita");
                    arrayzoneinserite[54] = 0;
                    break;
                }
                switch (colonna33bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 56 inserita");
                    arrayzoneinserite[55] = 1;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                  case "0":
                    console.log("zona 56 disinserita");
                    arrayzoneinserite[55] = 0;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                }
              } else if (colonna33 == "00") {
                arrayzoneinserite[48] = 0;
                arrayzoneinserite[49] = 0;
                arrayzoneinserite[50] = 0;
                arrayzoneinserite[51] = 0;
                arrayzoneinserite[52] = 0;
                arrayzoneinserite[53] = 0;
                arrayzoneinserite[54] = 0;
                arrayzoneinserite[55] = 0;
              }
              if (colonna34 != "00") {
                switch (colonna34bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 57 inserita");
                    arrayzoneinserite[56] = 1;
                    break;
                  case "0":
                    console.log("zona 57 disinserita");
                    arrayzoneinserite[56] = 0;
                    break;
                }
                switch (colonna34bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 58 inserita");
                    arrayzoneinserite[57] = 1;
                    break;
                  case "0":
                    console.log("zona 58 disinserita");
                    arrayzoneinserite[57] = 0;
                    break;
                }
                switch (colonna34bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 59 inserita");
                    arrayzoneinserite[58] = 1;
                    break;
                  case "0":
                    console.log("zona 59 disinserita");
                    arrayzoneinserite[58] = 0;
                    break;
                }
                switch (colonna34bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 60 inserita");
                    arrayzoneinserite[59] = 1;
                    break;
                  case "0":
                    console.log("zona 60 inserita");
                    arrayzoneinserite[59] = 0;
                    break;
                }
                switch (colonna34bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 61 inserita");
                    arrayzoneinserite[60] = 1;
                    break;
                  case "0":
                    console.log("zona 61 disinserita");
                    arrayzoneinserite[60] = 0;
                    break;
                }
                switch (colonna34bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 62 inserita");
                    arrayzoneinserite[61] = 1;
                    break;
                  case "0":
                    console.log("zona 62 disinserita");
                    arrayzoneinserite[61] = 0;
                    break;
                }
                switch (colonna34bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 63 inserita");
                    arrayzoneinserite[62] = 1;
                    break;
                  case "0":
                    console.log("zona 63 disinserita");
                    arrayzoneinserite[62] = 0;
                    break;
                }
                switch (colonna34bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 64 inserita");
                    arrayzoneinserite[63] = 1;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                  case "0":
                    console.log("zona 64 disinserita");
                    arrayzoneinserite[63] = 0;
                    console.log("arrayzoneinserite", arrayzoneinserite);
                    break;
                }
              } else if (colonna34 == "00") {
                arrayzoneinserite[56] = 0;
                arrayzoneinserite[57] = 0;
                arrayzoneinserite[58] = 0;
                arrayzoneinserite[59] = 0;
                arrayzoneinserite[60] = 0;
                arrayzoneinserite[61] = 0;
                arrayzoneinserite[62] = 0;
                arrayzoneinserite[63] = 0;
              }
              if (colonna35 != "00") {
                switch (colonna35bin.slice(7, 8)) {
                  case "1":
                    console.log("area 1 in allarme");
                    arrayareeinallarme[0] = 1;
                    break;
                  case "0":
                    arrayareeinallarme[0] = 0;
                    break;
                }
                switch (colonna35bin.slice(6, 7)) {
                  case "1":
                    console.log("area 2 in allarme");
                    arrayareeinallarme[1] = 1;
                    break;
                  case "0":
                    arrayareeinallarme[1] = 0;
                    break;
                }
                switch (colonna35bin.slice(5, 6)) {
                  case "1":
                    console.log("area 3 in allarme");
                    arrayareeinallarme[2] = 1;
                    break;
                  case "0":
                    arrayareeinallarme[2] = 0;
                    break;
                }
                switch (colonna35bin.slice(4, 5)) {
                  case "1":
                    console.log("area 4 inserita");
                    arrayareeinallarme[3] = 1;
                    console.log("arrayareeinallarme", arrayareeinallarme);
                    break;
                  case "0":
                    arrayareeinallarme[3] = 0;
                    console.log("arrayareeiallarme", arrayareeinallarme);
                    break;
                }
              } else if (colonna35 == "00") {
                arrayareeinallarme[0] = 0;
                arrayareeinallarme[1] = 0;
                arrayareeinallarme[2] = 0;
                arrayareeinallarme[3] = 0;
              }
              if (colonna36 != "00") {
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
              }
              if (colonna37 != "00") {
                switch (colonna37bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 1 in allarme");
                    arrayzoneinallarme[0] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[0] = 0;
                    break;
                }
                switch (colonna37bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 2 in allarme");
                    arrayzoneinallarme[1] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[1] = 0;
                    break;
                }
                switch (colonna37bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 3 in allarme");
                    arrayzoneinallarme[2] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[2] = 0;
                    break;
                }
                switch (colonna37bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 4 in allarme");
                    arrayzoneinallarme[3] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[3] = 0;
                    break;
                }
                switch (colonna37bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 5 in allarme");
                    arrayzoneinallarme[4] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[4] = 0;
                    break;
                }
                switch (colonna37bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 6 in allarme");
                    arrayzoneinallarme[5] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[5] = 0;
                    break;
                }
                switch (colonna37bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 7 in allarme");
                    arrayzoneinallarme[6] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[6] = 0;
                    break;
                }
                switch (colonna37bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 8 in allarme");
                    arrayzoneinallarme[7] = 1;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                  case "0":
                    arrayzoneinallarme[7] = 0;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                }
              } else if (colonna37 == "00") {
                arrayzoneinallarme[0] = 0;
                arrayzoneinallarme[1] = 0;
                arrayzoneinallarme[2] = 0;
                arrayzoneinallarme[3] = 0;
                arrayzoneinallarme[4] = 0;
                arrayzoneinallarme[5] = 0;
                arrayzoneinallarme[6] = 0;
                arrayzoneinallarme[7] = 0;
              }
              if (colonna38 != "00") {
                switch (colonna38bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 9 in allarme");
                    arrayzoneinallarme[8] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[8] = 0;
                    break;
                }
                switch (colonna38bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 10 in allarme");
                    arrayzoneinallarme[9] = 1;
                    break;
                  case "0":
                    console.log("zona 10 in allarme");
                    arrayzoneinallarme[9] = 0;
                    break;
                }
                switch (colonna38bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 11 in allarme");
                    arrayzoneinallarme[10] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[10] = 0;
                    break;
                }
                switch (colonna38bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 12 in allarme");
                    arrayzoneinallarme[11] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[11] = 0;
                    break;
                }
                switch (colonna38bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 13 in allarme");
                    arrayzoneinallarme[12] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[12] = 0;
                    break;
                }
                switch (colonna38bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 14 in allarme");
                    arrayzoneinallarme[13] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[13] = 0;
                    break;
                }
                switch (colonna38bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 15 in allarme");
                    arrayzoneinallarme[14] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[14] = 0;
                    break;
                }
                switch (colonna38bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 16 in allarme");
                    arrayzoneinallarme[15] = 1;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                  case "0":
                    arrayzoneinallarme[15] = 0;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                }
              } else if (colonna38 == "00") {
                arrayzoneinallarme[8] = 0;
                arrayzoneinallarme[9] = 0;
                arrayzoneinallarme[10] = 0;
                arrayzoneinallarme[11] = 0;
                arrayzoneinallarme[12] = 0;
                arrayzoneinallarme[13] = 0;
                arrayzoneinallarme[14] = 0;
                arrayzoneinallarme[15] = 0;
              }
              if (colonna39 != "00") {
                switch (colonna39bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 17 in allarme");
                    arrayzoneinallarme[16] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[16] = 0;
                    break;
                }
                switch (colonna39bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 18 in allarme");
                    arrayzoneinallarme[17] = 1;
                    break;
                  case "0":
                    console.log("zona 18 in allarme");
                    arrayzoneinallarme[17] = 0;
                    break;
                }
                switch (colonna39bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 19 in allarme");
                    arrayzoneinallarme[18] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[18] = 0;
                    break;
                }
                switch (colonna39bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 20 in allarme");
                    arrayzoneinallarme[19] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[19] = 0;
                    break;
                }
                switch (colonna39bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 21 in allarme");
                    arrayzoneinallarme[20] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[20] = 0;
                    break;
                }
                switch (colonna39bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 22 in allarme");
                    arrayzoneinallarme[21] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[21] = 0;
                    break;
                }
                switch (colonna39bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 23 in allarme");
                    arrayzoneinallarme[22] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[22] = 0;
                    break;
                }
                switch (colonna39bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 24 in allarme");
                    arrayzoneinallarme[23] = 1;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                  case "0":
                    arrayzoneinallarme[23] = 0;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                }
              } else if (colonna39 == "00") {
                arrayzoneinallarme[16] = 0;
                arrayzoneinallarme[17] = 0;
                arrayzoneinallarme[18] = 0;
                arrayzoneinallarme[19] = 0;
                arrayzoneinallarme[20] = 0;
                arrayzoneinallarme[21] = 0;
                arrayzoneinallarme[22] = 0;
                arrayzoneinallarme[23] = 0;
              }
              if (colonna40 != "00") {
                switch (colonna40bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 25 in allarme");
                    arrayzoneinallarme[24] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[24] = 0;
                    break;
                }
                switch (colonna40bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 26 in allarme");
                    arrayzoneinallarme[25] = 1;
                    break;
                  case "0":
                    console.log("zona 26 in allarme");
                    arrayzoneinallarme[25] = 0;
                    break;
                }
                switch (colonna40bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 27 in allarme");
                    arrayzoneinallarme[26] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[26] = 0;
                    break;
                }
                switch (colonna40bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 28 in allarme");
                    arrayzoneinallarme[27] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[27] = 0;
                    break;
                }
                switch (colonna40bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 29 in allarme");
                    arrayzoneinallarme[28] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[28] = 0;
                    break;
                }
                switch (colonna40bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 30 in allarme");
                    arrayzoneinallarme[29] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[29] = 0;
                    break;
                }
                switch (colonna40bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 31 in allarme");
                    arrayzoneinallarme[30] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[30] = 0;
                    break;
                }
                switch (colonna40bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 32 in allarme");
                    arrayzoneinallarme[31] = 1;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                  case "0":
                    arrayzoneinallarme[31] = 0;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                }
              } else if (colonna40 == "00") {
                arrayzoneinallarme[24] = 0;
                arrayzoneinallarme[25] = 0;
                arrayzoneinallarme[26] = 0;
                arrayzoneinallarme[27] = 0;
                arrayzoneinallarme[28] = 0;
                arrayzoneinallarme[29] = 0;
                arrayzoneinallarme[30] = 0;
                arrayzoneinallarme[31] = 0;
              }
              if (colonna41 != "00") {
                switch (colonna41bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 33 in allarme");
                    arrayzoneinallarme[32] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[32] = 0;
                    break;
                }
                switch (colonna41bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 34 in allarme");
                    arrayzoneinallarme[33] = 1;
                    break;
                  case "0":
                    console.log("zona 34 in allarme");
                    arrayzoneinallarme[33] = 0;
                    break;
                }
                switch (colonna41bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 35 in allarme");
                    arrayzoneinallarme[34] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[34] = 0;
                    break;
                }
                switch (colonna41bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 36 in allarme");
                    arrayzoneinallarme[35] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[35] = 0;
                    break;
                }
                switch (colonna41bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 37 in allarme");
                    arrayzoneinallarme[36] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[36] = 0;
                    break;
                }
                switch (colonna41bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 38 in allarme");
                    arrayzoneinallarme[37] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[37] = 0;
                    break;
                }
                switch (colonna41bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 39 in allarme");
                    arrayzoneinallarme[38] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[38] = 0;
                    break;
                }
                switch (colonna41bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 40 in allarme");
                    arrayzoneinallarme[39] = 1;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                  case "0":
                    arrayzoneinallarme[39] = 0;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                }
              } else if (colonna41 == "00") {
                arrayzoneinallarme[32] = 0;
                arrayzoneinallarme[33] = 0;
                arrayzoneinallarme[34] = 0;
                arrayzoneinallarme[35] = 0;
                arrayzoneinallarme[36] = 0;
                arrayzoneinallarme[37] = 0;
                arrayzoneinallarme[38] = 0;
                arrayzoneinallarme[39] = 0;
              }
              if (colonna42 != "00") {
                switch (colonna42bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 41 in allarme");
                    arrayzoneinallarme[40] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[40] = 0;
                    break;
                }
                switch (colonna42bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 42 in allarme");
                    arrayzoneinallarme[41] = 1;
                    break;
                  case "0":
                    console.log("zona 42 in allarme");
                    arrayzoneinallarme[41] = 0;
                    break;
                }
                switch (colonna42bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 43 in allarme");
                    arrayzoneinallarme[42] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[42] = 0;
                    break;
                }
                switch (colonna42bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 44 in allarme");
                    arrayzoneinallarme[43] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[43] = 0;
                    break;
                }
                switch (colonna42bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 45 in allarme");
                    arrayzoneinallarme[44] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[44] = 0;
                    break;
                }
                switch (colonna42bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 46 in allarme");
                    arrayzoneinallarme[45] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[45] = 0;
                    break;
                }
                switch (colonna42bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 47 in allarme");
                    arrayzoneinallarme[46] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[46] = 0;
                    break;
                }
                switch (colonna42bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 48 in allarme");
                    arrayzoneinallarme[47] = 1;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                  case "0":
                    arrayzoneinallarme[47] = 0;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                }
              } else if (colonna42 == "00") {
                arrayzoneinallarme[40] = 0;
                arrayzoneinallarme[41] = 0;
                arrayzoneinallarme[42] = 0;
                arrayzoneinallarme[43] = 0;
                arrayzoneinallarme[44] = 0;
                arrayzoneinallarme[45] = 0;
                arrayzoneinallarme[46] = 0;
                arrayzoneinallarme[47] = 0;
              }
              if (colonna43 != "00") {
                switch (colonna43bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 49 in allarme");
                    arrayzoneinallarme[48] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[48] = 0;
                    break;
                }
                switch (colonna43bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 50 in allarme");
                    arrayzoneinallarme[49] = 1;
                    break;
                  case "0":
                    console.log("zona 50 in allarme");
                    arrayzoneinallarme[49] = 0;
                    break;
                }
                switch (colonna43bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 51 in allarme");
                    arrayzoneinallarme[50] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[50] = 0;
                    break;
                }
                switch (colonna43bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 52 in allarme");
                    arrayzoneinallarme[51] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[51] = 0;
                    break;
                }
                switch (colonna43bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 53 in allarme");
                    arrayzoneinallarme[52] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[52] = 0;
                    break;
                }
                switch (colonna43bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 54 in allarme");
                    arrayzoneinallarme[53] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[53] = 0;
                    break;
                }
                switch (colonna43bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 55 in allarme");
                    arrayzoneinallarme[54] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[54] = 0;
                    break;
                }
                switch (colonna43bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 56 in allarme");
                    arrayzoneinallarme[55] = 1;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                  case "0":
                    arrayzoneinallarme[55] = 0;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                }
              } else if (colonna43 == "00") {
                arrayzoneinallarme[48] = 0;
                arrayzoneinallarme[49] = 0;
                arrayzoneinallarme[50] = 0;
                arrayzoneinallarme[51] = 0;
                arrayzoneinallarme[52] = 0;
                arrayzoneinallarme[53] = 0;
                arrayzoneinallarme[54] = 0;
                arrayzoneinallarme[55] = 0;
              }
              if (colonna44 != "00") {
                switch (colonna44bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 57 in allarme");
                    arrayzoneinallarme[56] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[56] = 0;
                    break;
                }
                switch (colonna44bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 58 in allarme");
                    arrayzoneinallarme[57] = 1;
                    break;
                  case "0":
                    console.log("zona 58 in allarme");
                    arrayzoneinallarme[57] = 0;
                    break;
                }
                switch (colonna44bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 59 in allarme");
                    arrayzoneinallarme[58] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[58] = 0;
                    break;
                }
                switch (colonna44bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 60 in allarme");
                    arrayzoneinallarme[59] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[59] = 0;
                    break;
                }
                switch (colonna44bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 61 in allarme");
                    arrayzoneinallarme[60] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[60] = 0;
                    break;
                }
                switch (colonna44bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 62 in allarme");
                    arrayzoneinallarme[61] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[61] = 0;
                    break;
                }
                switch (colonna44bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 63 in allarme");
                    arrayzoneinallarme[62] = 1;
                    break;
                  case "0":
                    arrayzoneinallarme[62] = 0;
                    break;
                }
                switch (colonna44bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 64 in allarme");
                    arrayzoneinallarme[63] = 1;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                  case "0":
                    arrayzoneinallarme[63] = 0;
                    console.log("arrayzoneinallarme", arrayzoneinallarme);
                    break;
                }
              } else if (colonna44 == "00") {
                arrayzoneinallarme[56] = 0;
                arrayzoneinallarme[57] = 0;
                arrayzoneinallarme[58] = 0;
                arrayzoneinallarme[59] = 0;
                arrayzoneinallarme[60] = 0;
                arrayzoneinallarme[61] = 0;
                arrayzoneinallarme[62] = 0;
                arrayzoneinallarme[63] = 0;
              }
              if (colonna45 != "00") {
                switch (colonna45bin.slice(7, 8)) {
                  case "1":
                    console.log("area 1 in allarme");
                    arrayareeinmemoriaallarme[0] = 1;
                    break;
                  case "0":
                    arrayareeinmemoriaallarme[0] = 0;
                    break;
                }
                switch (colonna45bin.slice(6, 7)) {
                  case "1":
                    console.log("area 2 in allarme");
                    arrayareeinmemoriaallarme[1] = 1;
                    break;
                  case "0":
                    arrayareeinmemoriaallarme[1] = 0;
                    break;
                }
                switch (colonna45bin.slice(5, 6)) {
                  case "1":
                    console.log("area 3 in allarme");
                    arrayareeinmemoriaallarme[2] = 1;
                    break;
                  case "0":
                    arrayareeinmemoriaallarme[2] = 0;
                    break;
                }
                switch (colonna45bin.slice(4, 5)) {
                  case "1":
                    console.log("area 4 inserita");
                    arrayareeinmemoriaallarme[3] = 1;
                    console.log(
                      "arrayareeinmemoriaallarme",
                      arrayareeinmemoriaallarme
                    );
                    break;
                  case "0":
                    arrayareeinmemoriaallarme[3] = 0;
                    console.log(
                      "arrayareeinmemoriaallarme",
                      arrayareeinmemoriaallarme
                    );
                    break;
                }
              } else if (colonna45 == "00") {
                arrayareeinmemoriaallarme[0] = 0;
                arrayareeinmemoriaallarme[1] = 0;
                arrayareeinmemoriaallarme[2] = 0;
                arrayareeinmemoriaallarme[3] = 0;
              }
              if (colonna46 != "00") {
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
              }
              if (colonna47 != "00") {
                switch (colonna47bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 1 in memoria");
                    arrayzoneinmemoria[0] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[0] = 0;
                    break;
                }
                switch (colonna47bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 2 in memoria");
                    arrayzoneinmemoria[1] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[1] = 0;
                    break;
                }
                switch (colonna47bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 3 in memoria");
                    arrayzoneinmemoria[2] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[2] = 0;
                    break;
                }
                switch (colonna47bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 4 in memoria");
                    arrayzoneinmemoria[3] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[3] = 0;
                    break;
                }
                switch (colonna47bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 5 in memoria");
                    arrayzoneinmemoria[4] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[4] = 0;
                    break;
                }
                switch (colonna47bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 6 in memoria");
                    arrayzoneinmemoria[5] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[5] = 0;
                    break;
                }
                switch (colonna47bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 7 in memoria");
                    arrayzoneinmemoria[6] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[6] = 0;
                    break;
                }
                switch (colonna47bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 8 in memoria");
                    arrayzoneinmemoria[7] = 1;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                  case "0":
                    arrayzoneinmemoria[7] = 0;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                }
              } else if (colonna47 == "00") {
                arrayzoneinmemoria[0] = 0;
                arrayzoneinmemoria[1] = 0;
                arrayzoneinmemoria[2] = 0;
                arrayzoneinmemoria[3] = 0;
                arrayzoneinmemoria[4] = 0;
                arrayzoneinmemoria[5] = 0;
                arrayzoneinmemoria[6] = 0;
                arrayzoneinmemoria[7] = 0;
              }
              if (colonna48 != "00") {
                switch (colonna48bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 9 in memoria");
                    arrayzoneinmemoria[8] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[8] = 0;
                    break;
                }
                switch (colonna48bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 10 in memoria");
                    arrayzoneinmemoria[9] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[9] = 0;
                    break;
                }
                switch (colonna48bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 11 in memoria");
                    arrayzoneinmemoria[10] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[10] = 0;
                    break;
                }
                switch (colonna48bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 12 in memoria");
                    arrayzoneinmemoria[11] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[11] = 0;
                    break;
                }
                switch (colonna48bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 13 in memoria");
                    arrayzoneinmemoria[12] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[12] = 0;
                    break;
                }
                switch (colonna48bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 14 in memoria");
                    arrayzoneinmemoria[13] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[13] = 0;
                    break;
                }
                switch (colonna48bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 15 in memoria");
                    arrayzoneinmemoria[14] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[14] = 0;
                    break;
                }
                switch (colonna48bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 16 in memoria");
                    arrayzoneinmemoria[15] = 1;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                  case "0":
                    arrayzoneinmemoria[15] = 0;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                }
              } else if (colonna48 == "00") {
                arrayzoneinmemoria[8] = 0;
                arrayzoneinmemoria[9] = 0;
                arrayzoneinmemoria[10] = 0;
                arrayzoneinmemoria[11] = 0;
                arrayzoneinmemoria[12] = 0;
                arrayzoneinmemoria[13] = 0;
                arrayzoneinmemoria[14] = 0;
                arrayzoneinmemoria[15] = 0;
              }
              if (colonna49 != "00") {
                switch (colonna49bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 17 in memoria");
                    arrayzoneinmemoria[16] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[16] = 0;
                    break;
                }
                switch (colonna49bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 18 in memoria");
                    arrayzoneinmemoria[17] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[17] = 0;
                    break;
                }
                switch (colonna49bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 19 in memoria");
                    arrayzoneinmemoria[18] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[18] = 0;
                    break;
                }
                switch (colonna49bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 20 in memoria");
                    arrayzoneinmemoria[19] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[19] = 0;
                    break;
                }
                switch (colonna49bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 21 in memoria");
                    arrayzoneinmemoria[20] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[20] = 0;
                    break;
                }
                switch (colonna49bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 22 in memoria");
                    arrayzoneinmemoria[21] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[21] = 0;
                    break;
                }
                switch (colonna49bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 23 in memoria");
                    arrayzoneinmemoria[22] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[22] = 0;
                    break;
                }
                switch (colonna49bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 24 in memoria");
                    arrayzoneinmemoria[23] = 1;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                  case "0":
                    arrayzoneinmemoria[23] = 0;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                }
              } else if (colonna49 == "00") {
                arrayzoneinmemoria[16] = 0;
                arrayzoneinmemoria[17] = 0;
                arrayzoneinmemoria[18] = 0;
                arrayzoneinmemoria[19] = 0;
                arrayzoneinmemoria[20] = 0;
                arrayzoneinmemoria[21] = 0;
                arrayzoneinmemoria[22] = 0;
                arrayzoneinmemoria[23] = 0;
              }
              if (colonna50 != "00") {
                switch (colonna50bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 25 in memoria");
                    arrayzoneinmemoria[24] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[24] = 0;
                    break;
                }
                switch (colonna50bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 26 in memoria");
                    arrayzoneinmemoria[25] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[25] = 0;
                    break;
                }
                switch (colonna50bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 27 in memoria");
                    arrayzoneinmemoria[26] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[26] = 0;
                    break;
                }
                switch (colonna50bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 28 in memoria");
                    arrayzoneinmemoria[27] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[27] = 0;
                    break;
                }
                switch (colonna50bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 29 in memoria");
                    arrayzoneinmemoria[28] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[28] = 0;
                    break;
                }
                switch (colonna50bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 30 in memoria");
                    arrayzoneinmemoria[29] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[29] = 0;
                    break;
                }
                switch (colonna50bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 31 in memoria");
                    arrayzoneinmemoria[30] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[30] = 0;
                    break;
                }
                switch (colonna50bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 32 in memoria");
                    arrayzoneinmemoria[31] = 1;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                  case "0":
                    arrayzoneinmemoria[31] = 0;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                }
              } else if (colonna50 == "00") {
                arrayzoneinmemoria[24] = 0;
                arrayzoneinmemoria[25] = 0;
                arrayzoneinmemoria[26] = 0;
                arrayzoneinmemoria[27] = 0;
                arrayzoneinmemoria[28] = 0;
                arrayzoneinmemoria[29] = 0;
                arrayzoneinmemoria[30] = 0;
                arrayzoneinmemoria[31] = 0;
              }
              if (colonna51 != "00") {
                switch (colonna51bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 33 in memoria");
                    arrayzoneinmemoria[32] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[32] = 0;
                    break;
                }
                switch (colonna51bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 34 in memoria");
                    arrayzoneinmemoria[33] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[33] = 0;
                    break;
                }
                switch (colonna51bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 35 in memoria");
                    arrayzoneinmemoria[34] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[34] = 0;
                    break;
                }
                switch (colonna51bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 36 in memoria");
                    arrayzoneinmemoria[35] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[35] = 0;
                    break;
                }
                switch (colonna51bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 37 in memoria");
                    arrayzoneinmemoria[36] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[36] = 0;
                    break;
                }
                switch (colonna51bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 38 in memoria");
                    arrayzoneinmemoria[37] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[37] = 0;
                    break;
                }
                switch (colonna51bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 39 in memoria");
                    arrayzoneinmemoria[38] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[38] = 0;
                    break;
                }
                switch (colonna51bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 40 in memoria");
                    arrayzoneinmemoria[39] = 1;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                  case "0":
                    arrayzoneinmemoria[39] = 0;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                }
              } else if (colonna51 == "00") {
                arrayzoneinmemoria[32] = 0;
                arrayzoneinmemoria[33] = 0;
                arrayzoneinmemoria[34] = 0;
                arrayzoneinmemoria[35] = 0;
                arrayzoneinmemoria[36] = 0;
                arrayzoneinmemoria[37] = 0;
                arrayzoneinmemoria[38] = 0;
                arrayzoneinmemoria[39] = 0;
              }
              if (colonna52 != "00") {
                switch (colonna52bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 41 in memoria");
                    arrayzoneinmemoria[40] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[40] = 0;
                    break;
                }
                switch (colonna52bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 42 in memoria");
                    arrayzoneinmemoria[41] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[41] = 0;
                    break;
                }
                switch (colonna52bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 43 in memoria");
                    arrayzoneinmemoria[42] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[42] = 0;
                    break;
                }
                switch (colonna52bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 44 in memoria");
                    arrayzoneinmemoria[43] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[43] = 0;
                    break;
                }
                switch (colonna52bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 45 in memoria");
                    arrayzoneinmemoria[44] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[44] = 0;
                    break;
                }
                switch (colonna52bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 46 in memoria");
                    arrayzoneinmemoria[45] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[45] = 0;
                    break;
                }
                switch (colonna52bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 47 in memoria");
                    arrayzoneinmemoria[46] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[46] = 0;
                    break;
                }
                switch (colonna52bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 48 in memoria");
                    arrayzoneinmemoria[47] = 1;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                  case "0":
                    arrayzoneinmemoria[47] = 0;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                }
              } else if (colonna52 == "00") {
                arrayzoneinmemoria[40] = 0;
                arrayzoneinmemoria[41] = 0;
                arrayzoneinmemoria[42] = 0;
                arrayzoneinmemoria[43] = 0;
                arrayzoneinmemoria[44] = 0;
                arrayzoneinmemoria[45] = 0;
                arrayzoneinmemoria[46] = 0;
                arrayzoneinmemoria[47] = 0;
              }
              if (colonna53 != "00") {
                switch (colonna53bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 49 in memoria");
                    arrayzoneinmemoria[48] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[48] = 0;
                    break;
                }
                switch (colonna53bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 50 in memoria");
                    arrayzoneinmemoria[49] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[49] = 0;
                    break;
                }
                switch (colonna53bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 51 in memoria");
                    arrayzoneinmemoria[50] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[50] = 0;
                    break;
                }
                switch (colonna53bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 52 in memoria");
                    arrayzoneinmemoria[51] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[51] = 0;
                    break;
                }
                switch (colonna53bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 53 in memoria");
                    arrayzoneinmemoria[52] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[52] = 0;
                    break;
                }
                switch (colonna53bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 54 in memoria");
                    arrayzoneinmemoria[53] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[53] = 0;
                    break;
                }
                switch (colonna53bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 55 in memoria");
                    arrayzoneinmemoria[54] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[54] = 0;
                    break;
                }
                switch (colonna53bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 56 in memoria");
                    arrayzoneinmemoria[55] = 1;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                  case "0":
                    arrayzoneinmemoria[55] = 0;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                }
              } else if (colonna53 == "00") {
                arrayzoneinmemoria[48] = 0;
                arrayzoneinmemoria[49] = 0;
                arrayzoneinmemoria[50] = 0;
                arrayzoneinmemoria[51] = 0;
                arrayzoneinmemoria[52] = 0;
                arrayzoneinmemoria[53] = 0;
                arrayzoneinmemoria[54] = 0;
                arrayzoneinmemoria[55] = 0;
              }
              if (colonna54 != "00") {
                switch (colonna54bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 57 in memoria");
                    arrayzoneinmemoria[56] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[56] = 0;
                    break;
                }
                switch (colonna54bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 58 in memoria");
                    arrayzoneinmemoria[57] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[57] = 0;
                    break;
                }
                switch (colonna54bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 59 in memoria");
                    arrayzoneinmemoria[58] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[58] = 0;
                    break;
                }
                switch (colonna54bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 60 in memoria");
                    arrayzoneinmemoria[59] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[59] = 0;
                    break;
                }
                switch (colonna54bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 61 in memoria");
                    arrayzoneinmemoria[60] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[60] = 0;
                    break;
                }
                switch (colonna54bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 62 in memoria");
                    arrayzoneinmemoria[61] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[61] = 0;
                    break;
                }
                switch (colonna54bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 63 in memoria");
                    arrayzoneinmemoria[62] = 1;
                    break;
                  case "0":
                    arrayzoneinmemoria[62] = 0;
                    break;
                }
                switch (colonna54bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 64 in memoria");
                    arrayzoneinmemoria[63] = 1;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                  case "0":
                    arrayzoneinmemoria[63] = 0;
                    console.log("arrayzoneinmemoria", arrayzoneinmemoria);
                    break;
                }
              } else if (colonna54 == "00") {
                arrayzoneinmemoria[56] = 0;
                arrayzoneinmemoria[57] = 0;
                arrayzoneinmemoria[58] = 0;
                arrayzoneinmemoria[59] = 0;
                arrayzoneinmemoria[60] = 0;
                arrayzoneinmemoria[61] = 0;
                arrayzoneinmemoria[62] = 0;
                arrayzoneinmemoria[63] = 0;
              }
              if (colonna55 != "00") {
                switch (colonna55bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 1 esclusa");
                    arrayzoneescluse[0] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[0] = 0;
                    break;
                }
                switch (colonna55bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 2 esclusa");
                    arrayzoneescluse[1] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[1] = 0;
                    break;
                }
                switch (colonna55bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 3 esclusa");
                    arrayzoneescluse[2] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[2] = 0;
                    break;
                }
                switch (colonna55bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 4 esclusa");
                    arrayzoneescluse[3] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[3] = 0;
                    break;
                }
                switch (colonna55bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 5 esclusa");
                    arrayzoneescluse[4] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[4] = 0;
                    break;
                }
                switch (colonna55bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 6 esclusa");
                    arrayzoneescluse[5] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[5] = 0;
                    break;
                }
                switch (colonna55bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 7 esclusa");
                    arrayzoneescluse[6] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[6] = 0;
                    break;
                }
                switch (colonna55bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 8 esclusa");
                    arrayzoneescluse[7] = 1;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                  case "0":
                    arrayzoneescluse[7] = 0;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                }
              } else if (colonna55 == "00") {
                arrayzoneescluse[0] = 0;
                arrayzoneescluse[1] = 0;
                arrayzoneescluse[2] = 0;
                arrayzoneescluse[3] = 0;
                arrayzoneescluse[4] = 0;
                arrayzoneescluse[5] = 0;
                arrayzoneescluse[6] = 0;
                arrayzoneescluse[7] = 0;
              }
              if (colonna56 != "00") {
                switch (colonna56bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 9 esclusa");
                    arrayzoneescluse[8] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[8] = 0;
                    break;
                }
                switch (colonna56bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 10 esclusa");
                    arrayzoneescluse[9] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[9] = 0;
                    break;
                }
                switch (colonna56bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 11 esclusa");
                    arrayzoneescluse[10] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[10] = 0;
                    break;
                }
                switch (colonna56bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 12 esclusa");
                    arrayzoneescluse[11] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[11] = 0;
                    break;
                }
                switch (colonna56bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 13 esclusa");
                    arrayzoneescluse[12] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[12] = 0;
                    break;
                }
                switch (colonna56bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 14 esclusa");
                    arrayzoneescluse[13] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[13] = 0;
                    break;
                }
                switch (colonna56bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 15 esclusa");
                    arrayzoneescluse[14] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[14] = 0;
                    break;
                }
                switch (colonna56bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 16 esclusa");
                    arrayzoneescluse[15] = 1;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                  case "0":
                    arrayzoneescluse[15] = 0;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                }
              } else if (colonna56 == "00") {
                arrayzoneescluse[8] = 0;
                arrayzoneescluse[9] = 0;
                arrayzoneescluse[10] = 0;
                arrayzoneescluse[11] = 0;
                arrayzoneescluse[12] = 0;
                arrayzoneescluse[13] = 0;
                arrayzoneescluse[14] = 0;
                arrayzoneescluse[15] = 0;
              }
              if (colonna57 != "00") {
                switch (colonna57bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 17 esclusa");
                    arrayzoneescluse[16] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[16] = 0;
                    break;
                }
                switch (colonna57bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 18 esclusa");
                    arrayzoneescluse[17] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[17] = 0;
                    break;
                }
                switch (colonna57bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 19 esclusa");
                    arrayzoneescluse[18] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[18] = 0;
                    break;
                }
                switch (colonna57bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 20 esclusa");
                    arrayzoneescluse[19] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[19] = 0;
                    break;
                }
                switch (colonna57bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 21 esclusa");
                    arrayzoneescluse[20] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[20] = 0;
                    break;
                }
                switch (colonna57bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 22 esclusa");
                    arrayzoneescluse[21] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[21] = 0;
                    break;
                }
                switch (colonna57bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 23 esclusa");
                    arrayzoneescluse[22] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[22] = 0;
                    break;
                }
                switch (colonna57bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 24 esclusa");
                    arrayzoneescluse[23] = 1;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                  case "0":
                    arrayzoneescluse[23] = 0;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                }
              } else if (colonna57 == "00") {
                arrayzoneescluse[16] = 0;
                arrayzoneescluse[17] = 0;
                arrayzoneescluse[18] = 0;
                arrayzoneescluse[19] = 0;
                arrayzoneescluse[20] = 0;
                arrayzoneescluse[21] = 0;
                arrayzoneescluse[22] = 0;
                arrayzoneescluse[23] = 0;
              }
              if (colonna58 != "00") {
                switch (colonna58bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 25 esclusa");
                    arrayzoneescluse[24] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[24] = 0;
                    break;
                }
                switch (colonna58bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 26 esclusa");
                    arrayzoneescluse[25] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[25] = 0;
                    break;
                }
                switch (colonna58bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 27 esclusa");
                    arrayzoneescluse[26] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[26] = 0;
                    break;
                }
                switch (colonna58bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 28 esclusa");
                    arrayzoneescluse[27] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[27] = 0;
                    break;
                }
                switch (colonna58bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 29 esclusa");
                    arrayzoneescluse[28] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[28] = 0;
                    break;
                }
                switch (colonna58bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 30 esclusa");
                    arrayzoneescluse[29] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[29] = 0;
                    break;
                }
                switch (colonna58bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 31 esclusa");
                    arrayzoneescluse[30] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[30] = 0;
                    break;
                }
                switch (colonna58bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 32 esclusa");
                    arrayzoneescluse[31] = 1;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                  case "0":
                    arrayzoneescluse[31] = 0;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                }
              } else if (colonna58 == "00") {
                arrayzoneescluse[24] = 0;
                arrayzoneescluse[25] = 0;
                arrayzoneescluse[26] = 0;
                arrayzoneescluse[27] = 0;
                arrayzoneescluse[28] = 0;
                arrayzoneescluse[29] = 0;
                arrayzoneescluse[30] = 0;
                arrayzoneescluse[31] = 0;
              }
              if (colonna59 != "00") {
                switch (colonna59bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 33 esclusa");
                    arrayzoneescluse[32] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[32] = 0;
                    break;
                }
                switch (colonna59bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 34 esclusa");
                    arrayzoneescluse[33] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[33] = 0;
                    break;
                }
                switch (colonna59bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 35 esclusa");
                    arrayzoneescluse[34] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[34] = 0;
                    break;
                }
                switch (colonna59bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 36 esclusa");
                    arrayzoneescluse[35] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[35] = 0;
                    break;
                }
                switch (colonna59bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 37 esclusa");
                    arrayzoneescluse[36] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[36] = 0;
                    break;
                }
                switch (colonna59bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 38 esclusa");
                    arrayzoneescluse[37] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[37] = 0;
                    break;
                }
                switch (colonna59bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 39 esclusa");
                    arrayzoneescluse[38] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[38] = 0;
                    break;
                }
                switch (colonna59bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 40 esclusa");
                    arrayzoneescluse[39] = 1;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                  case "0":
                    arrayzoneescluse[39] = 0;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                }
              } else if (colonna59 == "00") {
                arrayzoneescluse[32] = 0;
                arrayzoneescluse[33] = 0;
                arrayzoneescluse[34] = 0;
                arrayzoneescluse[35] = 0;
                arrayzoneescluse[36] = 0;
                arrayzoneescluse[37] = 0;
                arrayzoneescluse[38] = 0;
                arrayzoneescluse[39] = 0;
              }
              if (colonna60 != "00") {
                switch (colonna60bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 41 esclusa");
                    arrayzoneescluse[40] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[40] = 0;
                    break;
                }
                switch (colonna60bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 42 esclusa");
                    arrayzoneescluse[41] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[41] = 0;
                    break;
                }
                switch (colonna60bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 43 esclusa");
                    arrayzoneescluse[42] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[42] = 0;
                    break;
                }
                switch (colonna60bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 44 esclusa");
                    arrayzoneescluse[43] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[43] = 0;
                    break;
                }
                switch (colonna60bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 45 esclusa");
                    arrayzoneescluse[44] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[44] = 0;
                    break;
                }
                switch (colonna60bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 46 esclusa");
                    arrayzoneescluse[45] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[45] = 0;
                    break;
                }
                switch (colonna60bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 47 esclusa");
                    arrayzoneescluse[46] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[46] = 0;
                    break;
                }
                switch (colonna60bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 48 esclusa");
                    arrayzoneescluse[47] = 1;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                  case "0":
                    arrayzoneescluse[47] = 0;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                }
              } else if (colonna60 == "00") {
                arrayzoneescluse[40] = 0;
                arrayzoneescluse[41] = 0;
                arrayzoneescluse[42] = 0;
                arrayzoneescluse[43] = 0;
                arrayzoneescluse[44] = 0;
                arrayzoneescluse[45] = 0;
                arrayzoneescluse[46] = 0;
                arrayzoneescluse[47] = 0;
              }
              if (colonna61 != "00") {
                switch (colonna61bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 49 esclusa");
                    arrayzoneescluse[48] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[48] = 0;
                    break;
                }
                switch (colonna61bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 50 esclusa");
                    arrayzoneescluse[49] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[49] = 0;
                    break;
                }
                switch (colonna61bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 51 esclusa");
                    arrayzoneescluse[50] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[50] = 0;
                    break;
                }
                switch (colonna61bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 52 esclusa");
                    arrayzoneescluse[51] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[51] = 0;
                    break;
                }
                switch (colonna61bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 53 esclusa");
                    arrayzoneescluse[52] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[52] = 0;
                    break;
                }
                switch (colonna61bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 54 esclusa");
                    arrayzoneescluse[53] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[53] = 0;
                    break;
                }
                switch (colonna61bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 55 esclusa");
                    arrayzoneescluse[54] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[54] = 0;
                    break;
                }
                switch (colonna61bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 56 esclusa");
                    arrayzoneescluse[55] = 1;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                  case "0":
                    arrayzoneescluse[55] = 0;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                }
              } else if (colonna61 == "00") {
                arrayzoneescluse[48] = 0;
                arrayzoneescluse[49] = 0;
                arrayzoneescluse[50] = 0;
                arrayzoneescluse[51] = 0;
                arrayzoneescluse[52] = 0;
                arrayzoneescluse[53] = 0;
                arrayzoneescluse[54] = 0;
                arrayzoneescluse[55] = 0;
              }
              if (colonna62 != "00") {
                switch (colonna62bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 57 esclusa");
                    arrayzoneescluse[56] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[56] = 0;
                    break;
                }
                switch (colonna62bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 58 esclusa");
                    arrayzoneescluse[57] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[57] = 0;
                    break;
                }
                switch (colonna62bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 59 esclusa");
                    arrayzoneescluse[58] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[58] = 0;
                    break;
                }
                switch (colonna62bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 60 esclusa");
                    arrayzoneescluse[59] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[59] = 0;
                    break;
                }
                switch (colonna62bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 61 esclusa");
                    arrayzoneescluse[60] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[60] = 0;
                    break;
                }
                switch (colonna62bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 62 esclusa");
                    arrayzoneescluse[61] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[61] = 0;
                    break;
                }
                switch (colonna62bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 63 esclusa");
                    arrayzoneescluse[62] = 1;
                    break;
                  case "0":
                    arrayzoneescluse[62] = 0;
                    break;
                }
                switch (colonna62bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 64 esclusa");
                    arrayzoneescluse[63] = 1;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                  case "0":
                    arrayzoneescluse[63] = 0;
                    console.log("arrayzoneescluse", arrayzoneescluse);
                    break;
                }
              } else if (colonna62 == "00") {
                arrayzoneescluse[56] = 0;
                arrayzoneescluse[57] = 0;
                arrayzoneescluse[58] = 0;
                arrayzoneescluse[59] = 0;
                arrayzoneescluse[60] = 0;
                arrayzoneescluse[61] = 0;
                arrayzoneescluse[62] = 0;
                arrayzoneescluse[63] = 0;
              }
              if (colonna63 != "00") {
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
              if (colonna64 != "00") {
                switch (colonna64bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 1 rapina");
                    arrayzonerapine[0] = 1;
                    break;
                  case "0":
                    arrayzonerapine[0] = 0;
                    break;
                }
                switch (colonna64bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 2 rapina");
                    arrayzonerapine[1] = 1;
                    break;
                  case "0":
                    arrayzonerapine[1] = 0;
                    break;
                }
                switch (colonna64bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 3 rapina");
                    arrayzonerapine[2] = 1;
                    break;
                  case "0":
                    arrayzonerapine[2] = 0;
                    break;
                }
                switch (colonna64bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 4 rapina");
                    arrayzonerapine[3] = 1;
                    break;
                  case "0":
                    arrayzonerapine[3] = 0;
                    break;
                }
                switch (colonna64bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 5 rapina");
                    arrayzonerapine[4] = 1;
                    break;
                  case "0":
                    arrayzonerapine[4] = 0;
                    break;
                }
                switch (colonna64bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 6 rapina");
                    arrayzonerapine[5] = 1;
                    break;
                  case "0":
                    arrayzonerapine[5] = 0;
                    break;
                }
                switch (colonna64bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 7 rapina");
                    arrayzonerapine[6] = 1;
                    break;
                  case "0":
                    arrayzonerapine[6] = 0;
                    break;
                }
                switch (colonna64bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 8 rapina");
                    arrayzonerapine[7] = 1;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                  case "0":
                    arrayzonerapine[7] = 0;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                }
              } else if (colonna64 == "00") {
                arrayzonerapine[0] = 0;
                arrayzonerapine[1] = 0;
                arrayzonerapine[2] = 0;
                arrayzonerapine[3] = 0;
                arrayzonerapine[4] = 0;
                arrayzonerapine[5] = 0;
                arrayzonerapine[6] = 0;
                arrayzonerapine[7] = 0;
              }
              if (colonna65 != "00") {
                switch (colonna65bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 9 rapina");
                    arrayzonerapine[8] = 1;
                    break;
                  case "0":
                    arrayzonerapine[8] = 0;
                    break;
                }
                switch (colonna65bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 10 rapina");
                    arrayzonerapine[9] = 1;
                    break;
                  case "0":
                    arrayzonerapine[9] = 0;
                    break;
                }
                switch (colonna65bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 11 rapina");
                    arrayzonerapine[10] = 1;
                    break;
                  case "0":
                    arrayzonerapine[10] = 0;
                    break;
                }
                switch (colonna65bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 12 rapina");
                    arrayzonerapine[11] = 1;
                    break;
                  case "0":
                    arrayzonerapine[11] = 0;
                    break;
                }
                switch (colonna65bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 13 rapina");
                    arrayzonerapine[12] = 1;
                    break;
                  case "0":
                    arrayzonerapine[12] = 0;
                    break;
                }
                switch (colonna65bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 14 rapina");
                    arrayzonerapine[13] = 1;
                    break;
                  case "0":
                    arrayzonerapine[13] = 0;
                    break;
                }
                switch (colonna65bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 15 rapina");
                    arrayzonerapine[14] = 1;
                    break;
                  case "0":
                    arrayzonerapine[14] = 0;
                    break;
                }
                switch (colonna65bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 16 rapina");
                    arrayzonerapine[15] = 1;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                  case "0":
                    arrayzonerapine[15] = 0;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                }
              } else if (colonna65 == "00") {
                arrayzonerapine[8] = 0;
                arrayzonerapine[9] = 0;
                arrayzonerapine[10] = 0;
                arrayzonerapine[11] = 0;
                arrayzonerapine[12] = 0;
                arrayzonerapine[13] = 0;
                arrayzonerapine[14] = 0;
                arrayzonerapine[15] = 0;
              }
              if (colonna66 != "00") {
                switch (colonna66bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 17 rapina");
                    arrayzonerapine[16] = 1;
                    break;
                  case "0":
                    arrayzonerapine[16] = 0;
                    break;
                }
                switch (colonna66bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 18 rapina");
                    arrayzonerapine[17] = 1;
                    break;
                  case "0":
                    arrayzonerapine[17] = 0;
                    break;
                }
                switch (colonna66bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 19 rapina");
                    arrayzonerapine[18] = 1;
                    break;
                  case "0":
                    arrayzonerapine[18] = 0;
                    break;
                }
                switch (colonna66bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 20 rapina");
                    arrayzonerapine[19] = 1;
                    break;
                  case "0":
                    arrayzonerapine[19] = 0;
                    break;
                }
                switch (colonna66bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 21 rapina");
                    arrayzonerapine[20] = 1;
                    break;
                  case "0":
                    arrayzonerapine[20] = 0;
                    break;
                }
                switch (colonna66bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 22 rapina");
                    arrayzonerapine[21] = 1;
                    break;
                  case "0":
                    arrayzonerapine[21] = 0;
                    break;
                }
                switch (colonna66bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 23 rapina");
                    arrayzonerapine[22] = 1;
                    break;
                  case "0":
                    arrayzonerapine[22] = 0;
                    break;
                }
                switch (colonna66bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 24 rapina");
                    arrayzonerapine[23] = 1;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                  case "0":
                    arrayzonerapine[23] = 0;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                }
              } else if (colonna66 == "00") {
                arrayzonerapine[16] = 0;
                arrayzonerapine[17] = 0;
                arrayzonerapine[18] = 0;
                arrayzonerapine[19] = 0;
                arrayzonerapine[20] = 0;
                arrayzonerapine[21] = 0;
                arrayzonerapine[22] = 0;
                arrayzonerapine[23] = 0;
              }
              if (colonna67 != "00") {
                switch (colonna67bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 25 rapina");
                    arrayzonerapine[24] = 1;
                    break;
                  case "0":
                    arrayzonerapine[24] = 0;
                    break;
                }
                switch (colonna67bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 26 rapina");
                    arrayzonerapine[25] = 1;
                    break;
                  case "0":
                    arrayzonerapine[25] = 0;
                    break;
                }
                switch (colonna67bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 27 rapina");
                    arrayzonerapine[26] = 1;
                    break;
                  case "0":
                    arrayzonerapine[26] = 0;
                    break;
                }
                switch (colonna67bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 28 rapina");
                    arrayzonerapine[27] = 1;
                    break;
                  case "0":
                    arrayzonerapine[27] = 0;
                    break;
                }
                switch (colonna67bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 29 rapina");
                    arrayzonerapine[28] = 1;
                    break;
                  case "0":
                    arrayzonerapine[28] = 0;
                    break;
                }
                switch (colonna67bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 30 rapina");
                    arrayzonerapine[29] = 1;
                    break;
                  case "0":
                    arrayzonerapine[29] = 0;
                    break;
                }
                switch (colonna67bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 31 rapina");
                    arrayzonerapine[30] = 1;
                    break;
                  case "0":
                    arrayzonerapine[30] = 0;
                    break;
                }
                switch (colonna67bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 32 rapina");
                    arrayzonerapine[31] = 1;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                  case "0":
                    arrayzonerapine[31] = 0;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                }
              } else if (colonna67 == "00") {
                arrayzonerapine[24] = 0;
                arrayzonerapine[25] = 0;
                arrayzonerapine[26] = 0;
                arrayzonerapine[27] = 0;
                arrayzonerapine[28] = 0;
                arrayzonerapine[29] = 0;
                arrayzonerapine[30] = 0;
                arrayzonerapine[31] = 0;
              }
              if (colonna68 != "00") {
                switch (colonna68bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 33 rapina");
                    arrayzonerapine[32] = 1;
                    break;
                  case "0":
                    arrayzonerapine[32] = 0;
                    break;
                }
                switch (colonna68bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 34 rapina");
                    arrayzonerapine[33] = 1;
                    break;
                  case "0":
                    arrayzonerapine[33] = 0;
                    break;
                }
                switch (colonna68bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 35 rapina");
                    arrayzonerapine[34] = 1;
                    break;
                  case "0":
                    arrayzonerapine[34] = 0;
                    break;
                }
                switch (colonna68bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 36 rapina");
                    arrayzonerapine[35] = 1;
                    break;
                  case "0":
                    arrayzonerapine[35] = 0;
                    break;
                }
                switch (colonna68bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 37 rapina");
                    arrayzonerapine[36] = 1;
                    break;
                  case "0":
                    arrayzonerapine[36] = 0;
                    break;
                }
                switch (colonna68bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 38 rapina");
                    arrayzonerapine[37] = 1;
                    break;
                  case "0":
                    arrayzonerapine[37] = 0;
                    break;
                }
                switch (colonna68bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 39 rapina");
                    arrayzonerapine[38] = 1;
                    break;
                  case "0":
                    arrayzonerapine[38] = 0;
                    break;
                }
                switch (colonna68bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 40 rapina");
                    arrayzonerapine[39] = 1;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                  case "0":
                    arrayzonerapine[39] = 0;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                }
              } else if (colonna68 == "00") {
                arrayzonerapine[32] = 0;
                arrayzonerapine[33] = 0;
                arrayzonerapine[34] = 0;
                arrayzonerapine[35] = 0;
                arrayzonerapine[36] = 0;
                arrayzonerapine[37] = 0;
                arrayzonerapine[38] = 0;
                arrayzonerapine[39] = 0;
              }
              if (colonna69 != "00") {
                switch (colonna69bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 41 rapina");
                    arrayzonerapine[40] = 1;
                    break;
                  case "0":
                    arrayzonerapine[40] = 0;
                    break;
                }
                switch (colonna69bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 42 rapina");
                    arrayzonerapine[41] = 1;
                    break;
                  case "0":
                    arrayzonerapine[41] = 0;
                    break;
                }
                switch (colonna69bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 43 rapina");
                    arrayzonerapine[42] = 1;
                    break;
                  case "0":
                    arrayzonerapine[42] = 0;
                    break;
                }
                switch (colonna69bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 44 rapina");
                    arrayzonerapine[43] = 1;
                    break;
                  case "0":
                    arrayzonerapine[43] = 0;
                    break;
                }
                switch (colonna69bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 45 rapina");
                    arrayzonerapine[44] = 1;
                    break;
                  case "0":
                    arrayzonerapine[44] = 0;
                    break;
                }
                switch (colonna69bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 46 rapina");
                    arrayzonerapine[45] = 1;
                    break;
                  case "0":
                    arrayzonerapine[45] = 0;
                    break;
                }
                switch (colonna69bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 47 rapina");
                    arrayzonerapine[46] = 1;
                    break;
                  case "0":
                    arrayzonerapine[46] = 0;
                    break;
                }
                switch (colonna69bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 48 rapina");
                    arrayzonerapine[47] = 1;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                  case "0":
                    arrayzonerapine[47] = 0;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                }
              } else if (colonna69 == "00") {
                arrayzonerapine[40] = 0;
                arrayzonerapine[41] = 0;
                arrayzonerapine[42] = 0;
                arrayzonerapine[43] = 0;
                arrayzonerapine[44] = 0;
                arrayzonerapine[45] = 0;
                arrayzonerapine[46] = 0;
                arrayzonerapine[47] = 0;
              }
              if (colonna70 != "00") {
                switch (colonna70bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 49 rapina");
                    arrayzonerapine[48] = 1;
                    break;
                  case "0":
                    arrayzonerapine[48] = 0;
                    break;
                }
                switch (colonna70bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 50 rapina");
                    arrayzonerapine[49] = 1;
                    break;
                  case "0":
                    arrayzonerapine[49] = 0;
                    break;
                }
                switch (colonna70bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 51 rapina");
                    arrayzonerapine[50] = 1;
                    break;
                  case "0":
                    arrayzonerapine[50] = 0;
                    break;
                }
                switch (colonna70bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 52 rapina");
                    arrayzonerapine[51] = 1;
                    break;
                  case "0":
                    arrayzonerapine[51] = 0;
                    break;
                }
                switch (colonna70bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 53 rapina");
                    arrayzonerapine[52] = 1;
                    break;
                  case "0":
                    arrayzonerapine[52] = 0;
                    break;
                }
                switch (colonna70bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 54 rapina");
                    arrayzonerapine[53] = 1;
                    break;
                  case "0":
                    arrayzonerapine[53] = 0;
                    break;
                }
                switch (colonna70bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 55 rapina");
                    arrayzonerapine[54] = 1;
                    break;
                  case "0":
                    arrayzonerapine[54] = 0;
                    break;
                }
                switch (colonna70bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 56 rapina");
                    arrayzonerapine[55] = 1;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                  case "0":
                    arrayzonerapine[55] = 0;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                }
              } else if (colonna70 == "00") {
                arrayzonerapine[48] = 0;
                arrayzonerapine[49] = 0;
                arrayzonerapine[50] = 0;
                arrayzonerapine[51] = 0;
                arrayzonerapine[52] = 0;
                arrayzonerapine[53] = 0;
                arrayzonerapine[54] = 0;
                arrayzonerapine[55] = 0;
              }
              if (colonna71 != "00") {
                switch (colonna71bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 57 rapina");
                    arrayzonerapine[56] = 1;
                    break;
                  case "0":
                    arrayzonerapine[56] = 0;
                    break;
                }
                switch (colonna71bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 58 rapina");
                    arrayzonerapine[57] = 1;
                    break;
                  case "0":
                    arrayzonerapine[57] = 0;
                    break;
                }
                switch (colonna71bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 59 rapina");
                    arrayzonerapine[58] = 1;
                    break;
                  case "0":
                    arrayzonerapine[58] = 0;
                    break;
                }
                switch (colonna71bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 60 rapina");
                    arrayzonerapine[59] = 1;
                    break;
                  case "0":
                    arrayzonerapine[59] = 0;
                    break;
                }
                switch (colonna71bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 61 rapina");
                    arrayzonerapine[60] = 1;
                    break;
                  case "0":
                    arrayzonerapine[60] = 0;
                    break;
                }
                switch (colonna71bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 62 rapina");
                    arrayzonerapine[61] = 1;
                    break;
                  case "0":
                    arrayzonerapine[61] = 0;
                    break;
                }
                switch (colonna71bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 63 rapina");
                    arrayzonerapine[62] = 1;
                    break;
                  case "0":
                    arrayzonerapine[62] = 0;
                    break;
                }
                switch (colonna71bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 64 rapina");
                    arrayzonerapine[63] = 1;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                  case "0":
                    arrayzonerapine[63] = 0;
                    console.log("arrayzonerapine", arrayzonerapine);
                    break;
                }
              } else if (colonna71 == "00") {
                arrayzonerapine[56] = 0;
                arrayzonerapine[57] = 0;
                arrayzonerapine[58] = 0;
                arrayzonerapine[59] = 0;
                arrayzonerapine[60] = 0;
                arrayzonerapine[61] = 0;
                arrayzonerapine[62] = 0;
                arrayzonerapine[63] = 0;
              }
              if (colonna72 != "00") {
                switch (colonna72bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 1 tampap");
                    arrayzonetampap[0] = 1;
                    break;
                  case "0":
                    arrayzonetampap[0] = 0;
                    break;
                }
                switch (colonna72bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 2 tampap");
                    arrayzonetampap[1] = 1;
                    break;
                  case "0":
                    arrayzonetampap[1] = 0;
                    break;
                }
                switch (colonna72bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 3 tampap");
                    arrayzonetampap[2] = 1;
                    break;
                  case "0":
                    arrayzonetampap[2] = 0;
                    break;
                }
                switch (colonna72bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 4 tampap");
                    arrayzonetampap[3] = 1;
                    break;
                  case "0":
                    arrayzonetampap[3] = 0;
                    break;
                }
                switch (colonna72bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 5 tampap");
                    arrayzonetampap[4] = 1;
                    break;
                  case "0":
                    arrayzonetampap[4] = 0;
                    break;
                }
                switch (colonna72bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 6 tampap");
                    arrayzonetampap[5] = 1;
                    break;
                  case "0":
                    arrayzonetampap[5] = 0;
                    break;
                }
                switch (colonna72bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 7 tampap");
                    arrayzonetampap[6] = 1;
                    break;
                  case "0":
                    arrayzonetampap[6] = 0;
                    break;
                }
                switch (colonna72bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 8 tampap");
                    arrayzonetampap[7] = 1;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                  case "0":
                    arrayzonetampap[7] = 0;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                }
              } else if (colonna72 == "00") {
                arrayzonetampap[0] = 0;
                arrayzonetampap[1] = 0;
                arrayzonetampap[2] = 0;
                arrayzonetampap[3] = 0;
                arrayzonetampap[4] = 0;
                arrayzonetampap[5] = 0;
                arrayzonetampap[6] = 0;
                arrayzonetampap[7] = 0;
              }
              if (colonna73 != "00") {
                switch (colonna73bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 9 tampap");
                    arrayzonetampap[8] = 1;
                    break;
                  case "0":
                    arrayzonetampap[8] = 0;
                    break;
                }
                switch (colonna73bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 10 tampap");
                    arrayzonetampap[9] = 1;
                    break;
                  case "0":
                    arrayzonetampap[9] = 0;
                    break;
                }
                switch (colonna73bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 11 tampap");
                    arrayzonetampap[10] = 1;
                    break;
                  case "0":
                    arrayzonetampap[10] = 0;
                    break;
                }
                switch (colonna73bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 12 tampap");
                    arrayzonetampap[11] = 1;
                    break;
                  case "0":
                    arrayzonetampap[11] = 0;
                    break;
                }
                switch (colonna73bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 13 tampap");
                    arrayzonetampap[12] = 1;
                    break;
                  case "0":
                    arrayzonetampap[12] = 0;
                    break;
                }
                switch (colonna73bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 14 tampap");
                    arrayzonetampap[13] = 1;
                    break;
                  case "0":
                    arrayzonetampap[13] = 0;
                    break;
                }
                switch (colonna73bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 15 tampap");
                    arrayzonetampap[14] = 1;
                    break;
                  case "0":
                    arrayzonetampap[14] = 0;
                    break;
                }
                switch (colonna73bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 16 tampap");
                    arrayzonetampap[15] = 1;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                  case "0":
                    arrayzonetampap[15] = 0;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                }
              } else if (colonna73 == "00") {
                arrayzonetampap[8] = 0;
                arrayzonetampap[9] = 0;
                arrayzonetampap[10] = 0;
                arrayzonetampap[11] = 0;
                arrayzonetampap[12] = 0;
                arrayzonetampap[13] = 0;
                arrayzonetampap[14] = 0;
                arrayzonetampap[15] = 0;
              }
              if (colonna74 != "00") {
                switch (colonna74bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 17 tampap");
                    arrayzonetampap[16] = 1;
                    break;
                  case "0":
                    arrayzonetampap[16] = 0;
                    break;
                }
                switch (colonna74bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 18 tampap");
                    arrayzonetampap[17] = 1;
                    break;
                  case "0":
                    arrayzonetampap[17] = 0;
                    break;
                }
                switch (colonna74bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 19 tampap");
                    arrayzonetampap[18] = 1;
                    break;
                  case "0":
                    arrayzonetampap[18] = 0;
                    break;
                }
                switch (colonna74bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 20 tampap");
                    arrayzonetampap[19] = 1;
                    break;
                  case "0":
                    arrayzonetampap[19] = 0;
                    break;
                }
                switch (colonna74bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 21 tampap");
                    arrayzonetampap[20] = 1;
                    break;
                  case "0":
                    arrayzonetampap[20] = 0;
                    break;
                }
                switch (colonna74bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 22 tampap");
                    arrayzonetampap[21] = 1;
                    break;
                  case "0":
                    arrayzonetampap[21] = 0;
                    break;
                }
                switch (colonna74bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 23 tampap");
                    arrayzonetampap[22] = 1;
                    break;
                  case "0":
                    arrayzonetampap[22] = 0;
                    break;
                }
                switch (colonna74bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 24 tampap");
                    arrayzonetampap[23] = 1;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                  case "0":
                    arrayzonetampap[23] = 0;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                }
              } else if (colonna74 == "00") {
                arrayzonetampap[16] = 0;
                arrayzonetampap[17] = 0;
                arrayzonetampap[18] = 0;
                arrayzonetampap[19] = 0;
                arrayzonetampap[20] = 0;
                arrayzonetampap[21] = 0;
                arrayzonetampap[22] = 0;
                arrayzonetampap[23] = 0;
              }
              if (colonna75 != "00") {
                switch (colonna75bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 25 tampap");
                    arrayzonetampap[24] = 1;
                    break;
                  case "0":
                    arrayzonetampap[24] = 0;
                    break;
                }
                switch (colonna75bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 26 tampap");
                    arrayzonetampap[25] = 1;
                    break;
                  case "0":
                    arrayzonetampap[25] = 0;
                    break;
                }
                switch (colonna75bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 27 tampap");
                    arrayzonetampap[26] = 1;
                    break;
                  case "0":
                    arrayzonetampap[26] = 0;
                    break;
                }
                switch (colonna75bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 28 tampap");
                    arrayzonetampap[27] = 1;
                    break;
                  case "0":
                    arrayzonetampap[27] = 0;
                    break;
                }
                switch (colonna75bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 29 tampap");
                    arrayzonetampap[28] = 1;
                    break;
                  case "0":
                    arrayzonetampap[28] = 0;
                    break;
                }
                switch (colonna75bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 30 tampap");
                    arrayzonetampap[29] = 1;
                    break;
                  case "0":
                    arrayzonetampap[29] = 0;
                    break;
                }
                switch (colonna75bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 31 tampap");
                    arrayzonetampap[30] = 1;
                    break;
                  case "0":
                    arrayzonetampap[30] = 0;
                    break;
                }
                switch (colonna75bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 32 tampap");
                    arrayzonetampap[31] = 1;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                  case "0":
                    arrayzonetampap[31] = 0;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                }
              } else if (colonna75 == "00") {
                arrayzonetampap[24] = 0;
                arrayzonetampap[25] = 0;
                arrayzonetampap[26] = 0;
                arrayzonetampap[27] = 0;
                arrayzonetampap[28] = 0;
                arrayzonetampap[29] = 0;
                arrayzonetampap[30] = 0;
                arrayzonetampap[31] = 0;
              }
              if (colonna76 != "00") {
                switch (colonna76bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 33 tampap");
                    arrayzonetampap[32] = 1;
                    break;
                  case "0":
                    arrayzonetampap[32] = 0;
                    break;
                }
                switch (colonna76bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 34 tampap");
                    arrayzonetampap[33] = 1;
                    break;
                  case "0":
                    arrayzonetampap[33] = 0;
                    break;
                }
                switch (colonna76bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 35 tampap");
                    arrayzonetampap[34] = 1;
                    break;
                  case "0":
                    arrayzonetampap[34] = 0;
                    break;
                }
                switch (colonna76bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 36 tampap");
                    arrayzonetampap[35] = 1;
                    break;
                  case "0":
                    arrayzonetampap[35] = 0;
                    break;
                }
                switch (colonna76bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 37 tampap");
                    arrayzonetampap[36] = 1;
                    break;
                  case "0":
                    arrayzonetampap[36] = 0;
                    break;
                }
                switch (colonna76bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 38 tampap");
                    arrayzonetampap[37] = 1;
                    break;
                  case "0":
                    arrayzonetampap[37] = 0;
                    break;
                }
                switch (colonna76bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 39 tampap");
                    arrayzonetampap[38] = 1;
                    break;
                  case "0":
                    arrayzonetampap[38] = 0;
                    break;
                }
                switch (colonna76bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 40 tampap");
                    arrayzonetampap[39] = 1;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                  case "0":
                    arrayzonetampap[39] = 0;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                }
              } else if (colonna76 == "00") {
                arrayzonetampap[32] = 0;
                arrayzonetampap[33] = 0;
                arrayzonetampap[34] = 0;
                arrayzonetampap[35] = 0;
                arrayzonetampap[36] = 0;
                arrayzonetampap[37] = 0;
                arrayzonetampap[38] = 0;
                arrayzonetampap[39] = 0;
              }
              if (colonna77 != "00") {
                switch (colonna77bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 41 tampap");
                    arrayzonetampap[40] = 1;
                    break;
                  case "0":
                    arrayzonetampap[40] = 0;
                    break;
                }
                switch (colonna77bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 42 tampap");
                    arrayzonetampap[41] = 1;
                    break;
                  case "0":
                    arrayzonetampap[41] = 0;
                    break;
                }
                switch (colonna77bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 43 tampap");
                    arrayzonetampap[42] = 1;
                    break;
                  case "0":
                    arrayzonetampap[42] = 0;
                    break;
                }
                switch (colonna77bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 44 tampap");
                    arrayzonetampap[43] = 1;
                    break;
                  case "0":
                    arrayzonetampap[43] = 0;
                    break;
                }
                switch (colonna77bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 45 tampap");
                    arrayzonetampap[44] = 1;
                    break;
                  case "0":
                    arrayzonetampap[44] = 0;
                    break;
                }
                switch (colonna77bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 46 tampap");
                    arrayzonetampap[45] = 1;
                    break;
                  case "0":
                    arrayzonetampap[45] = 0;
                    break;
                }
                switch (colonna77bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 47 tampap");
                    arrayzonetampap[46] = 1;
                    break;
                  case "0":
                    arrayzonetampap[46] = 0;
                    break;
                }
                switch (colonna77bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 48 tampap");
                    arrayzonetampap[47] = 1;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                  case "0":
                    arrayzonetampap[47] = 0;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                }
              } else if (colonna77 == "00") {
                arrayzonetampap[40] = 0;
                arrayzonetampap[41] = 0;
                arrayzonetampap[42] = 0;
                arrayzonetampap[43] = 0;
                arrayzonetampap[44] = 0;
                arrayzonetampap[45] = 0;
                arrayzonetampap[46] = 0;
                arrayzonetampap[47] = 0;
              }
              if (colonna78 != "00") {
                switch (colonna78bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 49 tampap");
                    arrayzonetampap[48] = 1;
                    break;
                  case "0":
                    arrayzonetampap[48] = 0;
                    break;
                }
                switch (colonna78bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 50 tampap");
                    arrayzonetampap[49] = 1;
                    break;
                  case "0":
                    arrayzonetampap[49] = 0;
                    break;
                }
                switch (colonna78bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 51 tampap");
                    arrayzonetampap[50] = 1;
                    break;
                  case "0":
                    arrayzonetampap[50] = 0;
                    break;
                }
                switch (colonna78bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 52 tampap");
                    arrayzonetampap[51] = 1;
                    break;
                  case "0":
                    arrayzonetampap[51] = 0;
                    break;
                }
                switch (colonna78bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 53 tampap");
                    arrayzonetampap[52] = 1;
                    break;
                  case "0":
                    arrayzonetampap[52] = 0;
                    break;
                }
                switch (colonna78bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 54 tampap");
                    arrayzonetampap[53] = 1;
                    break;
                  case "0":
                    arrayzonetampap[53] = 0;
                    break;
                }
                switch (colonna78bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 55 tampap");
                    arrayzonetampap[54] = 1;
                    break;
                  case "0":
                    arrayzonetampap[54] = 0;
                    break;
                }
                switch (colonna78bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 56 tampap");
                    arrayzonetampap[55] = 1;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                  case "0":
                    arrayzonetampap[55] = 0;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                }
              } else if (colonna78 == "00") {
                arrayzonetampap[48] = 0;
                arrayzonetampap[49] = 0;
                arrayzonetampap[50] = 0;
                arrayzonetampap[51] = 0;
                arrayzonetampap[52] = 0;
                arrayzonetampap[53] = 0;
                arrayzonetampap[54] = 0;
                arrayzonetampap[55] = 0;
              }
              if (colonna79 != "00") {
                switch (colonna79bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 57 tampap");
                    arrayzonetampap[56] = 1;
                    break;
                  case "0":
                    arrayzonetampap[56] = 0;
                    break;
                }
                switch (colonna79bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 58 tampap");
                    arrayzonetampap[57] = 1;
                    break;
                  case "0":
                    arrayzonetampap[57] = 0;
                    break;
                }
                switch (colonna79bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 59 tampap");
                    arrayzonetampap[58] = 1;
                    break;
                  case "0":
                    arrayzonetampap[58] = 0;
                    break;
                }
                switch (colonna79bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 60 tampap");
                    arrayzonetampap[59] = 1;
                    break;
                  case "0":
                    arrayzonetampap[59] = 0;
                    break;
                }
                switch (colonna79bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 61 tampap");
                    arrayzonetampap[60] = 1;
                    break;
                  case "0":
                    arrayzonetampap[60] = 0;
                    break;
                }
                switch (colonna79bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 62 tampap");
                    arrayzonetampap[61] = 1;
                    break;
                  case "0":
                    arrayzonetampap[61] = 0;
                    break;
                }
                switch (colonna79bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 63 tampap");
                    arrayzonetampap[62] = 1;
                    break;
                  case "0":
                    arrayzonetampap[62] = 0;
                    break;
                }
                switch (colonna79bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 64 tampap");
                    arrayzonetampap[63] = 1;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                  case "0":
                    arrayzonetampap[63] = 0;
                    console.log("arrayzonetampap", arrayzonetampap);
                    break;
                }
              } else if (colonna79 == "00") {
                arrayzonetampap[56] = 0;
                arrayzonetampap[57] = 0;
                arrayzonetampap[58] = 0;
                arrayzonetampap[59] = 0;
                arrayzonetampap[60] = 0;
                arrayzonetampap[61] = 0;
                arrayzonetampap[62] = 0;
                arrayzonetampap[63] = 0;
              }
              if (colonna80 != "00") {
                switch (colonna80bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 1 radiomr");
                    arrayzoneradiomr[0] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[0] = 0;
                    break;
                }
                switch (colonna80bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 2 radiomr");
                    arrayzoneradiomr[1] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[1] = 0;
                    break;
                }
                switch (colonna80bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 3 radiomr");
                    arrayzoneradiomr[2] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[2] = 0;
                    break;
                }
                switch (colonna80bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 4 radiomr");
                    arrayzoneradiomr[3] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[3] = 0;
                    break;
                }
                switch (colonna80bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 5 radiomr");
                    arrayzoneradiomr[4] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[4] = 0;
                    break;
                }
                switch (colonna80bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 6 radiomr");
                    arrayzoneradiomr[5] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[5] = 0;
                    break;
                }
                switch (colonna80bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 7 radiomr");
                    arrayzoneradiomr[6] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[6] = 0;
                    break;
                }
                switch (colonna80bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 8 radiomr");
                    arrayzoneradiomr[7] = 1;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                  case "0":
                    arrayzoneradiomr[7] = 0;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                }
              } else if (colonna80 == "00") {
                arrayzoneradiomr[0] = 0;
                arrayzoneradiomr[1] = 0;
                arrayzoneradiomr[2] = 0;
                arrayzoneradiomr[3] = 0;
                arrayzoneradiomr[4] = 0;
                arrayzoneradiomr[5] = 0;
                arrayzoneradiomr[6] = 0;
                arrayzoneradiomr[7] = 0;
              }
              if (colonna81 != "00") {
                switch (colonna81bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 9 radiomr");
                    arrayzoneradiomr[8] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[8] = 0;
                    break;
                }
                switch (colonna81bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 10 radiomr");
                    arrayzoneradiomr[9] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[9] = 0;
                    break;
                }
                switch (colonna81bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 11 radiomr");
                    arrayzoneradiomr[10] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[10] = 0;
                    break;
                }
                switch (colonna81bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 12 radiomr");
                    arrayzoneradiomr[11] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[11] = 0;
                    break;
                }
                switch (colonna81bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 13 radiomr");
                    arrayzoneradiomr[12] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[12] = 0;
                    break;
                }
                switch (colonna81bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 14 radiomr");
                    arrayzoneradiomr[13] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[13] = 0;
                    break;
                }
                switch (colonna81bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 15 radiomr");
                    arrayzoneradiomr[14] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[14] = 0;
                    break;
                }
                switch (colonna81bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 16 radiomr");
                    arrayzoneradiomr[15] = 1;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                  case "0":
                    arrayzoneradiomr[15] = 0;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                }
              } else if (colonna81 == "00") {
                arrayzoneradiomr[8] = 0;
                arrayzoneradiomr[9] = 0;
                arrayzoneradiomr[10] = 0;
                arrayzoneradiomr[11] = 0;
                arrayzoneradiomr[12] = 0;
                arrayzoneradiomr[13] = 0;
                arrayzoneradiomr[14] = 0;
                arrayzoneradiomr[15] = 0;
              }
              if (colonna82 != "00") {
                switch (colonna82bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 17 radiomr");
                    arrayzoneradiomr[16] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[16] = 0;
                    break;
                }
                switch (colonna82bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 18 radiomr");
                    arrayzoneradiomr[17] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[17] = 0;
                    break;
                }
                switch (colonna82bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 19 radiomr");
                    arrayzoneradiomr[18] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[18] = 0;
                    break;
                }
                switch (colonna82bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 20 radiomr");
                    arrayzoneradiomr[19] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[19] = 0;
                    break;
                }
                switch (colonna82bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 21 radiomr");
                    arrayzoneradiomr[20] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[20] = 0;
                    break;
                }
                switch (colonna82bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 22 radiomr");
                    arrayzoneradiomr[21] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[21] = 0;
                    break;
                }
                switch (colonna82bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 23 radiomr");
                    arrayzoneradiomr[22] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[22] = 0;
                    break;
                }
                switch (colonna82bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 24 radiomr");
                    arrayzoneradiomr[23] = 1;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                  case "0":
                    arrayzoneradiomr[23] = 0;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                }
              } else if (colonna82 == "00") {
                arrayzoneradiomr[16] = 0;
                arrayzoneradiomr[17] = 0;
                arrayzoneradiomr[18] = 0;
                arrayzoneradiomr[19] = 0;
                arrayzoneradiomr[20] = 0;
                arrayzoneradiomr[21] = 0;
                arrayzoneradiomr[22] = 0;
                arrayzoneradiomr[23] = 0;
              }
              if (colonna83 != "00") {
                switch (colonna83bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 25 radiomr");
                    arrayzoneradiomr[24] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[24] = 0;
                    break;
                }
                switch (colonna83bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 26 radiomr");
                    arrayzoneradiomr[25] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[25] = 0;
                    break;
                }
                switch (colonna83bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 27 radiomr");
                    arrayzoneradiomr[26] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[26] = 0;
                    break;
                }
                switch (colonna83bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 28 radiomr");
                    arrayzoneradiomr[27] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[27] = 0;
                    break;
                }
                switch (colonna83bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 29 radiomr");
                    arrayzoneradiomr[28] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[28] = 0;
                    break;
                }
                switch (colonna83bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 30 radiomr");
                    arrayzoneradiomr[29] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[29] = 0;
                    break;
                }
                switch (colonna83bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 31 radiomr");
                    arrayzoneradiomr[30] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[30] = 0;
                    break;
                }
                switch (colonna83bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 32 radiomr");
                    arrayzoneradiomr[31] = 1;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                  case "0":
                    arrayzoneradiomr[31] = 0;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                }
              } else if (colonna83 == "00") {
                arrayzoneradiomr[24] = 0;
                arrayzoneradiomr[25] = 0;
                arrayzoneradiomr[26] = 0;
                arrayzoneradiomr[27] = 0;
                arrayzoneradiomr[28] = 0;
                arrayzoneradiomr[29] = 0;
                arrayzoneradiomr[30] = 0;
                arrayzoneradiomr[31] = 0;
              }
              if (colonna84 != "00") {
                switch (colonna84bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 33 radiomr");
                    arrayzoneradiomr[32] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[32] = 0;
                    break;
                }
                switch (colonna84bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 34 radiomr");
                    arrayzoneradiomr[33] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[33] = 0;
                    break;
                }
                switch (colonna84bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 35 radiomr");
                    arrayzoneradiomr[34] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[34] = 0;
                    break;
                }
                switch (colonna84bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 36 radiomr");
                    arrayzoneradiomr[35] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[35] = 0;
                    break;
                }
                switch (colonna84bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 37 radiomr");
                    arrayzoneradiomr[36] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[36] = 0;
                    break;
                }
                switch (colonna84bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 38 radiomr");
                    arrayzoneradiomr[37] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[37] = 0;
                    break;
                }
                switch (colonna84bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 39 radiomr");
                    arrayzoneradiomr[38] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[38] = 0;
                    break;
                }
                switch (colonna84bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 40 radiomr");
                    arrayzoneradiomr[39] = 1;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                  case "0":
                    arrayzoneradiomr[39] = 0;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                }
              } else if (colonna84 == "00") {
                arrayzoneradiomr[32] = 0;
                arrayzoneradiomr[33] = 0;
                arrayzoneradiomr[34] = 0;
                arrayzoneradiomr[35] = 0;
                arrayzoneradiomr[36] = 0;
                arrayzoneradiomr[37] = 0;
                arrayzoneradiomr[38] = 0;
                arrayzoneradiomr[39] = 0;
              }
              if (colonna85 != "00") {
                switch (colonna85bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 41 radiomr");
                    arrayzoneradiomr[40] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[40] = 0;
                    break;
                }
                switch (colonna85bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 42 radiomr");
                    arrayzoneradiomr[41] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[41] = 0;
                    break;
                }
                switch (colonna85bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 43 radiomr");
                    arrayzoneradiomr[42] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[42] = 0;
                    break;
                }
                switch (colonna85bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 44 radiomr");
                    arrayzoneradiomr[43] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[43] = 0;
                    break;
                }
                switch (colonna85bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 45 radiomr");
                    arrayzoneradiomr[44] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[44] = 0;
                    break;
                }
                switch (colonna85bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 46 radiomr");
                    arrayzoneradiomr[45] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[45] = 0;
                    break;
                }
                switch (colonna85bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 47 radiomr");
                    arrayzoneradiomr[46] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[46] = 0;
                    break;
                }
                switch (colonna85bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 48 radiomr");
                    arrayzoneradiomr[47] = 1;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                  case "0":
                    arrayzoneradiomr[47] = 0;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                }
              } else if (colonna85 == "00") {
                arrayzoneradiomr[40] = 0;
                arrayzoneradiomr[41] = 0;
                arrayzoneradiomr[42] = 0;
                arrayzoneradiomr[43] = 0;
                arrayzoneradiomr[44] = 0;
                arrayzoneradiomr[45] = 0;
                arrayzoneradiomr[46] = 0;
                arrayzoneradiomr[47] = 0;
              }
              if (colonna86 != "00") {
                switch (colonna86bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 49 radiomr");
                    arrayzoneradiomr[48] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[48] = 0;
                    break;
                }
                switch (colonna86bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 50 radiomr");
                    arrayzoneradiomr[49] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[49] = 0;
                    break;
                }
                switch (colonna86bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 51 radiomr");
                    arrayzoneradiomr[50] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[50] = 0;
                    break;
                }
                switch (colonna86bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 52 radiomr");
                    arrayzoneradiomr[51] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[51] = 0;
                    break;
                }
                switch (colonna86bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 53 radiomr");
                    arrayzoneradiomr[52] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[52] = 0;
                    break;
                }
                switch (colonna86bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 54 radiomr");
                    arrayzoneradiomr[53] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[53] = 0;
                    break;
                }
                switch (colonna86bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 55 radiomr");
                    arrayzoneradiomr[54] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[54] = 0;
                    break;
                }
                switch (colonna86bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 56 radiomr");
                    arrayzoneradiomr[55] = 1;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                  case "0":
                    arrayzoneradiomr[55] = 0;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                }
              } else if (colonna86 == "00") {
                arrayzoneradiomr[48] = 0;
                arrayzoneradiomr[49] = 0;
                arrayzoneradiomr[50] = 0;
                arrayzoneradiomr[51] = 0;
                arrayzoneradiomr[52] = 0;
                arrayzoneradiomr[53] = 0;
                arrayzoneradiomr[54] = 0;
                arrayzoneradiomr[55] = 0;
              }
              if (colonna87 != "00") {
                switch (colonna87bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 57 radiomr");
                    arrayzoneradiomr[56] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[56] = 0;
                    break;
                }
                switch (colonna87bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 58 radiomr");
                    arrayzoneradiomr[57] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[57] = 0;
                    break;
                }
                switch (colonna87bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 59 radiomr");
                    arrayzoneradiomr[58] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[58] = 0;
                    break;
                }
                switch (colonna87bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 60 radiomr");
                    arrayzoneradiomr[59] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[59] = 0;
                    break;
                }
                switch (colonna87bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 61 radiomr");
                    arrayzoneradiomr[60] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[60] = 0;
                    break;
                }
                switch (colonna87bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 62 radiomr");
                    arrayzoneradiomr[61] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[61] = 0;
                    break;
                }
                switch (colonna87bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 63 radiomr");
                    arrayzoneradiomr[62] = 1;
                    break;
                  case "0":
                    arrayzoneradiomr[62] = 0;
                    break;
                }
                switch (colonna87bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 64 radiomr");
                    arrayzoneradiomr[63] = 1;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                  case "0":
                    arrayzoneradiomr[63] = 0;
                    console.log("arrayzoneradiomr", arrayzoneradiomr);
                    break;
                }
              } else if (colonna87 == "00") {
                arrayzoneradiomr[56] = 0;
                arrayzoneradiomr[57] = 0;
                arrayzoneradiomr[58] = 0;
                arrayzoneradiomr[59] = 0;
                arrayzoneradiomr[60] = 0;
                arrayzoneradiomr[61] = 0;
                arrayzoneradiomr[62] = 0;
                arrayzoneradiomr[63] = 0;
              }
              if (colonna88 != "00") {
                switch (colonna88bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 1 radiobatt");
                    arrayzoneradiobatt[0] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[0] = 0;
                    break;
                }
                switch (colonna88bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 2 radiobatt");
                    arrayzoneradiobatt[1] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[1] = 0;
                    break;
                }
                switch (colonna88bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 3 radiobatt");
                    arrayzoneradiobatt[2] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[2] = 0;
                    break;
                }
                switch (colonna88bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 4 radiobatt");
                    arrayzoneradiobatt[3] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[3] = 0;
                    break;
                }
                switch (colonna88bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 5 radiobatt");
                    arrayzoneradiobatt[4] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[4] = 0;
                    break;
                }
                switch (colonna88bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 6 radiobatt");
                    arrayzoneradiobatt[5] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[5] = 0;
                    break;
                }
                switch (colonna88bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 7 radiobatt");
                    arrayzoneradiobatt[6] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[6] = 0;
                    break;
                }
                switch (colonna88bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 8 radiobatt");
                    arrayzoneradiobatt[7] = 1;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                  case "0":
                    arrayzoneradiobatt[7] = 0;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                }
              } else if (colonna88 == "00") {
                arrayzoneradiobatt[0] = 0;
                arrayzoneradiobatt[1] = 0;
                arrayzoneradiobatt[2] = 0;
                arrayzoneradiobatt[3] = 0;
                arrayzoneradiobatt[4] = 0;
                arrayzoneradiobatt[5] = 0;
                arrayzoneradiobatt[6] = 0;
                arrayzoneradiobatt[7] = 0;
              }
              if (colonna89 != "00") {
                switch (colonna89bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 9 radiobatt");
                    arrayzoneradiobatt[8] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[8] = 0;
                    break;
                }
                switch (colonna89bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 10 radiobatt");
                    arrayzoneradiobatt[9] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[9] = 0;
                    break;
                }
                switch (colonna89bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 11 radiobatt");
                    arrayzoneradiobatt[10] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[10] = 0;
                    break;
                }
                switch (colonna89bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 12 radiobatt");
                    arrayzoneradiobatt[11] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[11] = 0;
                    break;
                }
                switch (colonna89bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 13 radiobatt");
                    arrayzoneradiobatt[12] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[12] = 0;
                    break;
                }
                switch (colonna89bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 14 radiobatt");
                    arrayzoneradiobatt[13] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[13] = 0;
                    break;
                }
                switch (colonna89bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 15 radiobatt");
                    arrayzoneradiobatt[14] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[14] = 0;
                    break;
                }
                switch (colonna89bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 16 radiobatt");
                    arrayzoneradiobatt[15] = 1;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                  case "0":
                    arrayzoneradiobatt[15] = 0;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                }
              } else if (colonna89 == "00") {
                arrayzoneradiobatt[8] = 0;
                arrayzoneradiobatt[9] = 0;
                arrayzoneradiobatt[10] = 0;
                arrayzoneradiobatt[11] = 0;
                arrayzoneradiobatt[12] = 0;
                arrayzoneradiobatt[13] = 0;
                arrayzoneradiobatt[14] = 0;
                arrayzoneradiobatt[15] = 0;
              }
              if (colonna90 != "00") {
                switch (colonna90bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 17 radiobatt");
                    arrayzoneradiobatt[16] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[16] = 0;
                    break;
                }
                switch (colonna90bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 18 radiobatt");
                    arrayzoneradiobatt[17] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[17] = 0;
                    break;
                }
                switch (colonna90bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 19 radiobatt");
                    arrayzoneradiobatt[18] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[18] = 0;
                    break;
                }
                switch (colonna90bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 20 radiobatt");
                    arrayzoneradiobatt[19] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[19] = 0;
                    break;
                }
                switch (colonna90bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 21 radiobatt");
                    arrayzoneradiobatt[20] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[20] = 0;
                    break;
                }
                switch (colonna90bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 22 radiobatt");
                    arrayzoneradiobatt[21] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[21] = 0;
                    break;
                }
                switch (colonna90bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 23 radiobatt");
                    arrayzoneradiobatt[22] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[22] = 0;
                    break;
                }
                switch (colonna90bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 24 radiobatt");
                    arrayzoneradiobatt[23] = 1;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                  case "0":
                    arrayzoneradiobatt[23] = 0;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                }
              } else if (colonna90 == "00") {
                arrayzoneradiobatt[16] = 0;
                arrayzoneradiobatt[17] = 0;
                arrayzoneradiobatt[18] = 0;
                arrayzoneradiobatt[19] = 0;
                arrayzoneradiobatt[20] = 0;
                arrayzoneradiobatt[21] = 0;
                arrayzoneradiobatt[22] = 0;
                arrayzoneradiobatt[23] = 0;
              }
              if (colonna91 != "00") {
                switch (colonna91bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 25 radiobatt");
                    arrayzoneradiobatt[24] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[24] = 0;
                    break;
                }
                switch (colonna91bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 26 radiobatt");
                    arrayzoneradiobatt[25] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[25] = 0;
                    break;
                }
                switch (colonna91bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 27 radiobatt");
                    arrayzoneradiobatt[26] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[26] = 0;
                    break;
                }
                switch (colonna91bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 28 radiobatt");
                    arrayzoneradiobatt[27] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[27] = 0;
                    break;
                }
                switch (colonna91bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 29 radiobatt");
                    arrayzoneradiobatt[28] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[28] = 0;
                    break;
                }
                switch (colonna91bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 30 radiobatt");
                    arrayzoneradiobatt[29] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[29] = 0;
                    break;
                }
                switch (colonna91bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 31 radiobatt");
                    arrayzoneradiobatt[30] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[30] = 0;
                    break;
                }
                switch (colonna91bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 32 radiobatt");
                    arrayzoneradiobatt[31] = 1;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                  case "0":
                    arrayzoneradiobatt[31] = 0;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                }
              } else if (colonna91 == "00") {
                arrayzoneradiobatt[24] = 0;
                arrayzoneradiobatt[25] = 0;
                arrayzoneradiobatt[26] = 0;
                arrayzoneradiobatt[27] = 0;
                arrayzoneradiobatt[28] = 0;
                arrayzoneradiobatt[29] = 0;
                arrayzoneradiobatt[30] = 0;
                arrayzoneradiobatt[31] = 0;
              }
              if (colonna92 != "00") {
                switch (colonna92bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 33 radiobatt");
                    arrayzoneradiobatt[32] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[32] = 0;
                    break;
                }
                switch (colonna92bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 34 radiobatt");
                    arrayzoneradiobatt[33] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[33] = 0;
                    break;
                }
                switch (colonna92bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 35 radiobatt");
                    arrayzoneradiobatt[34] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[34] = 0;
                    break;
                }
                switch (colonna92bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 36 radiobatt");
                    arrayzoneradiobatt[35] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[35] = 0;
                    break;
                }
                switch (colonna92bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 37 radiobatt");
                    arrayzoneradiobatt[36] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[36] = 0;
                    break;
                }
                switch (colonna92bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 38 radiobatt");
                    arrayzoneradiobatt[37] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[37] = 0;
                    break;
                }
                switch (colonna92bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 39 radiobatt");
                    arrayzoneradiobatt[38] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[38] = 0;
                    break;
                }
                switch (colonna92bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 40 radiobatt");
                    arrayzoneradiobatt[39] = 1;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                  case "0":
                    arrayzoneradiobatt[39] = 0;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                }
              } else if (colonna92 == "00") {
                arrayzoneradiobatt[32] = 0;
                arrayzoneradiobatt[33] = 0;
                arrayzoneradiobatt[34] = 0;
                arrayzoneradiobatt[35] = 0;
                arrayzoneradiobatt[36] = 0;
                arrayzoneradiobatt[37] = 0;
                arrayzoneradiobatt[38] = 0;
                arrayzoneradiobatt[39] = 0;
              }
              if (colonna93 != "00") {
                switch (colonna93bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 41 radiobatt");
                    arrayzoneradiobatt[40] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[40] = 0;
                    break;
                }
                switch (colonna93bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 42 radiobatt");
                    arrayzoneradiobatt[41] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[41] = 0;
                    break;
                }
                switch (colonna93bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 43 radiobatt");
                    arrayzoneradiobatt[42] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[42] = 0;
                    break;
                }
                switch (colonna93bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 44 radiobatt");
                    arrayzoneradiobatt[43] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[43] = 0;
                    break;
                }
                switch (colonna93bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 45 radiobatt");
                    arrayzoneradiobatt[44] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[44] = 0;
                    break;
                }
                switch (colonna93bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 46 radiobatt");
                    arrayzoneradiobatt[45] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[45] = 0;
                    break;
                }
                switch (colonna93bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 47 radiobatt");
                    arrayzoneradiobatt[46] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[46] = 0;
                    break;
                }
                switch (colonna93bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 48 radiobatt");
                    arrayzoneradiobatt[47] = 1;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                  case "0":
                    arrayzoneradiobatt[47] = 0;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                }
              } else if (colonna93 == "00") {
                arrayzoneradiobatt[40] = 0;
                arrayzoneradiobatt[41] = 0;
                arrayzoneradiobatt[42] = 0;
                arrayzoneradiobatt[43] = 0;
                arrayzoneradiobatt[44] = 0;
                arrayzoneradiobatt[45] = 0;
                arrayzoneradiobatt[46] = 0;
                arrayzoneradiobatt[47] = 0;
              }
              if (colonna94 != "00") {
                switch (colonna94bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 49 radiobatt");
                    arrayzoneradiobatt[48] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[48] = 0;
                    break;
                }
                switch (colonna94bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 50 radiobatt");
                    arrayzoneradiobatt[49] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[49] = 0;
                    break;
                }
                switch (colonna94bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 51 radiobatt");
                    arrayzoneradiobatt[50] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[50] = 0;
                    break;
                }
                switch (colonna94bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 52 radiobatt");
                    arrayzoneradiobatt[51] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[51] = 0;
                    break;
                }
                switch (colonna94bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 53 radiobatt");
                    arrayzoneradiobatt[52] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[52] = 0;
                    break;
                }
                switch (colonna94bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 54 radiobatt");
                    arrayzoneradiobatt[53] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[53] = 0;
                    break;
                }
                switch (colonna94bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 55 radiobatt");
                    arrayzoneradiobatt[54] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[54] = 0;
                    break;
                }
                switch (colonna94bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 56 radiobatt");
                    arrayzoneradiobatt[55] = 1;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                  case "0":
                    arrayzoneradiobatt[55] = 0;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                }
              } else if (colonna94 == "00") {
                arrayzoneradiobatt[48] = 0;
                arrayzoneradiobatt[49] = 0;
                arrayzoneradiobatt[50] = 0;
                arrayzoneradiobatt[51] = 0;
                arrayzoneradiobatt[52] = 0;
                arrayzoneradiobatt[53] = 0;
                arrayzoneradiobatt[54] = 0;
                arrayzoneradiobatt[55] = 0;
              }
              if (colonna95 != "00") {
                switch (colonna95bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 57 radiobatt");
                    arrayzoneradiobatt[56] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[56] = 0;
                    break;
                }
                switch (colonna95bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 58 radiobatt");
                    arrayzoneradiobatt[57] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[57] = 0;
                    break;
                }
                switch (colonna95bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 59 radiobatt");
                    arrayzoneradiobatt[58] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[58] = 0;
                    break;
                }
                switch (colonna95bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 60 radiobatt");
                    arrayzoneradiobatt[59] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[59] = 0;
                    break;
                }
                switch (colonna95bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 61 radiobatt");
                    arrayzoneradiobatt[60] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[60] = 0;
                    break;
                }
                switch (colonna95bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 62 radiobatt");
                    arrayzoneradiobatt[61] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[61] = 0;
                    break;
                }
                switch (colonna95bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 63 radiobatt");
                    arrayzoneradiobatt[62] = 1;
                    break;
                  case "0":
                    arrayzoneradiobatt[62] = 0;
                    break;
                }
                switch (colonna95bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 64 radiobatt");
                    arrayzoneradiobatt[63] = 1;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                  case "0":
                    arrayzoneradiobatt[63] = 0;
                    console.log("arrayzoneradiobatt", arrayzoneradiobatt);
                    break;
                }
              } else if (colonna95 == "00") {
                arrayzoneradiobatt[56] = 0;
                arrayzoneradiobatt[57] = 0;
                arrayzoneradiobatt[58] = 0;
                arrayzoneradiobatt[59] = 0;
                arrayzoneradiobatt[60] = 0;
                arrayzoneradiobatt[61] = 0;
                arrayzoneradiobatt[62] = 0;
                arrayzoneradiobatt[63] = 0;
              }
              if (colonna96 != "00") {
                switch (colonna96bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 1 telecombatt");
                    arraytelecombatt[0] = 1;
                    break;
                  case "0":
                    arraytelecombatt[0] = 0;
                    break;
                }
                switch (colonna96bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 2 telecombatt");
                    arraytelecombatt[1] = 1;
                    break;
                  case "0":
                    arraytelecombatt[1] = 0;
                    break;
                }
                switch (colonna96bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 3 telecombatt");
                    arraytelecombatt[2] = 1;
                    break;
                  case "0":
                    arraytelecombatt[2] = 0;
                    break;
                }
                switch (colonna96bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 4 telecombatt");
                    arraytelecombatt[3] = 1;
                    break;
                  case "0":
                    arraytelecombatt[3] = 0;
                    break;
                }
                switch (colonna96bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 5 telecombatt");
                    arraytelecombatt[4] = 1;
                    break;
                  case "0":
                    arraytelecombatt[4] = 0;
                    break;
                }
                switch (colonna96bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 6 telecombatt");
                    arraytelecombatt[5] = 1;
                    break;
                  case "0":
                    arraytelecombatt[5] = 0;
                    break;
                }
                switch (colonna96bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 7 telecombatt");
                    arraytelecombatt[6] = 1;
                    break;
                  case "0":
                    arraytelecombatt[6] = 0;
                    break;
                }
                switch (colonna96bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 8 telecombatt");
                    arraytelecombatt[7] = 1;
                    console.log("arraytelecombatt", arraytelecombatt);
                    break;
                  case "0":
                    arraytelecombatt[7] = 0;
                    console.log("arraytelecombatt", arraytelecombatt);
                    break;
                }
              } else if (colonna96 == "00") {
                arraytelecombatt[0] = 0;
                arraytelecombatt[1] = 0;
                arraytelecombatt[2] = 0;
                arraytelecombatt[3] = 0;
                arraytelecombatt[4] = 0;
                arraytelecombatt[5] = 0;
                arraytelecombatt[6] = 0;
                arraytelecombatt[7] = 0;
              }
              if (colonna97 != "00") {
                switch (colonna97bin.slice(7, 8)) {
                  case "1":
                    console.log("zona 9 telecombatt");
                    arraytelecombatt[8] = 1;
                    break;
                  case "0":
                    arraytelecombatt[8] = 0;
                    break;
                }
                switch (colonna97bin.slice(6, 7)) {
                  case "1":
                    console.log("zona 10 telecombatt");
                    arraytelecombatt[9] = 1;
                    break;
                  case "0":
                    arraytelecombatt[9] = 0;
                    break;
                }
                switch (colonna97bin.slice(5, 6)) {
                  case "1":
                    console.log("zona 11 telecombatt");
                    arraytelecombatt[10] = 1;
                    break;
                  case "0":
                    arraytelecombatt[10] = 0;
                    break;
                }
                switch (colonna97bin.slice(4, 5)) {
                  case "1":
                    console.log("zona 12 telecombatt");
                    arraytelecombatt[11] = 1;
                    break;
                  case "0":
                    arraytelecombatt[11] = 0;
                    break;
                }
                switch (colonna97bin.slice(3, 4)) {
                  case "1":
                    console.log("zona 13 telecombatt");
                    arraytelecombatt[12] = 1;
                    break;
                  case "0":
                    arraytelecombatt[12] = 0;
                    break;
                }
                switch (colonna97bin.slice(2, 3)) {
                  case "1":
                    console.log("zona 14 telecombatt");
                    arraytelecombatt[13] = 1;
                    break;
                  case "0":
                    arraytelecombatt[13] = 0;
                    break;
                }
                switch (colonna97bin.slice(1, 2)) {
                  case "1":
                    console.log("zona 15 telecombatt");
                    arraytelecombatt[14] = 1;
                    break;
                  case "0":
                    arraytelecombatt[14] = 0;
                    break;
                }
                switch (colonna96bin.slice(0, 1)) {
                  case "1":
                    console.log("zona 16 telecombatt");
                    arraytelecombatt[15] = 1;
                    console.log("arraytelecombatt", arraytelecombatt);
                    break;
                  case "0":
                    arraytelecombatt[15] = 0;
                    console.log("arraytelecombatt", arraytelecombatt);
                    break;
                }
              } else if (colonna97 == "00") {
                arraytelecombatt[8] = 0;
                arraytelecombatt[9] = 0;
                arraytelecombatt[10] = 0;
                arraytelecombatt[11] = 0;
                arraytelecombatt[12] = 0;
                arraytelecombatt[13] = 0;
                arraytelecombatt[14] = 0;
                arraytelecombatt[15] = 0;
              }
            }
          }
          if (payload == "02") {
            var colonna10 = bufferino.slice(18, 20);
            var colonna11 = bufferino.slice(20, 22);
            var colonna12 = bufferino.slice(22, 24);
            var colonna13 = bufferino.slice(24, 26);
            var colonna16 = bufferino.slice(30, 32);
            var colonna10bin = hex2bin(colonna10);
            var colonna11bin = hex2bin(colonna11);
            var colonna12bin = hex2bin(colonna12);
            var colonna13bin = hex2bin(colonna13);
            var risultato;
            if (colonna10 != "00") {
              switch (colonna10bin) {
                case "10000000":
                  risultato = "uscita 8 abilitata";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "uscita 7 abilitata";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "uscita 6 abilitata";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "uscita 5 abilitata";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "uscita 4 abilitata";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "uscita 3 abilitata";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "uscita 2 abilitata";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "uscita 1 abilitata";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna11 != "00") {
              switch (colonna11bin) {
                case "10000000":
                  risultato = "uscita 16 abilitata";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "uscita 15 abilitata";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "uscita 14 abilitata";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "uscita 13 abilitata";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "uscita 12 abilitata";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "uscita 11 abilitata";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "uscita 10 abilitata";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "uscita 9 abilitata";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna12 != "00") {
              switch (colonna12bin) {
                case "10000000":
                  risultato = "uscita 8 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "uscita 7 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "uscita 6 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "uscita 5 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "uscita 4 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "uscita 3 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "uscita 2 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "uscita 1 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna13 != "00") {
              switch (colonna13bin) {
                case "10000000":
                  risultato =
                    "uscita 16 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato =
                    "uscita 15 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato =
                    "uscita 14 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato =
                    "uscita 13 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato =
                    "uscita 12 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato =
                    "uscita 11 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato =
                    "uscita 10 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "uscita 9 con funzionamento manuale o da squillo";
                  console.log(risultato);
                  break;
              }
            }
            if (colonna16 != "00") {
              switch (colonna16bin) {
                case "10000000":
                  risultato = "zona 8 abilitata";
                  console.log(risultato);
                  break;
                case "01000000":
                  risultato = "zona 7 abilitata";
                  console.log(risultato);
                  break;
                case "00100000":
                  risultato = "zona 6 abilitata";
                  console.log(risultato);
                  break;
                case "00010000":
                  risultato = "zona 5 abilitata";
                  console.log(risultato);
                  break;
                case "00001000":
                  risultato = "zona 4 abilitata";
                  console.log(risultato);
                  break;
                case "00000100":
                  risultato = "zona 3 abilitata";
                  console.log(risultato);
                  break;
                case "00000010":
                  risultato = "zona 2 abilitata";
                  console.log(risultato);
                  break;
                case "00000001":
                  risultato = "zona 1 abilitata";
                  console.log(risultato);
                  break;
              }
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
            console.log("non inserito perché aperto:",colonna6bin)
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
            if (colonna5 != "00") {
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
              }else if (colonna5bin.slice(5, 6) == 0) {
                areeInserite[2] = 0;
              }
              if (colonna5bin.slice(4, 5) == 1) {
                risultato = "area 4 appena inserita";
                areeInserite[3] = 1;
              }else if (colonna5bin.slice(4, 5) == 0) {
                risultato = "area 4 appena inserita";
                areeInserite[3] = 0;
              }
            }
            if (colonna6 != "00") {
              if (colonna6bin.slice(7, 8) == 1) {
                risultato = "area 1 non inserita perchè aperta";
                areeNonInserite[0] = 1;
              } else if (colonna6bin.slice(7, 8) == 0) {
                areeNonInserite[0] = 0;
              }
              if (colonna6bin.slice(6, 7) == 1) {
                risultato = "area 2 non inserita perché aperta";
                areeNonInserite[1] = 1;
              }else if (colonna6bin.slice(6, 7) == 0) {
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
              }else if (colonna6bin.slice(4, 5) == 0) {
                risultato = "area 4 non inserita perché aperta";
                areeNonInserite[3] = 0;
              }
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
            console.log("areeInserite:",areeInserite)
            function riempiEsito(
              areeInserite,
              areeNonInserite,
              areeReset,
              motivazione,
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
              motivazione,
            );
            exports.esito = esito;
            server.mandaEsito();
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
function mandaEsito() {
  exports.esito = esito;
}
exports.entrata = entrata;
exports.port = port;
exports.esito = esito;
