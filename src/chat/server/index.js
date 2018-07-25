const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


app.use(express.static('client'));

var messages = [{
  id: 1,
  text: 'Bienvenido',
  nickname: 'Bot - Frank'
}]

io.on('connection', function(socket){
  console.log('El equipo: '+socket.handshake.address+' se ha conectado.');

  socket.emit('messages', messages);

  socket.on('add-message', function(data){
    messages.push(data);

    io.sockets.emit('messages', messages);
  });


});

server.listen(6677, function(){
  console.log('Servidor esta funcionando en http://localhost:6677');
});
