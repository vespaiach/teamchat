export interface User {
  id: number;
  email: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  name: string;
  joinedAt: Date;
  role: string | null;
  department: string | null;
  timezone: string;
}

export interface APIUser {
  id: number;
  email: string;
  avatar?: string | null;
  first_name: string;
  last_name: string;
  department: string | null;
  role: string | null;
  time_zone: string;
  created_at: string;
}

export function toUser(data: APIUser): User {
  return {
    id: data.id,
    email: data.email,
    avatar: data.avatar ?? null,
    firstName: data.first_name,
    lastName: data.last_name,
    name: `${data.first_name} ${data.last_name}`,
    joinedAt: new Date(data.created_at),
    role: data.role ?? null,
    department: data.department ?? null,
    timezone: data.time_zone,
  };
}

export function toAPIUser(user: User): Omit<APIUser, 'created_at' | 'id'> & { id?: number } {
  const apiUser = {
    email: user.email,
    avatar: user.avatar,
    first_name: user.firstName,
    last_name: user.lastName,
    department: user.department,
    role: user.role,
    time_zone: user.timezone,
  };
  if (user.id) {
    return { ...apiUser, id: user.id };
  }
  return apiUser;
}
