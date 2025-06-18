import { useDebounce, useWindowScroll } from '@uidotdev/usehooks';
import { useRef, useEffect } from 'react';

export default function useLoadHistoriesOnScrolling(
  loadMoreChatHistories: (lastMessageId?: number) => void,
  chatHistories: GroupedChat[],
  loading: boolean
) {
  const [{ y }] = useWindowScroll();
  const debouncedY = useDebounce(y, 100);
  const loadRef = useRef(() => {});
  loadRef.current = () => {
    if (loading) return;
    loadMoreChatHistories(chatHistories.length > 0 ? chatHistories[0].messages[0].id : undefined);
  };

  useEffect(() => {
    if (debouncedY !== null && debouncedY < 50) {
      loadRef.current();
    }
  }, [debouncedY]);
}
