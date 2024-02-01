import AgentMeta from '@/components/AgentMeta';
import { useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { Video, VideoOff } from 'lucide-react';
import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [livePanelOpen, setLivePanelOpen] = useConfigStore((s) => [
    s.livePanelOpen,
    s.setLivePanelOpen,
  ]);
  const [currentAgent, setLiveId] = useSessionStore((s) => [
    sessionSelectors.currentAgent(s),
    s.setLiveId,
  ]);

  return (
    <div className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      {/* @ts-ignore */}
      <ActionIcon
        icon={livePanelOpen ? VideoOff : Video}
        onClick={() => {
          if (livePanelOpen) {
            setLiveId(undefined);
            setLivePanelOpen(false);
          } else {
            setLiveId(currentAgent?.agentId);
            setLivePanelOpen(true);
          }
        }}
        title={livePanelOpen ? '关闭视频通话' : '发起视频通话'}
      />
    </div>
  );
};

export default Header;
