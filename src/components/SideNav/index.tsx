import { ActionIcon, SideNav as LobeSideNav } from '@lobehub/ui';
import { MessageSquare, Settings2, User } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SideNav = () => {
  const [tab, setTab] = useState<string>('chat');
  const router = useRouter();

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
            active={tab === 'role'}
            icon={User}
            onClick={() => {
              setTab('role');
              router.push('/role');
            }}
            size="large"
          />
          <ActionIcon
            active={tab === 'chat'}
            icon={MessageSquare}
            onClick={() => {
              setTab('chat');
              router.push('/');
            }}
            size="large"
          />
        </>
      }
    />
  );
};

export default SideNav;
