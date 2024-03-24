'use client';

import Background from '@/app/desktop/Background';
import Header from '@/app/desktop/Header';
import LivePanel from '@/app/desktop/LivePanel';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import Docker from './Docker';

import { AgentPanel, ChatPanel, ConfigPanel, DancePanel, MarketPanel, RolePanel } from '@/panels';

export const apps = [
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/card-index.webp',
    key: 'agent',
    label: '角色',
    component: <AgentPanel />,
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'dance',
    label: '舞蹈',
    component: <DancePanel />,
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/speech-balloon.webp',
    key: 'chat',
    label: '聊天',
    component: <ChatPanel />,
  },
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/convenience-store.webp',
    key: 'market',
    label: '商店',
    component: <MarketPanel />,
  },

  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/black-nib.webp',
    key: 'role',
    label: '编辑',
    component: <RolePanel />,
  },
  {
    avatar: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/gear.webp',
    key: 'config',
    label: '设置',
    component: <ConfigPanel />,
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
