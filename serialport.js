const { SerialPort } = require('serialport');
const { ReadlineParser} = require('@serialport/parser-readline');
const parser= new  ReadlineParser({ delimiter: '\r\n', length: 21 });

const config = {
    path: 'COM5',
    baudRate: 57600,
    dataBits: 8,
    parity: 'none',
    stopBits: '1',
    autoOpen: false,
    rtscts: true,
};
// const port = new SerialPort(config);

// port.open((err)=>{
//     if(err) {
//         console.log('error: '+ err.message);
//     }
//   });
// var port = new SerialPort(config);
// function connect_device(){
//     port = new SerialPort(config);
//     port.open((err)=>{
//     if (err) {
    
//         return console.log('Error: ', err.message);
//     }
//     console.log('message written')
// });
// } 



module.exports = {
    port_config: config,
    
    parser: parser
}