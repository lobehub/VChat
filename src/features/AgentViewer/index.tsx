import { loadVRMAnimation } from '@/lib/VRMAnimation/loadVRMAnimation';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';
import { type ActionIconGroupProps } from '@lobehub/ui';
import { isEqual } from 'lodash-es';

import { memo, useCallback } from 'react';
import { useStyles } from './style';

export const items: ActionIconGroupProps['items'] = [];

function AgentViewer() {
  const viewer = useViewerStore((s) => s.viewer);
  console.log('viewer', viewer);
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s), isEqual);

  const { styles } = useStyles();

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (!viewer.isReady) viewer.setup(canvas);
      if (canvas && currentAgent) {
        viewer.loadVrm(currentAgent.model);

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
          } else if (file_type === 'vrma') {
            const blob = new Blob([file], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            loadVRMAnimation(url).then((vrma) => {
              if (vrma) viewer.model?.loadAnimation(vrma);
            });
          } else if (file_type === 'vmd') {
            const blob = new Blob([file]);
            blob.arrayBuffer().then((vmd) => {
              viewer.model?.dance(vmd);
            });
          } else if (file_type === 'pmx') {
            const blob = new Blob([file]);
            blob.arrayBuffer().then((pmx) => {
              viewer.loadStage(pmx);
            });
          }
        });
      }
      return canvas;
    },
    [viewer, currentAgent],
  );

  return (
    <div className={styles.vrm}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
