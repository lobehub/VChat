import PageLoading from '@/components/PageLoading';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';
import { ActionIconGroup } from '@lobehub/ui';
import { Expand, RotateCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

function AgentViewer() {
  const viewer = useViewerStore((s) => s.viewer);
  const [loading, setLoading] = useState(false);
  const currentLiveAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLiveAgent) {
      setLoading(true);
      viewer.loadVrm(currentLiveAgent.meta.model).finally(() => {
        setLoading(false);
      });
    }
  }, [currentLiveAgent, viewer]);

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
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <ActionIconGroup
        style={{
          position: 'absolute',
          display: 'flex',
          right: 24,
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
      {loading ? <PageLoading title={'模型加载中，请稍后...'} /> : null}
      <canvas ref={canvasRef} width={900} height={640}></canvas>
    </div>
  );
}

export default AgentViewer;
