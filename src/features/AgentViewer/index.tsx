import { loadVRMAnimation } from '@/lib/VRMAnimation/loadVRMAnimation';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';
import { type ActionIconGroupProps } from '@lobehub/ui';
import { memo, useCallback, useEffect } from 'react';

export const items: ActionIconGroupProps['items'] = [];

function AgentViewer() {
  const viewer = useViewerStore((s) => s.viewer);
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));

  useEffect(() => {
    if (currentAgent) {
      viewer.loadVrm(currentAgent.meta.model);
    }
  }, [currentAgent, viewer]);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);

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
    [viewer],
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: 'calc(100vh - 64px)',
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
