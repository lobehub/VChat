'use client';

import PanelContainer from '@/panels/PanelContainer';
import Agent from './Agent';
import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <PanelContainer style={style} className={className} panelKey="agent" title="角色">
      <div className={styles.content}>
        <Agent />
      </div>
    </PanelContainer>
  );
};

export default ControlPanel;
