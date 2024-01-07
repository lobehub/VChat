'use client';

import { useConfigStore } from '@/store/config';
import { useMarketStore } from '@/store/market';
import { useViewerStore } from '@/store/viewer';
import { tabType } from '@/types/config';
import { ActionIconGroup } from '@lobehub/ui';
import { Expand, MessageSquare, Music2, Pointer, RotateCw, ShoppingBag, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useMemo, useRef } from 'react';

const ControlPanel = dynamic(() => import('@/features/ControlPanel'), { ssr: false });
const RolePanel = dynamic(() => import('@/features/RolePanel'), { ssr: false });
const AgentViewer = dynamic(() => import('@/features/AgentViewer'), { ssr: false });
const MarketPanel = dynamic(() => import('@/features/MarketPanel'), { ssr: false });

const Home = () => {
  const viewer = useViewerStore((s) => s.viewer);
  const ref = useRef<HTMLDivElement>(null);
  const [setTab, controlPanelOpen, setControlPanelOpen, rolePanelOpen] = useConfigStore((s) => [
    s.setTab,
    s.controlPanelOpen,
    s.setControlPanelOpen,
    s.rolePanelOpen,
  ]);

  const [marketPanelOpen, setMarketPanelOpen] = useMarketStore((s) => [
    s.marketPanelOpen,
    s.setMarketPanelOpen,
  ]);

  function openControlPanel(tab: tabType) {
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

  const controlPanel = useMemo(() => {
    return <ControlPanel style={{ display: controlPanelOpen ? 'flex' : 'none' }} />;
  }, [controlPanelOpen]);

  const rolePanel = useMemo(() => {
    return <RolePanel style={{ display: rolePanelOpen ? 'flex' : 'none' }} />;
  }, [rolePanelOpen]);

  const marketPanel = useMemo(() => {
    return <MarketPanel style={{ display: marketPanelOpen ? 'flex' : 'none' }} />;
  }, [marketPanelOpen]);

  console.log('render');

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
          {
            icon: User,
            key: 'agent',
            label: '角色选择',
          },
          {
            icon: Music2,
            key: 'dance',
            label: '舞蹈选择',
          },
          {
            icon: MessageSquare,
            key: 'chat',
            label: '立即聊天',
          },
          {
            icon: Pointer,
            key: 'touch',
            label: '触摸设置',
          },
          {
            icon: ShoppingBag,
            key: 'market',
            label: '虚拟商店',
          },
        ]}
        direction="column"
        onActionClick={(action) => {
          if (action.key === 'resetCamera') {
            viewer.resetCamera();
          } else if (action.key === 'expand') {
            toggleFullScreen();
          } else if (action.key === 'agent') {
            openControlPanel('agent');
          } else if (action.key === 'dance') {
            openControlPanel('dance');
          } else if (action.key === 'chat') {
            openControlPanel('chat');
          } else if (action.key === 'touch') {
            openControlPanel('touch');
          } else if (action.key === 'market') {
            setMarketPanelOpen(true);
          }
        }}
      />
      {controlPanel}
      {rolePanel}
      {marketPanel}
    </div>
  );
};

export default memo(Home);
