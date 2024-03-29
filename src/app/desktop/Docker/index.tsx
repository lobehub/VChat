'use client';

import AudioPlayer from '@/app/desktop/Docker/AudioPlayer';
import MessageInput from '@/app/desktop/Docker/MessageInput';
import { useSessionStore } from '@/store/session';
import { Segmented } from 'antd';
import Apps from './Apps';
import { useStyles } from './style';

const Docker = () => {
  const { styles } = useStyles();
  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    viewerMode: s.viewerMode,
    setViewerMode: s.setViewerMode,
  }));

  return (
    <div className={styles.docker}>
      <div className={styles.apps}>
        <Apps />
      </div>
      <div className={styles.message}>
        <MessageInput />
        <Segmented
          value={viewerMode ? 'true' : 'false'}
          options={[
            { label: '3D', value: 'true' },
            { label: '立绘', value: 'false' },
          ]}
          style={{ marginLeft: '8px' }}
          onChange={(value) => {
            if (value === 'true') {
              setViewerMode(true);
            } else {
              setViewerMode(false);
            }
          }}
        />
      </div>
      <div className={styles.player}>
        <AudioPlayer />
      </div>
    </div>
  );
};

export default Docker;
