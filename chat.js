const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const client = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind({address:'localhost', port:41234});

const message = Buffer.from("{message: 'hello'}");

client.send(message, 41234, 'localhost', (err) => {
  client.close();
});