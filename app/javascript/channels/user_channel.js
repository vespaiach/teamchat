import consumer from 'channels/consumer'

export const userChannel = consumer.subscriptions.create('UserChannel', {
  connected() {
    console.log('Connected to UserChannel')
  },

  disconnected() {
    console.log('Disconnected from UserChannel')
  },

  sendMessage(message, room_id, recipient_id = null) {
    this.perform('send_message', { message, room_id, recipient_id })
  }
})

export default userChannel
