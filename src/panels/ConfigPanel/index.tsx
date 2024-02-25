'use client';

import Panel from '@/components/Panel';
import { FOCUS_Z_INDEX, INITIAL_Z_INDEX } from '@/constants/common';
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
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      onFocus={() => setPanel('config', { zIndex: FOCUS_Z_INDEX })}
      onBlur={() => setPanel('config', { zIndex: INITIAL_Z_INDEX })}
      zIndex={panel.config.zIndex}
      coordinates={panel.config.coordinates}
      onCoordinatesChange={(coordinates) => setPanel('config', { coordinates })}
      onClose={() => setPanel('config', { open: false })}
      title="系统设置"
    >
      <div className={styles.content}>
        <Config />
      </div>
    </Panel>
  );
};

export default ConfigPanel;
