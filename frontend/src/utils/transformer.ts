export function transformGroupChannel(channel: GroupChannelResponse): ExtendedGroupChannel {
  return {
    id: channel.id,
    name: channel.name,
    description: channel.description,
    isPublic: channel.is_public,
    createdById: channel.created_by_id,
    createdAt: new Date(channel.created_at),
    memberCount: channel.member_count,
    hasUnreadMessages: channel.has_unread_messages,
    isMember: channel.is_member,
  };
}

export function transformGroupChannels(channels: GroupChannelResponse[]): ExtendedGroupChannel[] {
  return channels.map(transformGroupChannel);
}

export function transformDirectChannel(channel: DirectChannelResponse): DirectChannel {
  return {
    id: channel.id,
    createdById: channel.created_by_id,
    createdAt: new Date(channel.created_at),
    hasUnreadMessages: channel.has_unread_messages,
    participants: channel.participants.map(transformUser),
  };
}

export function transformDirectChannels(channels: DirectChannelResponse[]): DirectChannel[] {
  return channels.map(transformDirectChannel);
}

export function transformUser(user: UserResponse): User {
  return {
    id: user.id,
    email: user.email,
    avatar: user.avatar,
    firstName: user.first_name,
    lastName: user.last_name,
    name: `${user.first_name} ${user.last_name}`,
  };
}
