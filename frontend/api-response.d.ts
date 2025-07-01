declare global {
  interface GroupChannelResponse {
    id: number;
    name: string;
    description: string | null;
    is_public: boolean;
    created_by_id: number;
    created_at: string;
    member_count: number;
    has_unread_messages: boolean;
    is_member: boolean;
  }

  interface DirectChannelResponse {
    id: number;
    created_by_id: number;
    created_at: string;
    has_unread_messages: boolean
    participants: UserResponse[];
  }

  interface UserResponse {
    id: string;
    email: string;
    avatar?: string;
    first_name: string;
    last_name: string;
    created_at: string;
    time_zone: string;
    role: string | null;
    department: string | null;
  }

  type ApiResponse<T> =
    | {
        success: false;
        error: string;
      }
    | {
        success: true;
        data: T;
      };
}

export {};
