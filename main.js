var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

var messages = [{  
  author: "Cristóforo",
  text: "Hola Mundo :3",
}];

app.use(express.static('public'));

let coneixones = 0;

io.on('connection', function(socket) {
    coneixones++;
    if(coneixones < 3){
      console.log('Alguien se ha conectado ');
      console.log(coneixones);
      socket.emit('messages', messages);
      socket.on('new-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
      });
    }
    else{

    }
});

server.listen(8080, function() {  
  console.log("Servidor corriendo en http://localhost:8080");
});