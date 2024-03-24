'use client';

import AgentViewer from './AgentViewer';
import { useStyles } from './style';

const VirtualIdol = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.content}>
      <AgentViewer />
    </div>
  );
};

export default VirtualIdol;
