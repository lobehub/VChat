import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';

const StoreHydration = () => {
  const router = useRouter();

  useEffect(() => {
    // refs: https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#hashydrated
    useSessionStore.persist.rehydrate();
    useConfigStore.persist.rehydrate();
  }, []);
  return null;
};

export default memo(StoreHydration);
