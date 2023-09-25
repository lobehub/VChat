import { useSessionStore } from '@/store/session';
import { ActionIconGroup, type ActionIconGroupProps } from '@lobehub/ui';
import { Copy, RotateCw, Trash } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useStyles } from './style';

export const items: ActionIconGroupProps['items'] = [
  {
    icon: Copy,
    key: 'copy',
    label: 'Copy',
  },
  {
    icon: RotateCw,
    key: 'regenerate',
    label: 'Regenerate',
  },
];

export const dropdownMenu: ActionIconGroupProps['dropdownMenu'] = [
  {
    icon: Copy,
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
  const { styles } = useStyles();

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
    },
    [viewer, currentAgent],
  );

  return (
    <div className={styles.vrm}>
      <ActionIconGroup
        style={{
          position: 'absolute',
          right: 24,
          bottom: '50%',
        }}
        dropdownMenu={dropdownMenu}
        items={items}
        direction="column"
        onActionClick={(key) => console.log(key)}
      />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default memo(VrmViewer);
