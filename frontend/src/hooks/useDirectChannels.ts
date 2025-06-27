import { get } from '~/utils/remote';
import { useEffect, useState } from 'react';
import { transformDirectChannels } from '~/utils/transformer';

export default function useDirectChannels() {
  const [directChannels, setDirectChannels] = useState<DirectChannel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await get<DirectChannelResponse[]>('/conversations', { type: 'direct' });
      if (response.success) {
        setDirectChannels(transformDirectChannels(response.data));
      }
      setLoading(false);
    })();
  }, []);

  return {
    setDirectChannels,
    directChannels,
    directChannelLoading: loading,
  };
}
