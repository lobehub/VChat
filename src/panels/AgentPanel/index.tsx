'use client';

import Panel from '@/components/Panel';
import { FOCUS_Z_INDEX, INITIAL_Z_INDEX } from '@/constants/common';
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
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      onFocus={() => setPanel('agent', { zIndex: FOCUS_Z_INDEX })}
      onBlur={() => setPanel('agent', { zIndex: INITIAL_Z_INDEX })}
      zIndex={panel.agent.zIndex}
      coordinates={panel.agent.coordinates}
      onCoordinatesChange={(coordinates) => setPanel('agent', { coordinates })}
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
