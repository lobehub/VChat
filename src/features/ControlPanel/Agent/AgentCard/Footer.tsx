import { agentListSelectors, useAgentStore } from '@/store/agent';
import { memo } from 'react';
import { useStyles } from './style';

const Footer = () => {
  const { styles } = useStyles();
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));
  const { systemRole } = currentAgent || {};

  return (
    <div className={styles.footer}>
      <div className={styles.desc}>{systemRole}</div>
    </div>
  );
};

export default memo(Footer);
