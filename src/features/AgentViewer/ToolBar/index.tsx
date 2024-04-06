import { useViewerStore } from '@/store/viewer';
import { ActionIconGroup } from '@lobehub/ui';
import { Expand, Grid3x3, LandPlot, Orbit, RotateCw, SwitchCamera } from 'lucide-react';

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

  const dropdownMenu = [
    {
      icon: SwitchCamera,
      key: 'cameraHelper',
      label: '镜头辅助',
    },
    {
      icon: Orbit,
      key: 'cameraControl',
      label: '镜头控制',
    },
    {
      icon: LandPlot,
      key: 'floor',
      label: '切换地板',
    },
  ];

  return (
    <ActionIconGroup
      style={style}
      className={className}
      type={'block'}
      dropdownMenu={dropdownMenu}
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
        } else if (action.key === 'cameraHelper') {
          viewer.toggleCameraHelper();
        } else if (action.key === 'cameraControl') {
          viewer.toggleCameraControls();
        } else if (action.key === 'floor') {
          viewer.toggleFloor();
        }
      }}
    />
  );
};

export default ToolBar;
