const { SerialPort } = require('serialport');
const { ReadlineParser} = require('@serialport/parser-readline');
const parser= new  ReadlineParser({ delimiter: '\r\n' });
const config = {
    path: 'COM5',
    baudRate: 57600,
    dataBits: 8,
    parity: 'none',
    stopBits: '1',
    autoOpen: false,
    rtscts: true,
};
const port = new SerialPort(config);


module.exports = {
    port: port,
    parser: parser
}