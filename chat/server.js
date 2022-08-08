const server = require('node:http').createServer().listen(3000,e=> console.log(e?`Error: ${e}`:`Connected on localhost:3000`));
const io = require('socket.io')(server,{
    cors:true,
    origin:"http://localhost:3000",
    }
)

const activeUsers = {};

io.on("connect", socket =>{
    // socket.emit('chat-message','hello');
    socket.on('new-user',_name=>{
        activeUsers[socket.id] = _name;
        socket.broadcast.emit('user-connected', _name);
    })
    socket.on('send-chat-msg', message =>{
        socket.broadcast.emit('chat-message',{message:message,_name:activeUsers[socket.id]}); 
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected', activeUsers[socket.id])
        delete activeUsers[socket.id];
    })

})

