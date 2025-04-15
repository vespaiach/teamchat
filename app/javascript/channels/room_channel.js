import consumer from "channels/consumer"

const callbacks = {
  connected: [],
  disconnected: [],
  received: []
};

const roomSubscription = consumer.subscriptions.create("RoomChannel", {
  connected() {
    callbacks.connected.forEach(callback => callback());
  },

  disconnected() {
    callbacks.disconnected.forEach(callback => callback());
  },

  received(data) {
    callbacks.received.forEach(callback => callback(data));
  },

  handleError(error) {
    console.error("Error:", error);
  },

  chat(message) {
    this.perform('chat', { message });
  }
});

export const startListenTo = (name, callback) => {
  if (callbacks[name]) {
    callbacks[name].push(callback);
  }
};

export const stopListenTo = (name, callback) => {
  if (callbacks[name]) {
    const index = callbacks[name].indexOf(callback);
    if (index !== -1) {
      callbacks[name].splice(index, 1);
    }
  }
}

export const sendChat = (message) => {
  roomSubscription.chat(message);
}