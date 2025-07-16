import type {
  GroupConversation,
  APIGroupConversation,
} from '~/models/groupConversation';
import {  post, put } from '~/utils/remote';

export class ConversationPersist {
  static async saveGroupConversation(conversation: Partial<GroupConversation>): Promise<boolean> {
    const savingConversation = {
      name: conversation.name,
      description: conversation.description,
      is_public: conversation.isPublic,
    };
    if (conversation.id) {
      const response = await put<APIGroupConversation>(`/conversations/${conversation.id}`, savingConversation);
      return response.success;
    } else {
      const response = await post<APIGroupConversation>('/conversations', savingConversation);
      return response.success;
    }
    return false;
  }
}
