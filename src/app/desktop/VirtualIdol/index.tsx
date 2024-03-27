'use client';

import { useSessionStore } from '@/store/session';
import AgentViewer from './AgentViewer';
import { useStyles } from './style';

const VirtualIdol = () => {
  const { styles } = useStyles();
  const [viewerMode] = useSessionStore((s) => [s.viewerMode]);

  return <div className={styles.content}>{viewerMode === true ? <AgentViewer /> : null}</div>;
};

export default VirtualIdol;
