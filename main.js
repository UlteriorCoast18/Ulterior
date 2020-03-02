var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);

var messages = [{  
  id: 1,
  text: "CHAT",
}];

app.use(express.static('public'));
// el socket escuchar� el evento new-message y los traera
// en data con el m�todo push
// para notificar a los clientes
// para conectar en privado socket.emit
// pero como es una sala de chat entonces
//io.sockets.emit 

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