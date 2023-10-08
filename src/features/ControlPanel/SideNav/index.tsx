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
      className="handle"
      style={{ cursor: 'move' }}
      bottomActions={
        <ActionIcon
          /* @ts-ignore */
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
            /* @ts-ignore */
            icon={User}
            onClick={() => {
              setTab('agents');
              router.push('/');
            }}
            size="large"
          />
          <ActionIcon
            active={tab === 'dance'}
            /* @ts-ignore */
            icon={Music2}
            onClick={() => {
              setTab('dance');
              router.push('/dance');
            }}
            size="large"
          />
          <ActionIcon
            active={tab === 'chat'}
            /* @ts-ignore */
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
