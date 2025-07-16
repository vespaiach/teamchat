import { toUser } from '~/models/user';
import type { User, APIUser } from '~/models/user';
import { get } from '~/utils/remote';

export class UserQuery {
  static async list(): Promise<User[]> {
    const response = await get<APIUser[]>('/users');
    if (response.success) {
      return response.data.map(toUser);
    }
    return [];
  }
}
