import consumer from 'channels/consumer'

export const onlineStatusChannel = consumer.subscriptions.create('OnlineStatusChannel', {
  connected() {
    console.log('Connected to OnlineStatusChannel')
    this.startPinging()
  },

  disconnected() {
    console.log('Disconnected from OnlineStatusChannel')
  },

  received(data) {
    console.log('Received data:', data)
    document.querySelectorAll(`[data-avatar="${data.user_id}"]`).forEach((element) => {
      if (data.online) {
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
