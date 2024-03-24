'use client';

import AudioPlayer from '@/app/desktop/Docker/AudioPlayer';
import Timer from '@/app/desktop/Docker/Timer';
import { ActionIcon } from '@lobehub/ui';
import { GithubIcon } from 'lucide-react';
import Apps from './Apps';
import { useStyles } from './style';

const Docker = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.docker}>
      <div className={styles.apps}>
        <Apps />
      </div>
      <div className={styles.player}>
        <AudioPlayer />
      </div>
      <div className={styles.sidebar}>
        <ActionIcon
          size="large"
          icon={GithubIcon}
          onClick={() => window.open('https://github.com/v-idol/vidol.chat', '_blank')}
        />
        <Timer />
      </div>
    </div>
  );
};

export default Docker;
