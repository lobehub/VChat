import { loadVRMAnimation } from '@/lib/VRMAnimation/loadVRMAnimation';
import { tabType, useConfigStore } from '@/store/config';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';
import { ActionIconGroup, type ActionIconGroupProps } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { isEqual } from 'lodash-es';
import { Expand, Mic, Music2, RotateCw, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useCallback, useRef } from 'react';
import { useStyles } from './style';

const ControlPanel = dynamic(() => import('@/features/ControlPanel'), { ssr: false });
const RolePanel = dynamic(() => import('@/features/RolePanel'), { ssr: false });

export const items: ActionIconGroupProps['items'] = [
  {
    /* @ts-ignore */
    icon: Expand,
    key: 'expand',
    label: '全屏',
  },
  {
    /* @ts-ignore */
    icon: RotateCw,
    key: 'resetCamera',
    label: '重置镜头',
  },
  {
    /* @ts-ignore */
    icon: User,
    key: 'agent',
    label: '角色选择',
  },
  {
    /* @ts-ignore */
    icon: Music2,
    key: 'dance',
    label: '舞蹈选择',
  },
  {
    /* @ts-ignore */
    icon: Mic,
    key: 'voice',
    label: '语音设置',
  },
];

export const dropdownMenu: ActionIconGroupProps['dropdownMenu'] = [];

function AgentViewer() {
  const { viewer } = useViewerStore();
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s), isEqual);
  const { tab, setTab, controlPanelOpen, setControlPanelOpen, rolePanelOpen } = useConfigStore();
  const ref = useRef<HTMLDivElement>(null);

  const isHover = useHover(ref);
  const { styles } = useStyles({ isHover });

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      ref.current && ref.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function openPanel(tab: tabType) {
    setControlPanelOpen(true);
    setTab(tab);
  }

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
    <div className={styles.vrm} ref={ref}>
      {<ControlPanel tab={tab} style={{ display: controlPanelOpen ? 'flex' : 'none' }} />}
      {<RolePanel style={{ display: rolePanelOpen ? 'flex' : 'none' }} />}
      <ActionIconGroup
        style={{
          position: 'absolute',
          display: isHover ? 'flex' : 'none',
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
          } else if (key === 'agent') {
            openPanel('agent');
          } else if (key === 'dance') {
            openPanel('dance');
          } else if (key === 'voice') {
            openPanel('voice');
          }
        }}
      />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
