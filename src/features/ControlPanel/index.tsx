import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import { memo } from 'react';
import Agent from './Agent';
import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [setControlPanelOpen, tab] = useConfigStore((s) => [s.setControlPanelOpen, s.tab]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setControlPanelOpen(false)}
      title="Vidol.Chat"
    >
      <div className={styles.content}>{tab === 'agent' ? <Agent /> : null}</div>
    </Panel>
  );
};

export default memo(ControlPanel);
