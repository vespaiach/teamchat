import { useRef, useCallback, useEffect, useMemo, useState } from 'react';

interface DbChat {
  id: number;
  user_id: number;
  room_id: number;
  message: string;
  custom_data: null | Record<string, unknown>;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  sender: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
    avatar_url: string | null;
    avatar_filename: string | null;
    avatar_content_type: string | null;
  };
}

const FIVE_MINUTES = 5 * 60 * 1000;

export default function useChatHistories(roomId: number) {
  const [allChatsLoaded, setAllChatsLoaded] = useState(false);
  const [chats, setChats] = useState<DbChat[]>([]);
  const [loading, setLoading] = useState(false);

  // Ref to control loading more chats
  // Don't want these values to trigger re-renders
  const stopLoadMoreRef = useRef(false);
  stopLoadMoreRef.current = allChatsLoaded || loading;

  // Group chats by creator and time (5 minutes interval)
  const groupedChats = useMemo(() => {
    if (chats.length === 0) return [];

    const groups: GroupedChat[] = [createGroupedChatFromDbChat(chats[0])];
    for (let i = 1; i < chats.length; i++) {
      if (
        chats[i].sender.id === groups[groups.length - 1].creatorId &&
        new Date(chats[i].created_at).getTime() - groups[groups.length - 1].createdAt.getTime() < FIVE_MINUTES
      ) {
        addToGroupedChat(groups[groups.length - 1], chats[i]);
      } else {
        groups.push(createGroupedChatFromDbChat(chats[i]));
      }
    }

    return groups;
  }, [chats]);

  const loadMoreChatHistories = useCallback(
    (lastSeenId?: number) => {
      if (stopLoadMoreRef.current) return;
      setLoading(true);

      const query = lastSeenId !== undefined && lastSeenId > 0 ? `?last_seen_id=${lastSeenId}` : '';

      fetch(`/rooms/${roomId}/chat_histories${query}`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data: DbChat[]) => {
          if (data.length === 0) {
            setAllChatsLoaded(true);
            setLoading(false);
            return;
          }
          // TODO: can be optimized
          setChats((prevChats) => [...data, ...prevChats].sort((a, b) => a.id - b.id));
          setLoading(false);
        })
        .catch(() => {
          // TODO: handle error
          setLoading(false);
        });
    },
    [roomId]
  );

  useEffect(() => {
    loadMoreChatHistories();
  }, [loadMoreChatHistories]);

  return {
    chatHistories: groupedChats,
    loadMoreChatHistories,
    loading,
  };
}

function createGroupedChatFromDbChat(dbChat: DbChat): GroupedChat {
  const createdAt = new Date(dbChat.created_at);
  const groupId = `${dbChat.sender.id}-${createdAt.getTime()}`;

  return {
    groupId,
    creatorId: dbChat.sender.id,
    creatorAvatar: dbChat.sender.avatar_url || '',
    creatorName: dbChat.sender.first_name + ' ' + dbChat.sender.last_name,
    createdAt,
    messages: [{ id: dbChat.id, message: dbChat.message }],
  };
}

function addToGroupedChat(
  groupedChat: GroupedChat,
  dbChat: DbChat
): GroupedChat {
  groupedChat.messages.push({ id: dbChat.id, message: dbChat.message });
  return groupedChat
}