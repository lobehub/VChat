// @ts-ignore
import { AgentPanel, ChatPanel, ConfigPanel, DancePanel, MarketPanel, RolePanel } from '@/panels';

export const apps = [
  {
    avatar:
      'https://registry.npmmirror.com/@lobehub/assets-emoji/latest/files/assets/card-index.webp',
    key: 'agent',
    label: '角色订阅',
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
