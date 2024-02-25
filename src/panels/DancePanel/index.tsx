'use client';

import Panel from '@/components/Panel';
import { FOCUS_Z_INDEX, INITIAL_Z_INDEX } from '@/constants/common';
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
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      onFocus={() => setPanel('dance', { zIndex: FOCUS_Z_INDEX })}
      onBlur={() => setPanel('dance', { zIndex: INITIAL_Z_INDEX })}
      zIndex={panel.dance.zIndex}
      coordinates={panel.dance.coordinates}
      onCoordinatesChange={(coordinates) => setPanel('dance', { coordinates })}
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
