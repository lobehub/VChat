import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import { memo } from 'react';
import AgentViewer from './AgentViewer';
import { useStyles } from './style';

interface LivePanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const LivePanel = (props: LivePanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [setLivePanelOpen, tab] = useConfigStore((s) => [s.setLivePanelOpen, s.tab]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setLivePanelOpen(false)}
      title="视频聊天"
    >
      <div className={styles.content}>
        <AgentViewer />
      </div>
    </Panel>
  );
};

export default memo(LivePanel);
