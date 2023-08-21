import { ViewerContext } from '@/features/vrmViewer/viewerContext';
import { buildUrl } from '@/utils/buildUrl';
import { Spin } from 'antd';
import { useCallback, useContext } from 'react';
import { useStyles } from './style';

export default function VrmViewer() {
  const { viewer } = useContext(ViewerContext);
  const { styles } = useStyles();

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
        viewer.loadVrm(buildUrl('/AvatarSample_B.vrm'));

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
    [viewer],
  );

  return (
    <div className={styles.vrm}>
      <div className={styles.loading}>{!viewer.isReady && <Spin />}</div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
