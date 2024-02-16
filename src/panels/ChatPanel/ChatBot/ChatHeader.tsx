import AgentMeta from '@/components/AgentMeta';
import { useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { Video, VideoOff } from 'lucide-react';
import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);
  const [currentAgent, setLiveId] = useSessionStore((s) => [
    sessionSelectors.currentAgent(s),
    s.setLiveId,
  ]);

  return (
    <div className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      <ActionIcon
        icon={panel.live.open ? VideoOff : Video}
        onClick={() => {
          if (panel.live.open) {
            setLiveId(undefined);
            setPanel('live', { open: false });
          } else {
            setLiveId(currentAgent?.agentId);
            setPanel('live', { open: true });
          }
        }}
        title={panel.live.open ? '关闭视频通话' : '发起视频通话'}
      />
    </div>
  );
};

export default Header;
