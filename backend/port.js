const { SerialPort } = require("serialport");
const port = new SerialPort({
  path: "/dev/ttyACM0",
  baudRate: 57600,
});

exports.port = port;
