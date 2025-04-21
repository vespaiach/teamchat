export function scrollChatViewport() {
	const container = document.getElementById('chat-viewport')
	if (container) {
		container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
	}
}