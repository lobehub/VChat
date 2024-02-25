'use client';

import Application from '@/components/Application';
import {
  AgentPanel,
  ChatPanel,
  ConfigPanel,
  DancePanel,
  LivePanel,
  MarketPanel,
  RolePanel,
} from '@/panels';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import { GithubIcon } from 'lucide-react';
import { useStyles } from './style';

const apps = [
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/card-index.webp',
    key: 'agent',
    label: '联系人',
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
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/play-button.webp',
    key: 'live',
    label: '视频聊天',
    show: false,
    component: <LivePanel />,
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

const Apps = () => {
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);
  const { styles } = useStyles();

  return (
    <div className={styles.apps}>
      {apps
        .filter((app) => app.show)
        .map((app) => {
          return (
            <Application
              key={app.key}
              avatar={app.avatar}
              icon={app.icon}
              name={app.label}
              onClick={() => {
                if (app.component) {
                  setPanel(app.key as any, { open: true });
                } else if (app.link) {
                  window.open(app.link);
                }
              }}
            />
          );
        })}
      {apps
        .filter((app) => app.component)
        .map((app) => {
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
