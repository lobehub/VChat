import { agentListSelectors, useAgentStore } from '@/store/agent';
import { memo } from 'react';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Footer = memo(() => {
  const { styles } = useStyles();
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));

  const { systemRole } = currentAgent;

  return (
    <div className={styles.footer}>
      <div className={styles.desc}>{systemRole}</div>
    </div>
  );
});

export default Footer;
