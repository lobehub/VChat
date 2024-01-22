'use client';

import { useConfigStore } from '@/store/config';
import { useMarketStore } from '@/store/market';
import { tabType } from '@/types/config';
import { ActionIconGroup } from '@lobehub/ui';
import { MessageSquare, Music2, ShoppingBag, User, Video } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';

const ChatPanel = dynamic(() => import('@/features/ChatPanel'), { ssr: false });
const LivePanel = dynamic(() => import('@/features/LivePanel'), { ssr: false });
const DancePanel = dynamic(() => import('@/features/DancePanel'), { ssr: false });
const ControlPanel = dynamic(() => import('@/features/ControlPanel'), { ssr: false });
const RolePanel = dynamic(() => import('@/features/RolePanel'), { ssr: false });
const MarketPanel = dynamic(() => import('@/features/MarketPanel'), { ssr: false });

const apps = [
  {
    icon: User,
    key: 'agent',
    label: '联系人',
  },
  {
    icon: Music2,
    key: 'dance',
    label: '跳舞',
  },
  {
    icon: MessageSquare,
    key: 'chat',
    label: '聊天',
  },
  {
    icon: Video,
    key: 'live',
    label: '视频',
  },
  {
    icon: ShoppingBag,
    key: 'market',
    label: '商店',
  },
];

const Home = () => {
  const [
    setTab,
    controlPanelOpen,
    dancePanelOpen,
    chatPanelOpen,
    livePanelOpen,
    rolePanelOpen,
    setControlPanelOpen,
    setChatPanelOpen,
    setLivePanelOpen,
    setDancePanelOpen,
  ] = useConfigStore((s) => [
    s.setTab,
    s.controlPanelOpen,
    s.dancePanelOpen,
    s.chatPanelOpen,
    s.livePanelOpen,
    s.rolePanelOpen,
    s.setControlPanelOpen,
    s.setChatPanelOpen,
    s.setLivePanelOpen,
    s.setDancePanelOpen,
  ]);

  const [marketPanelOpen, setMarketPanelOpen] = useMarketStore((s) => [
    s.marketPanelOpen,
    s.setMarketPanelOpen,
  ]);

  function openControlPanel(tab: tabType) {
    setControlPanelOpen(true);
    setTab(tab);
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

  const chatPanel = useMemo(() => {
    return <ChatPanel style={{ display: chatPanelOpen ? 'flex' : 'none' }} />;
  }, [chatPanelOpen]);

  const livePanel = useMemo(() => {
    return <LivePanel style={{ display: livePanelOpen ? 'flex' : 'none' }} />;
  }, [livePanelOpen]);

  const dancePanel = useMemo(() => {
    return <DancePanel style={{ display: dancePanelOpen ? 'flex' : 'none' }} />;
  }, [dancePanelOpen]);

  return (
    <div>
      <ActionIconGroup
        items={apps}
        onActionClick={(action) => {
          if (action.key === 'agent') {
            openControlPanel('agent');
          } else if (action.key === 'dance') {
            setDancePanelOpen(true);
          } else if (action.key === 'live') {
            setLivePanelOpen(true);
          } else if (action.key === 'chat') {
            setChatPanelOpen(true);
          } else if (action.key === 'market') {
            setMarketPanelOpen(true);
          }
        }}
      />
      {controlPanel}
      {dancePanel}
      {rolePanel}
      {marketPanel}
      {chatPanel}
      {livePanel}
    </div>
  );
};

export default memo(Home);
