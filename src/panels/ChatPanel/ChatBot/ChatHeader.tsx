import AgentMeta from '@/components/AgentMeta';
import { useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { Video } from 'lucide-react';
import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [panel, openPanel] = useConfigStore((s) => [s.panel, s.openPanel]);
  const [currentAgent, setLiveId] = useSessionStore((s) => [
    sessionSelectors.currentAgent(s),
    s.setLiveId,
  ]);

  return (
    <div className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      <ActionIcon
        icon={Video}
        onClick={() => {
          setLiveId(currentAgent?.agentId);
          openPanel('live');
        }}
        title={panel.live.open ? '关闭视频通话' : '发起视频通话'}
      />
    </div>
  );
};

export default Header;
