declare global {
  interface GroupedChat {
    groupId: string;
    creatorId: number;
    creatorAvatar: string;
    creatorName: string;
    createdAt: Date;
    messages: Array<{ id: number; message: string }>;
  }
}

export {};