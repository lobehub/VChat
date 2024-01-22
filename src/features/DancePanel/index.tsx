import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import Dance from './Dance';
import { useStyles } from './style';

interface DancePanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const DancePanel = (props: DancePanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [setDancePanelOpen] = useConfigStore((s) => [s.setDancePanelOpen]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setDancePanelOpen(false)}
      title="舞蹈"
    >
      <div className={styles.content}>
        <Dance />
      </div>
    </Panel>
  );
};

export default DancePanel;
