import { useViewerStore } from '@/store/viewer';
import { ActionIconGroup } from '@lobehub/ui';
import { Expand, Grid3x3, RotateCw } from 'lucide-react';

interface ToolBarProps {
  style?: React.CSSProperties;
  className?: string;
}

const ToolBar = (props: ToolBarProps) => {
  const { style, className } = props;
  const viewer = useViewerStore((s) => s.viewer);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
  return (
    <ActionIconGroup
      style={style}
      className={className}
      type={'block'}
      items={[
        {
          icon: RotateCw,
          key: 'resetCamera',
          label: '重置镜头',
        },
        {
          icon: Expand,
          key: 'expand',
          label: '全屏',
        },
        {
          icon: Grid3x3,
          key: 'grid',
          label: '网格',
        },
      ]}
      direction="column"
      onActionClick={(action) => {
        if (action.key === 'resetCamera') {
          viewer.resetCamera();
        } else if (action.key === 'expand') {
          toggleFullScreen();
        } else if (action.key === 'grid') {
          viewer.toggleGrid();
        }
      }}
    />
  );
};

export default ToolBar;
