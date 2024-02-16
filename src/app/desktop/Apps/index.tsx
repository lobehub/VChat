'use client';

import Application from '@/components/Application';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import { useStyles } from './style';

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
    icon: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'agent',
    label: '联系人',
    component: <AgentPanel />,
  },
  {
    icon: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'dance',
    label: '舞蹈',
    component: <DancePanel />,
  },
  {
    icon: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'chat',
    label: '聊天',
    component: <ChatPanel />,
  },
  {
    icon: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'live',
    label: '视频',
    component: <LivePanel />,
  },
  {
    icon: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'market',
    label: '商店',
    component: <MarketPanel />,
  },
  {
    icon: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'config',
    label: '设置',
    component: <ConfigPanel />,
  },
  {
    icon: 'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/folding-hand-fan.webp',
    key: 'role',
    label: '角色',
    component: <RolePanel />,
  },
];

const Apps = () => {
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);
  const { styles } = useStyles();

  return (
    <div className={styles.apps}>
      {apps.map((app) => {
        return (
          <Application
            key={app.key}
            icon={app.icon}
            name={app.label}
            onClick={() => {
              setPanel(app.key as any, { open: true });
            }}
          />
        );
      })}
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

export default Apps;
