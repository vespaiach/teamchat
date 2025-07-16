import { toDirectConversation, toGroupConversation } from '~/models/groupConversation';
import type {
  GroupConversation,
  APIGroupConversation,
  DirectConversation,
  APIDirectConversation,
} from '~/models/groupConversation';
import { get } from '~/utils/remote';

export class ConversationQuery {
  static async listGroupConversations(): Promise<GroupConversation[]> {
    const response = await get<APIGroupConversation[]>('/conversations?type=group');
    if (response.success) {
      return response.data.map(toGroupConversation);
    }
    return [];
  }

  static async listDirectConversations(): Promise<DirectConversation[]> {
    const response = await get<APIDirectConversation[]>('/conversations?type=direct');
    if (response.success) {
      return response.data.map(toDirectConversation);
    }
    return [];
  }
}
