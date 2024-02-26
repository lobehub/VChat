'use client';

import PanelContainer from '@/panels/PanelContainer';
import AgentViewer from './AgentViewer';
import { useStyles } from './style';

interface LivePanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const LivePanel = (props: LivePanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <PanelContainer style={style} className={className} panelKey="live" title="WebCam">
      <div className={styles.content}>
        <AgentViewer />
      </div>
    </PanelContainer>
  );
};

export default LivePanel;
