import Record from '@/features/ChatInput/Actions/Record';
import Voice from '@/features/ChatInput/Actions/Voice';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { ActionIcon } from '@lobehub/ui';
import { Segmented, Space } from 'antd';
import { History } from 'lucide-react';

const ToolBar = () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);

  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    viewerMode: s.viewerMode,
    setViewerMode: s.setViewerMode,
  }));

  return (
    <Space size={4}>
      <ActionIcon
        icon={History}
        title={'聊天记录'}
        onClick={() => {
          openPanel('chat');
        }}
      />
      <Record />
      <Voice />
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
  );
};

export default ToolBar;
