import { ActionIcon, SideNav as LobeSideNav } from '@lobehub/ui';
import { Album, MessageSquare, Settings2 } from 'lucide-react';
import { useState } from 'react';

const SideNav = () => {
  const [tab, setTab] = useState<string>('chat');

  return (
    <LobeSideNav
      style={{ height: 'calc(100vh - 64px)' }}
      bottomActions={<ActionIcon icon={Settings2} />}
      topActions={
        <>
          <ActionIcon
            active={tab === 'chat'}
            icon={MessageSquare}
            onClick={() => setTab('chat')}
            size="large"
          />
          <ActionIcon
            active={tab === 'market'}
            icon={Album}
            onClick={() => setTab('market')}
            size="large"
          />
        </>
      }
    />
  );
};

export default SideNav;
