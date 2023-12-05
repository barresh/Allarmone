// const { SerialPort } = require("serialport");
// const port = new SerialPort({
//   path: "/dev/ttyACM0",
//   baudRate: 57600,
// });

const { BluetoothSerialPort } = require("bluetooth-serial-port");
const port = new BluetoothSerialPort();

const address = "F4:F3:09:3E:2B:AB"; // Sostituisci con l'indirizzo Bluetooth del dispositivo di destinazione

bluetoothSerial.connect(address, 1, function () {
  console.log("Connesso con successo al dispositivo Bluetooth");

  // Ora puoi utilizzare `bluetoothSerial` per la comunicazione Bluetooth

  // Esempio di invio di dati
  bluetoothSerial.write(
    new Buffer("Hello, Bluetooth!"),
    function (err, bytesWritten) {
      if (err) console.log("Errore durante l'invio dei dati:", err);
      else
        console.log(
          "Dati inviati correttamente. Numero di byte scritti:",
          bytesWritten
        );
    }
  );

  // Esempio di ricezione di dati
  bluetoothSerial.on("data", function (buffer) {
    console.log("Dati ricevuti:", buffer.toString("utf-8"));
  });
});

// Gestisci eventi di disconnessione
bluetoothSerial.on("closed", function () {
  console.log("Connessione Bluetooth chiusa");
});
exports.port = port;
