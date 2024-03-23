'use client';

import React from 'react';
import AgentViewer from './AgentViewer';
import { useStyles } from './style';

interface LivePanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const LivePanel = (props: LivePanelProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.content}>
      <AgentViewer />
    </div>
  );
};

export default LivePanel;
