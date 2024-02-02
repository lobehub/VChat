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
  const [setPanel] = useConfigStore((s) => [s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setPanel('live', { open: false })}
      title="WebCam"
    >
      <div className={styles.content}>
        <AgentViewer />
      </div>
    </Panel>
  );
};

export default LivePanel;
