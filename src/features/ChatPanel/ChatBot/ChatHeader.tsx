import AgentMeta from '@/components/AgentMeta';
import { useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { isEqual } from 'lodash-es';
import { Video } from 'lucide-react';
import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const { setTab } = useConfigStore();
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s), isEqual);

  return (
    <div className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      {/* @ts-ignore */}
      <ActionIcon icon={Video} onClick={() => setTab('agent')} />
    </div>
  );
};

export default Header;
