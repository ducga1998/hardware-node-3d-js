var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var numberPort = process.env.PORT || 3001;
// var asyncPort = require('./serialPort')
var SerialPort = require('serialport');
const fs = require('fs')
const dev = '/dev/cu.usbmodem14101'
let port

fs.watchFile(dev, () => {
  const connected = fs.existsSync(dev)
  if (connected) {
    console.log('connected')
    port = new SerialPort(dev, {
      baudRate: 115200
    })
    port.on('data', (buf) => {
      io.sockets.emit('testIot', buf.toString())
    })
  } else {
    console.log('disconnected')
  }
});
// const port = await asyncPort
// if (port) {
//   port.on('data', (data) => {

//     // console.log(data.toString())
//     io.sockets.emit('testIot', data.toString())
//   })
// }

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/view/index.html');
});

http.listen(numberPort, function () {
  console.log('listening on *:' + numberPort);
});







