import { useSessionStore } from '@/store/session';
import { ActionIconGroup, type ActionIconGroupProps } from '@lobehub/ui';
import { Expand, RotateCw, Trash } from 'lucide-react';
import { memo, useCallback, useRef } from 'react';
import { useStyles } from './style';

export const items: ActionIconGroupProps['items'] = [
  {
    icon: Expand,
    key: 'expand',
    label: '全屏',
  },
  {
    icon: RotateCw,
    key: 'resetCamera',
    label: '重置镜头',
  },
];

export const dropdownMenu: ActionIconGroupProps['dropdownMenu'] = [
  {
    icon: Expand,
    key: 'copy',
    label: 'Copy',
  },
  {
    icon: RotateCw,
    key: 'regenerate',
    label: 'Regenerate',
  },
  {
    type: 'divider',
  },
  {
    icon: Trash,
    key: 'delete',
    label: 'Delete',
  },
];

function VrmViewer() {
  const { viewer, currentAgent } = useSessionStore();
  const ref = useRef<HTMLDivElement>(null);
  const { styles } = useStyles();

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      ref.current && ref.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas && currentAgent) {
        viewer.setup(canvas);
        viewer.loadVrm(currentAgent.path);

        // Drag and DropでVRMを差し替え
        canvas.addEventListener('dragover', function (event) {
          event.preventDefault();
        });

        canvas.addEventListener('drop', function (event) {
          event.preventDefault();

          const files = event.dataTransfer?.files;
          if (!files) {
            return;
          }

          const file = files[0];
          if (!file) {
            return;
          }

          const file_type = file.name.split('.').pop();
          if (file_type === 'vrm') {
            const blob = new Blob([file], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            viewer.loadVrm(url);
          }
        });
      }
      return canvas;
    },
    [viewer, currentAgent],
  );

  return (
    <div className={styles.vrm} ref={ref}>
      <ActionIconGroup
        style={{
          position: 'absolute',
          left: 24,
          bottom: '50%',
        }}
        dropdownMenu={dropdownMenu}
        items={items}
        direction="column"
        onActionClick={(key) => {
          if (key === 'resetCamera') {
            viewer.resetCamera();
          } else if (key === 'expand') {
            toggleFullScreen();
          }
        }}
      />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default memo(VrmViewer);
