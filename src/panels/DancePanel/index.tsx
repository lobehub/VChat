'use client';

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
  const [setPanel] = useConfigStore((s) => [s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setPanel('dance', { open: false })}
      title="舞蹈"
    >
      <div className={styles.content}>
        <Dance />
      </div>
    </Panel>
  );
};

export default DancePanel;
