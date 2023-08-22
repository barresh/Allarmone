const { SerialPort } = require("serialport");
const port = new SerialPort({
  path: "/dev/tty",
  baudRate: 57600,
});

exports.port = port;
