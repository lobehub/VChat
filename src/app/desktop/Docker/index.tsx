'use client';

import AudioPlayer from '@/app/desktop/Docker/AudioPlayer';
import MessageInput from '@/app/desktop/Docker/MessageInput';
import Apps from './Apps';
import { useStyles } from './style';

const Docker = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.docker}>
      <div className={styles.apps}>
        <Apps />
      </div>
      <div className={styles.sidebar}>
        <MessageInput />
      </div>
      <div className={styles.player}>
        <AudioPlayer />
      </div>
    </div>
  );
};

export default Docker;
