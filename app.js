const http = require('http');
const server = http.createServer();
const fs = require('fs');
const socketio = require('socket.io');
const port = 3000;

server.on('request',function(req,res){

  fs.readFile(__dirname + '/client/index.html','utf8',function(err,data){
    if(err){
      res.writeHead(404,{'content-Type':'text/plain'});
      res.write('page not found!!!');
      res.end();
    }
    res.writeHead(200,{'content-Type':'text/html'});
    res.write(data);
    res.end();
  });
});
server.listen(port,function(){
  console.log('server running on port' + port);
});


const io = socketio.listen(server);
io.sockets.on('connection',function(socket){
  console.log(socket);
    socket.on('message',function(data){
      console.log(data.value);
      socket.emit('from_server',{value: data.value});
    });
});
