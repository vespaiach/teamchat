import { useEffect, useState } from 'react';
import type { DirectConversation } from '~/models/groupConversation';
import { ConversationQuery } from '~/services/ConversationQuery';

export default function useDirectConversations() {
  const [directConversations, setDirectConversations] = useState<DirectConversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setDirectConversations(await ConversationQuery.listDirectConversations());
      setLoading(false);
    })();
  }, []);

  return {
    setDirectConversations,
    directConversations,
    directConversationsLoading: loading,
  };
}
