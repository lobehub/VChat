'use client';

import { useConfigStore } from '@/store/config';
import { useMarketStore } from '@/store/market';
import { ActionIconGroup } from '@lobehub/ui';
import { MessageSquare, Music2, Settings2, ShoppingBag, User, Video } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useMemo } from 'react';

const ChatPanel = dynamic(() => import('@/features/ChatPanel'), { ssr: false });
const LivePanel = dynamic(() => import('@/features/LivePanel'), { ssr: false });
const ConfigPanel = dynamic(() => import('@/features/ConfigPanel'), { ssr: false });
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
  {
    icon: Settings2,
    key: 'config',
    label: '设置',
  },
];

const Home = () => {
  const [
    controlPanelOpen,
    dancePanelOpen,
    chatPanelOpen,
    livePanelOpen,
    rolePanelOpen,
    configPanelOpen,
    setControlPanelOpen,
    setChatPanelOpen,
    setLivePanelOpen,
    setDancePanelOpen,
    setConfigPanelOpen,
  ] = useConfigStore((s) => [
    s.controlPanelOpen,
    s.dancePanelOpen,
    s.chatPanelOpen,
    s.livePanelOpen,
    s.rolePanelOpen,
    s.configPanelOpen,
    s.setControlPanelOpen,
    s.setChatPanelOpen,
    s.setLivePanelOpen,
    s.setDancePanelOpen,
    s.setConfigPanelOpen,
  ]);

  const [marketPanelOpen, setMarketPanelOpen] = useMarketStore((s) => [
    s.marketPanelOpen,
    s.setMarketPanelOpen,
  ]);

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

  const configPanel = useMemo(() => {
    return <ConfigPanel style={{ display: configPanelOpen ? 'flex' : 'none' }} />;
  }, [configPanelOpen]);

  return (
    <div>
      <ActionIconGroup
        items={apps}
        onActionClick={(action) => {
          if (action.key === 'agent') {
            setControlPanelOpen(true);
          } else if (action.key === 'dance') {
            setDancePanelOpen(true);
          } else if (action.key === 'live') {
            setLivePanelOpen(true);
          } else if (action.key === 'chat') {
            setChatPanelOpen(true);
          } else if (action.key === 'market') {
            setMarketPanelOpen(true);
          } else if (action.key === 'config') {
            setConfigPanelOpen(true);
          }
        }}
      />
      {controlPanel}
      {dancePanel}
      {rolePanel}
      {marketPanel}
      {chatPanel}
      {livePanel}
      {configPanel}
    </div>
  );
};

export default memo(Home);
