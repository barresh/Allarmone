const { SerialPort } = require("serialport");
const port = new SerialPort({
  path: "/dev/cu.usbmodem20603763594B1",
  baudRate: 57600,
});

exports.port = port;
