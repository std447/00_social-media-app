// const http = require('node:http');
// const httpserv = http.createServer().listen(3000)
console.log("hare")
const server = require('node:http').createServer().listen(3000);
const io = require('socket.io')(server,{
    cors: {
        origin:"http:localhost:3000/socket.io",
        cors:true,
    }
});

io.on('connection', socket => {
    socket.emit('chat-message', 'Hello')
});


