'use client';

import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import Agent from './Agent';
import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [setPanel] = useConfigStore((s) => [s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setPanel('agent' as any, { open: false })}
      title="Vidol.Chat"
    >
      <div className={styles.content}>
        <Agent />
      </div>
    </Panel>
  );
};

export default ControlPanel;
