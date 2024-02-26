'use client';

import PanelContainer from '@/panels/PanelContainer';
import Config from './Config';
import { useStyles } from './style';

interface ConfigPanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const ConfigPanel = (props: ConfigPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <PanelContainer style={style} className={className} panelKey="config" title="系统设置">
      <div className={styles.content}>
        <Config />
      </div>
    </PanelContainer>
  );
};

export default ConfigPanel;
