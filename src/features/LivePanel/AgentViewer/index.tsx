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
      }
      return canvas;
    },
    [viewer],
  );

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
