var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { SerialPort } = require('serialport');
const { ReadlineParser} = require('@serialport/parser-readline');
const parser= new  ReadlineParser({ delimiter: '\r\n', length: 21 });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var managerRouter = require('./routes/manager.router');
var partData = require('./routes/partData');
var checkSheet = require('./routes/checkSheet');
var measuare = require('./routes/measuare');
var measuarePart = require('./routes/measuarePart');
var toolrouter = require('./routes/tool.router');
var partchildrouter = require('./routes/partchild.router');
var acheckpointrouter = require('./routes/aCheckPoint.router');
var bcheckpointrouter = require('./routes/bCheckpoint.router');
var {port_config } = require('./serialport');
var app = express();

//socket.io

var http = require('http').createServer(app);
var server = http.listen(3000, "0.0.0.0", () => { //Khởi động máy chủ, nghe trên cổng 4000. 
  console.log("Đang nghe yêu cầu trên cổng 3000..."); 
}) 

var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var bodyPaser = require('body-parser');
app.use(bodyPaser.json());

//session
  var session = require('express-session');
  app.use(session({
  secret : 'webslesson',
  resave : true,
  saveUninitialized : true
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manager',managerRouter);
app.use('/partData',partData);
app.use('/checkSheet', checkSheet);
app.use('/measuare', measuare);
app.use('/measuare/measuarePart', measuarePart);
app.use('/tool', toolrouter);
app.use('/partData/:id', partchildrouter);
app.use('/partData/acheckpoint', acheckpointrouter);
app.use('/partData/bcheckpoint', bcheckpointrouter);
// app.use('/manager',stdRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', function(socket){
  
});


//connect to device
var connectDevice = function(){
  const port = new SerialPort(port_config);
  port.open((err)=>{
      if(err){       
        reconnect();
  
      }
      
  })
  port.on('close', function(err){

    reconnect();
  });
  port.on('data', function (data){
    comstatus = true;
    setTimeout(function(){
      // console.log(data.toString());
      // console.log(data.length);
      //io.sockets.emit('value' , {data : data.toString()});
    }, 500);
    console.log(data.toString());
    console.log(data.length);
    // io.sockets.emit('value' , {data : data.toString()});
    io.sockets.emit('value' , {data : data.toString()});   
  });      
}
  connectDevice(); 

  //function reconnect to device 
  function reconnect(){

    
  setTimeout(function(){
    
    connectDevice();
  }, 2000);
  }  
  
 
 
// port.pipe(parser);
    
 
   
    
   
  




    




 


module.exports = app;
