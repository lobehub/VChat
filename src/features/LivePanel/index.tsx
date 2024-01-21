import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import AgentViewer from './AgentViewer';
import { useStyles } from './style';

interface LivePanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const LivePanel = (props: LivePanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [setLivePanelOpen] = useConfigStore((s) => [s.setLivePanelOpen]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setLivePanelOpen(false)}
      title="视频通话"
    >
      <div className={styles.content}>
        <AgentViewer />
      </div>
    </Panel>
  );
};

export default LivePanel;
