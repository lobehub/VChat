'use client';

import Panel from '@/components/Panel';
import { FOCUS_Z_INDEX, INITIAL_Z_INDEX } from '@/constants/common';
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
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      onFocus={() => setPanel('live', { zIndex: FOCUS_Z_INDEX })}
      onBlur={() => setPanel('live', { zIndex: INITIAL_Z_INDEX })}
      zIndex={panel.live.zIndex}
      coordinates={panel.live.coordinates}
      onCoordinatesChange={(coordinates) => setPanel('live', { coordinates })}
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
