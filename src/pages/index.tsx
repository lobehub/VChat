import AgentViewer from '@/features/AgentViewer';
import { tabType, useConfigStore } from '@/store/config';
import { useViewerStore } from '@/store/viewer';
import { ActionIconGroup, type ActionIconGroupProps } from '@lobehub/ui';
import { Expand, MessageSquare, Music2, Pointer, RotateCw, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

const ControlPanel = dynamic(() => import('@/features/ControlPanel'), { ssr: false });
const RolePanel = dynamic(() => import('@/features/RolePanel'), { ssr: false });

export const items: ActionIconGroupProps['items'] = [
  {
    /* @ts-ignore */
    icon: RotateCw,
    key: 'resetCamera',
    label: '重置镜头',
  },
  {
    /* @ts-ignore */
    icon: Expand,
    key: 'expand',
    label: '全屏',
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
    icon: MessageSquare,
    key: 'chat',
    label: '立即聊天',
  },
  {
    /* @ts-ignore */
    icon: Pointer,
    key: 'touch',
    label: '触摸设置',
  },
];

export const dropdownMenu: ActionIconGroupProps['dropdownMenu'] = [];

const Home = () => {
  const viewer = useViewerStore((s) => s.viewer);
  const ref = useRef<HTMLDivElement>(null);
  const { tab, setTab, controlPanelOpen, setControlPanelOpen, rolePanelOpen } = useConfigStore();

  function openPanel(tab: tabType) {
    setControlPanelOpen(true);
    setTab(tab);
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      ref.current && ref.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  return (
    <div ref={ref}>
      <AgentViewer />
      <ActionIconGroup
        style={{
          position: 'absolute',
          display: 'flex',
          left: 24,
          bottom: '50%',
        }}
        dropdownMenu={dropdownMenu}
        items={items}
        direction="column"
        onActionClick={(action) => {
          if (action.key === 'resetCamera') {
            viewer.resetCamera();
          } else if (action.key === 'expand') {
            toggleFullScreen();
          } else if (action.key === 'agent') {
            openPanel('agent');
          } else if (action.key === 'dance') {
            openPanel('dance');
          } else if (action.key === 'chat') {
            openPanel('chat');
          } else if (action.key === 'touch') {
            openPanel('touch');
          }
        }}
      />
      <ControlPanel tab={tab} style={{ display: controlPanelOpen ? 'flex' : 'none' }} />
      <RolePanel style={{ display: rolePanelOpen ? 'flex' : 'none' }} />
    </div>
  );
};

export default Home;
