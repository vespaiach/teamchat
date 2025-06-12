export function scrollToLastChat() {
  const chatsContainer = document.getElementById('chats-container');
  if (chatsContainer) {
    chatsContainer.scrollTo({ top: chatsContainer.scrollHeight, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}
