// const { SerialPort } = require("serialport");
// const port = new SerialPort({
//   path: "/dev/ttyACM0",
//   baudRate: 57600,
// });
const a6 = require("./A6");
const { BluetoothSerialPort } = require("bluetooth-serial-port");
const port = new BluetoothSerialPort();

const address = "00:80:E1:27:B3:CF"; // Sostituisci con l'indirizzo Bluetooth del dispositivo di destinazione
exports.port = port;
port.connect(address, 1, function () {
  a6.entrata;
  console.log("Connesso con successo al dispositivo Bluetooth");
});
