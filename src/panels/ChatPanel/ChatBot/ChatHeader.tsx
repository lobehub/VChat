import AgentMeta from '@/components/AgentMeta';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { Volume2 } from 'lucide-react';
import { useStyles } from './style';

const Header = () => {
  const { styles } = useStyles();
  const [currentAgent] = useSessionStore((s) => [sessionSelectors.currentAgent(s)]);

  return (
    <div className={styles.header}>
      <AgentMeta meta={currentAgent?.meta} />
      <ActionIcon icon={Volume2} onClick={() => {}} />
    </div>
  );
};

export default Header;
