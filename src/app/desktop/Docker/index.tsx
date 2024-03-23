'use client';

import Apps from './Apps';
import Timer from './Timer';
import { useStyles } from './style';

const Docker = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.docker}>
      <div className={styles.player}>1</div>
      <div className={styles.apps}>
        <Apps />
      </div>
      <div className={styles.sidebar}>
        <Timer />
      </div>
    </div>
  );
};

export default Docker;
