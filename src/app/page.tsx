'use client';

import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import { ActionIconGroup } from '@lobehub/ui';
import { MessageSquare, Music2, Settings2, ShoppingBag, User, Video } from 'lucide-react';

import {
  AgentPanel,
  ChatPanel,
  ConfigPanel,
  DancePanel,
  LivePanel,
  MarketPanel,
  RolePanel,
} from '@/panels';

const apps = [
  {
    icon: User,
    key: 'agent',
    label: '联系人',
    component: <AgentPanel />,
  },
  {
    icon: Music2,
    key: 'dance',
    label: '跳舞',
    component: <DancePanel />,
  },
  {
    icon: MessageSquare,
    key: 'chat',
    label: '聊天',
    component: <ChatPanel />,
  },
  {
    icon: Video,
    key: 'live',
    label: '视频',
    component: <LivePanel />,
  },
  {
    icon: ShoppingBag,
    key: 'market',
    label: '商店',
    component: <MarketPanel />,
  },
  {
    icon: Settings2,
    key: 'config',
    label: '设置',
    component: <ConfigPanel />,
  },
  {
    icon: User,
    key: 'role',
    label: '角色',
    component: <RolePanel />,
  },
];

const Home = () => {
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);

  return (
    <div>
      <ActionIconGroup
        items={apps}
        onActionClick={(action) => {
          setPanel(action.key as any, { open: true });
        }}
      />
      {apps.map((app) => {
        const open = panel[app.key as PanelKey].open;
        const component = app.component;
        return (
          <div key={app.key} style={{ display: open ? 'flex' : 'none' }}>
            {component}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
