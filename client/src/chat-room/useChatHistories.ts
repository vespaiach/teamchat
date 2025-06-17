import { useCallback, useEffect, useMemo, useState } from 'react';

interface Chat {
  id: number;
  creatorId: number;
  creatorAvatar: string;
  creatorName: string;
  createdAt: Date;
  messages: string[];
}

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

const FIVE_MINUTES = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function useChatHistories(roomId: number) {
  const [dbChats, setDbChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);

  // Group chats by creator and time (5 minutes interval)
  const groupedChats = useMemo(() => {
    if (dbChats.length === 0) return [];
    const groups = [dbChats[0]];
    for (let i = 1; i < dbChats.length; i++) {
      if (
        dbChats[i].creatorId === groups[groups.length - 1].creatorId &&
        dbChats[i].createdAt.getTime() - groups[groups.length - 1].createdAt.getTime() < FIVE_MINUTES
      ) {
        groups[groups.length - 1].messages.push(dbChats[i].messages[0]);
      } else {
        groups.push(dbChats[i]);
      }
    }

    return groups;
  }, [dbChats]);

  const loadMoreChatHistories = useCallback((lastSeenId?: number) => {
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
        // TODO: can be optimized
        setDbChats((prevChats) =>
          [...prevChats, ...data.map(tranformDbChatToChat)].sort((a, b) => a.id - b.id)
        );
        setLoading(false);
      })
      .catch(() => {
        // TODO: handle error
        setLoading(false);
      });
  }, [roomId]);

  useEffect(() => {
    loadMoreChatHistories();
  }, [loadMoreChatHistories]);

  return {
    chatHistories: groupedChats,
    loading,
  };
}

function tranformDbChatToChat(dbChat: DbChat): Chat {
  return {
    id: dbChat.id,
    creatorId: dbChat.sender.id,
    creatorAvatar: dbChat.sender.avatar_url || '',
    creatorName: `${dbChat.sender.first_name} ${dbChat.sender.last_name}`,
    createdAt: new Date(dbChat.created_at),
    messages: [dbChat.message],
  };
}
