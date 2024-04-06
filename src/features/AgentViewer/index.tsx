import PageLoading from '@/components/PageLoading';
import ToolBar from '@/features/AgentViewer/ToolBar';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';
import { memo, useCallback, useEffect, useState } from 'react';

function AgentViewer() {
  const viewer = useViewerStore((s) => s.viewer);
  const [loading, setLoading] = useState(false);
  const currentAgentModel = useSessionStore((s) => sessionSelectors.currentAgentModel(s));

  useEffect(() => {
    if (currentAgentModel) {
      setLoading(true);
      viewer.loadVrm(currentAgentModel).finally(() => {
        setLoading(false);
      });
    }
  }, [currentAgentModel, viewer]);

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
        height: '100%',
      }}
    >
      <ToolBar style={{ position: 'absolute', display: 'flex', right: 24, bottom: '50%' }} />
      {loading ? <PageLoading title={'模型加载中，请稍后...'} /> : null}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
