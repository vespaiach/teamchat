import consumer from "channels/consumer"

consumer.subscriptions.create("UserChannel", {
	connected() {
		// Called when the subscription is ready for use on the server
		console.log("Connected to UserChannel");
	}
});