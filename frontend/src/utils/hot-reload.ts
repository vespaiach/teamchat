import consumer from './consumer';

consumer.subscriptions.create('DevelopmentChannel', {
  connected() {
    console.log('Connected to DevelopmentChannel');
  },
  disconnected() {
    console.log('Disconnected from DevelopmentChannel');
  },
  received(data) {
    console.log('Received data from DevelopmentChannel:', data);
    
    // Handle the hot reload logic here
    if (data.event === 'assets_updated') {
      console.log('Assets updated, reloading page...');
      // window.location.reload();
    }
  },
});
