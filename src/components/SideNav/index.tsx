import { ActionIcon, SideNav as LobeSideNav } from '@lobehub/ui';
import { MessageSquare, Music2, Settings2, User } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SideNav = () => {
  const router = useRouter();
  const path = router.pathname.startsWith('/config')
    ? 'config'
    : router.pathname.startsWith('/chat')
    ? 'chat'
    : router.pathname.startsWith('/dance')
    ? 'dance'
    : 'agents';

  const [tab, setTab] = useState<string>(path);

  return (
    <LobeSideNav
      style={{ height: 'calc(100vh - 64px)' }}
      bottomActions={
        <ActionIcon
          icon={Settings2}
          onClick={() => {
            setTab('config');
            router.push('/config');
          }}
          size="large"
          active={tab === 'config'}
        />
      }
      topActions={
        <>
          <ActionIcon
            active={tab === 'agents'}
            icon={User}
            onClick={() => {
              setTab('agents');
              router.push('/');
            }}
            size="large"
          />
          <ActionIcon
            active={tab === 'dance'}
            icon={Music2}
            onClick={() => {
              setTab('dance');
              router.push('/dance');
            }}
            size="large"
          />
          <ActionIcon
            active={tab === 'chat'}
            icon={MessageSquare}
            onClick={() => {
              setTab('chat');
              router.push('/chat');
            }}
            size="large"
          />
        </>
      }
    />
  );
};

export default SideNav;
