import { get } from '~/utils/remote';
import { useEffect, useState } from 'react';
import { transformGroupChannels } from '~/utils/transformer';

export default function useGroupChannels() {
  const [groupChannels, setGroupChannels] = useState<ExtendedGroupChannel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await get<GroupChannelResponse[]>('/conversations', { type: 'group' });
      if (response.success) {
        setGroupChannels(transformGroupChannels(response.data));
      }
      setLoading(false);
    })();
  }, []);

  return {
    setGroupChannels,
    groupChannels,
    groupChannelLoading: loading,
  };
}
