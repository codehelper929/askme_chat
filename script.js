let messages = [];

const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  addMessage('user', userMessage);
  messages.push({ role: 'user', content: userMessage });
  messageInput.value = '';

  puter.ai.chat(messages, { model: 'gpt-5-nano' })
    .then(botMessage => {
      addMessage('bot', botMessage);
      messages.push({ role: 'assistant', content: botMessage });
    })
    .catch(error => {
      console.error('Error:', error);
      addMessage('bot', 'Sorry, there was an error processing your request.');
    });
}

function addMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}