import { convert } from '@/lib/VMDAnimation/vmd2vrmanim';
import { bindToVRM, toOffset } from '@/lib/VMDAnimation/vmd2vrmanim.binding';

import { loadVRMAnimation } from '@/lib/VRMAnimation/loadVRMAnimation';
import { useSessionStore } from '@/store/session';
import { ActionIconGroup, type ActionIconGroupProps } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Expand, RotateCw, Trash } from 'lucide-react';
import { memo, useCallback, useRef } from 'react';
import { useStyles } from './style';

export const items: ActionIconGroupProps['items'] = [
  {
    icon: Expand,
    key: 'expand',
    label: '全屏',
  },
  {
    icon: RotateCw,
    key: 'resetCamera',
    label: '重置镜头',
  },
];

export const dropdownMenu: ActionIconGroupProps['dropdownMenu'] = [
  {
    icon: Expand,
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

function AgentViewer() {
  const { viewer, currentAgent } = useSessionStore();
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

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas && currentAgent) {
        viewer.setup(canvas);
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
              console.log('data', vmd);
              // convert animation to AnimationClip
              const animation = convert(vmd, toOffset(viewer.model.vrm));
              console.log('animation', animation);
              const clip = bindToVRM(animation, viewer.model.vrm);
              console.log('clip', clip);
              const animate = viewer.model.mixer.clipAction(clip);

              //       animate.setLoop(THREE.LoopOnce);
              //       animate.clampWhenFinished = true; // don't reset pos after animation ends
              animate.play(); // play animation
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
          }
        }}
      />
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default memo(AgentViewer);
