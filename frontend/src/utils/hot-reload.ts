import consumer from './consumer';

consumer.subscriptions.create('HotReloadChannel', {
  connected() {
    console.log('Connected to HotReloadChannel');
  },
  disconnected() {
    console.log('Disconnected from HotReloadChannel');
  },
  received(data) {
    console.log('Received data from HotReloadChannel:', data);
    this.updateDom();
  },

  updateDom() {
    // Handle the hot reload logic here
    window.location.reload();
  },
});
