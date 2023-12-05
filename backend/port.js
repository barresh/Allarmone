// const { SerialPort } = require("serialport");
// const port = new SerialPort({
//   path: "/dev/ttyACM0",
//   baudRate: 57600,
// });
const a6 = require("./A6");
const port = require("bluetooth-serial");

const address = "00:80:E1:27:B3:CF"; // Sostituisci con l'indirizzo Bluetooth del dispositivo di destinazione
exports.port = port;
