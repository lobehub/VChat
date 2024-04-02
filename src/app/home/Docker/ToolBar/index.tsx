import Voice from '@/features/ChatInput/Actions/Voice';
import { useSessionStore } from '@/store/session';
import { Segmented, Space } from 'antd';
import { useStyles } from './style';

const ToolBar = () => {
  const { styles } = useStyles();
  const { viewerMode, setViewerMode } = useSessionStore((s) => ({
    viewerMode: s.viewerMode,
    setViewerMode: s.setViewerMode,
  }));

  return (
    <Space>
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
