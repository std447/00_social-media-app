const socket = io('http://localhost:3000');

const msgFrom = document.getElementById('send-container');
const msgInput = document.getElementById('message-input');
const msgDisplay = document.getElementById('message-display');

const _name = prompt('Enter your Name');
appendMsg(`Welcome ${_name}`);
socket.emit('new-user', _name); 

socket.on('user-connected', _name =>{
    appendMsg(`${_name} Joined`);
})

socket.on('user-disconnected', _name =>{
    appendMsg(`${_name} left`);
})


socket.on('chat-message', data => {
    appendMsg(`${data._name}: ${data.message}`);
})

msgFrom.addEventListener('submit', e =>{
    e.preventDefault();
    const msg = msgInput.value;
    appendMsg(`You: ${msg}`)
    socket.emit('send-chat-msg',msg);
    msgInput.value = '';

})


function appendMsg(message){
    const msgElem  = document.createElement('div');
    msgElem.innerText = message;
    msgDisplay.append(msgElem);

}