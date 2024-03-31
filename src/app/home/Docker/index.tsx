'use client';

import AudioPlayer from '@/app/home/Docker/AudioPlayer';
import MessageInput from '@/app/home/Docker/MessageInput';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { Segmented, Space } from 'antd';
import { History } from 'lucide-react';
import Apps from './Apps';
import { useStyles } from './style';

const Docker = () => {
  const { styles } = useStyles();
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
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
        <Space>
          <MessageInput />
          <ActionIcon
            icon={History}
            title={'聊天记录'}
            onClick={() => {
              openPanel('chat');
            }}
          />
          <Segmented
            value={viewerMode ? 'true' : 'false'}
            options={[
              { label: '3D', value: 'true' },
              { label: '立绘', value: 'false' },
            ]}
            onChange={(value) => {
              if (value === 'true') {
                setViewerMode(true);
              } else {
                setViewerMode(false);
              }
            }}
          />
        </Space>
      </div>
      <div className={styles.player}>
        <AudioPlayer />
      </div>
    </div>
  );
};

export default Docker;
