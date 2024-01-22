import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import Config from './Config';
import { useStyles } from './style';

interface ConfigPanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const ConfigPanel = (props: ConfigPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [setConfigPanelOpen] = useConfigStore((s) => [s.setConfigPanelOpen]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setConfigPanelOpen(false)}
      title="系统设置"
    >
      <div className={styles.content}>
        <Config />
      </div>
    </Panel>
  );
};

export default ConfigPanel;
