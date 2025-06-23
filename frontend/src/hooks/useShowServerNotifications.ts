import { useEffect, useRef } from 'react';
import { useToast } from '~/global-contexts/toast';

export default function useShowServerNotifications() {
  const { showError, showSuccess, showWarning } = useToast();
  const showRef = useRef<(n: ServerNotification) => void | null>(null);
  showRef.current = (noti: ServerNotification) => {
    switch (noti.type) {
      case 'error':
        showError(noti.message, noti.title ?? 'Error');
        break;
      case 'success':
        showSuccess(noti.message, noti.title ?? 'Success');
        break;
      case 'warning':
        showWarning(noti.message, noti.title ?? 'Warning');
        break;
      default:
        console.warn('Unknown notification type:', noti.type);
    }
  };

  useEffect(() => {
    const notificationStrings = document.getElementById('server-notifications')?.textContent;
    if (notificationStrings && showRef.current) {
      try {
        const parsedErrors = JSON.parse(notificationStrings) as ServerNotification[];
        parsedErrors.forEach(showRef.current);
      } catch (e) {
        console.error('Failed to parse app errors:', e);
      }
    }
  }, []);
}
