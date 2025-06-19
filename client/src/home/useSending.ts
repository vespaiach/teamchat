import { useCallback, useRef, useState } from 'react';

export function useSendingChat(roomId: number) {
  const [sending, setSending] = useState<boolean>(false);
  const [chat, setChat] = useState<string>('');

  const sendingRef = useRef(() => {});
  sendingRef.current = async () => {
    if (sending) return;

    setSending(true);
    try {
      // Get CSRF token from meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }

      const response = await fetch(`/rooms/${roomId}/chats`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message: chat }),
      });

      if (!response.ok) {
        // TODO: handle error
        throw new Error('Failed to send chat');
      }

      await response.json();
      setChat('');
    } catch (error) {
      // TODO: handle error
      console.error('Error sending chat:', error);
    } finally {
      setSending(false);
    }
  };

  const sendChat = useCallback(async () => {
    await sendingRef.current();
  }, []);

  const handleChatChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChat(e.target.value);
  }, []);

  return { chat, handleChatChange, sending, sendChat };
}
