import consumer from 'channels/consumer'

export const chatChannel = consumer.subscriptions.create('ChatChannel', {
  connected() {
    console.log('Connected to ChatChannel')
  },

  disconnected() {
    console.log('Disconnected from ChatChannel')
  },

  sendChat(message, room_id, recipient_id = null) {
    this.perform('send_chat', { message, room_id, recipient_id })
  },

  loadChatHistories(last_seen_chat_id, room_id) {
    this.perform('load_chat_histories', { last_seen_chat_id, room_id })
  }
})

export default chatChannel
