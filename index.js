var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
let userList = {};

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', (socket) => {
  socket.on('user joined', (user) => {
    socket.user = user;
    userList[user] = user;

    const serverWelcome = { user: 'SERVER', chat_msg: 'You have joined the chat room.'};

    socket.emit('chat message', serverWelcome);
    socket.broadcast.emit('user joined', user);

    io.sockets.emit('user list', userList);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    delete userList[socket.user];
    io.sockets.emit('user list', userList);
    socket.broadcast.emit('sign off', socket.user);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
