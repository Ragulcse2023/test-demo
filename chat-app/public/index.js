const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', (event) => {
  console.log('Connected to the server.');
});

socket.addEventListener('message', (event) => {
  // Handle incoming messages
  const message = JSON.parse(event.data);
  console.log('Received message:', message);

  // Display messages in the chat interface
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  if (message.type === 'private') {
    messageElement.innerHTML = `<span class="private-message">${message.sender} (private): ${message.content}</span>`;
  } else {
    messageElement.textContent = `${message.username}: ${message.content}`;
  }
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

document.addEventListener('DOMContentLoaded', () => {
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const privateMessageInput = document.getElementById('privateMessageInput');

  sendButton.addEventListener('click', () => {
    const message = messageInput.value;

    // Check if the message is a private message
    if (message.startsWith('@')) {
      const recipient = message.split(' ')[0].substring(1);
      const privateMessage = {
        type: 'private',
        recipient,
        content: message.substring(recipient.length + 2),
      };
      socket.send(JSON.stringify(privateMessage));
    } else {
      const publicMessage = {
        type: 'message',
        content: message,
      };
      socket.send(JSON.stringify(publicMessage));
    }

    messageInput.value = '';
  });
});
