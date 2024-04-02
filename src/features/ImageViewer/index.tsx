'use client';

import { sessionSelectors, useSessionStore } from '@/store/session';
import { useStyles } from './style';

const Docker = () => {
  const { styles } = useStyles();
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));

  return (
    <div className={styles.content}>
      <img src={currentAgent?.meta.cover} alt="cover" width={300} height={400} />
    </div>
  );
};

export default Docker;
