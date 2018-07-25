const mongodb = require('mongodb');
const client = require('socket.io').listen(4000).sockets;

mongodb.MongoClient.connect('mongodb://127.0.0.1/mongochat', function(err, db){
  if(err){
    console.log(err);
  };

  console.log('Conectado a mongoDB');

  //Conexion socket
  client.on('connection', function (socket){
    let chat = db.collection('chats');

    //enviar status
    sendStatus = function(s){
      socket.emit('status', s);
    }

    //obtener chats
    chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
      if(err){
        throw err;
      }
      //emitir Mensaje
      socket.emit('output', res);
    });
    // input event
    socket.on('input', function(data){
      let name = data.name;
      let message = data.message;

      //check nombre y Mensaje
      if(name == '' || message == ''){
        sendStatus('Please enter a name and message')
      }else{
        //insert messages
        chat.insert({name: name, message: message}, function(){
          client.emit('output', [data]);

          // send status object
          sendStatus({
            message: 'Mensaje enviado',
            clear: true
          });
        });
      };
    });

    socket.on('clear', function(data){
      //remove all chats
      chat.remove({}, function(){
        socket.emit('cleared');
      });
    });
  });
});
