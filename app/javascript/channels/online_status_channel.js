import consumer from 'channels/consumer'

export const onlineStatusChannel = consumer.subscriptions.create('OnlineStatusChannel', {
  connected() {
    console.log('Connected to OnlineStatusChannel')
    this.startPinging()
  },

  disconnected() {
    console.log('Disconnected from OnlineStatusChannel')
    if (this.pingInterval) {
      clearInterval(this.pingInterval)
    }
  },

  received(data) {
    const chatContainerElement = document.getElementById('chats-container')

    if (!chatContainerElement)  return
    chatContainerElement.querySelectorAll('[data-avatar]').forEach((element) => {
      const userId = element.dataset['avatar']
      if (data[userId]) {
        element.classList.add('online')
      } else {
        element.classList.remove('online')
      }
    })
  },

  startPinging() {
    this.pingInterval = setInterval(() => {
      this.perform("ping")
    }, 5000)
  }
})

export default onlineStatusChannel
