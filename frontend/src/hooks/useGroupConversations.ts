import { useEffect, useState } from 'react';
import { ConversationQuery } from '~/services/ConversationQuery';
import type { GroupConversation } from '~/models/groupConversation';

export default function useGroupConversations() {
  const [groupConversations, setGroupConversations] = useState<GroupConversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setGroupConversations(await ConversationQuery.listGroupConversations());
      setLoading(false);
    })();
  }, []);

  return {
    setGroupConversations,
    groupConversations,
    groupConversationsLoading: loading,
  };
}
