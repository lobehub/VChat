import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';
import { ActionIconGroup, type ActionIconGroupProps } from '@lobehub/ui';
import { Expand, RotateCw } from 'lucide-react';
import { memo, useCallback, useEffect, useRef } from 'react';

export const items: ActionIconGroupProps['items'] = [];

function AgentViewer() {
  const viewer = useViewerStore((s) => s.viewer);
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));
  const ref = useRef<HTMLDivElement>(null);

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

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      ref.current && ref.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  return (
    <div ref={ref}>
      <ActionIconGroup
        style={{
          position: 'absolute',
          display: 'flex',
          left: 24,
          bottom: '50%',
        }}
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
        ]}
        direction="column"
        onActionClick={(action) => {
          if (action.key === 'resetCamera') {
            viewer.resetCamera();
          } else if (action.key === 'expand') {
            toggleFullScreen();
          }
        }}
      />
      <canvas ref={canvasRef} width={900} height={640}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
