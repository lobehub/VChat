'use client';

import Background from '@/app/desktop/Background';
import Header from '@/app/desktop/Header';
import LivePanel from '@/app/desktop/LivePanel';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import Docker from './Docker';

import { AgentPanel, ChatPanel, ConfigPanel, DancePanel, MarketPanel, RolePanel } from '@/panels';
import { GithubIcon } from 'lucide-react';

export const apps = [
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/card-index.webp',
    key: 'agent',
    label: '角色',
    show: true,
    component: <AgentPanel />,
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'dance',
    label: '舞蹈',
    show: true,
    component: <DancePanel />,
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/speech-balloon.webp',
    key: 'chat',
    label: '聊天',
    show: true,
    component: <ChatPanel />,
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/convenience-store.webp',
    key: 'market',
    label: '商店',
    show: true,
    component: <MarketPanel />,
  },
  {
    avatar: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/gear.webp',
    key: 'config',
    label: '设置',
    show: true,
    component: <ConfigPanel />,
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'role',
    label: '角色',
    show: false,
    component: <RolePanel />,
  },
  {
    icon: GithubIcon,
    key: 'github',
    label: 'Github',
    link: 'https://github.com/v-idol/vidol.chat',
    show: true,
  },
];

const Desktop = () => {
  const [panel] = useConfigStore((s) => [s.panel]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <Header />
      <div style={{ height: 'calc(100vh - 64px)' }}>
        <LivePanel />
        {apps
          .filter((app) => app.component)
          .map((app) => {
            const open = panel[app.key as PanelKey].open;
            const min = panel[app.key as PanelKey].min;
            const component = app.component;
            return open ? (
              <div key={app.key} style={{ display: min ? 'none' : 'flex' }}>
                {component}
              </div>
            ) : null;
          })}
      </div>
      <Docker />
      <Background />
    </div>
  );
};

export default Desktop;
