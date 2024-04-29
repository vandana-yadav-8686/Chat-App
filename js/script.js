const socket = io('http://localhost:8000');

const form = document.getElementById('send-data');
const message_input = document.getElementById('input-data');
const messageContainer = document.querySelector('.msger-chat');
var audio = new Audio('ting.mp3');


// Create a new Date object
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const formattedTime = `${hours}:${minutes}`;
const append = (name, message, position) => {
    // Create a new message bubble element
    const messageElement = document.createElement('div');
    messageElement.classList.add('msg-bubble');
    messageElement.classList.add(position); // Add the position class to the message bubble

    // Create the inner HTML for the message bubble
    messageElement.innerHTML = `
        <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formattedTime}</div>
        </div>
        <div class="msg-text">
            ${message}
        </div>
    `;

    // Append the message bubble to the message container
    messageContainer.appendChild(messageElement);

    if (position == 'left') {
        audio.play();
    }
}

//click on submit button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = message_input.value;
    append('You', message, 'right');
    socket.emit('send', message);
    message_input.value = ''; // Corrected line to clear the input field
})
const userName = prompt("Enter your name");
socket.emit('new-user-join', userName);

socket.on('user-joined', data => {
    append(data, 'joined the chat', 'right');
});

socket.on('receive', data => {
    append(data.name, data.message, 'left');
});

socket.on('leave', data => {
    append(data, 'left the chat', 'left');
});
