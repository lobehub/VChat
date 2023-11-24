import { useConfigStore } from '@/store/config';
import { ActionIcon, SideNav as LobeSideNav } from '@lobehub/ui';
import { MessageSquare, Music2, Pointer, Settings2, User } from 'lucide-react';

interface SideNavProps {
  className?: string;
}

const SideNav = (props: SideNavProps) => {
  const { tab, setTab } = useConfigStore();
  const { className } = props;

  return (
    <LobeSideNav
      className={className}
      bottomActions={
        <ActionIcon
          /* @ts-ignore */
          icon={Settings2}
          onClick={() => {
            setTab('config');
          }}
          size="large"
          active={tab === 'config'}
        />
      }
      topActions={
        <>
          <ActionIcon
            active={tab === 'agent'}
            /* @ts-ignore */
            icon={User}
            onClick={() => {
              setTab('agent');
            }}
            size="large"
          />
          <ActionIcon
            active={tab === 'dance'}
            /* @ts-ignore */
            icon={Music2}
            onClick={() => {
              setTab('dance');
            }}
            size="large"
          />
          <ActionIcon
            active={tab === 'chat'}
            /* @ts-ignore */
            icon={MessageSquare}
            onClick={() => {
              setTab('chat');
            }}
            size="large"
          />
          <ActionIcon
            active={tab === 'touch'}
            /* @ts-ignore */
            icon={Pointer}
            onClick={() => {
              setTab('touch');
            }}
            size="large"
          />
        </>
      }
    />
  );
};

export default SideNav;
