import { useAgentStore } from '@/store/role';

import { Spin } from 'antd';
import { memo, useCallback } from 'react';
import { useStyles } from './style';

function VrmViewer() {
  const { viewer, currentRole } = useAgentStore();
  const { styles } = useStyles();

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas && currentRole) {
        viewer.setup(canvas);
        viewer.loadVrm(currentRole.modelPath);

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
    [viewer, currentRole],
  );

  return (
    <div className={styles.vrm}>
      <div className={styles.loading}>{!viewer.isReady && <Spin />}</div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default memo(VrmViewer);
