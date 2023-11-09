import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { StateCreator } from 'zustand/vanilla';
import { TouchAreaEnum } from './type';

interface TouchActionConfig {
  [TouchAreaEnum.Head]: TouchAction[];
  [TouchAreaEnum.Arm]: TouchAction[];
  [TouchAreaEnum.Leg]: TouchAction[];
  [TouchAreaEnum.Chest]: TouchAction[];
  [TouchAreaEnum.Belly]: TouchAction[];
  enabled: boolean;
}

const DEFAULT_TOUCH_ACTION_CONFIG: TouchActionConfig = {
  [TouchAreaEnum.Head]: [
    {
      text: '哇!最喜欢摸摸头!',
      enabled: true,
    },
    {
      text: '感觉又充满了力量呢!',
      enabled: true,
    },
    {
      text: '哇塞，这个摸摸头的感觉好神奇!',
      enabled: true,
    },
    {
      text: '摸摸头让我开心一整天!',
      enabled: true,
    },
    {
      text: '听说被摸头是会长不高的呢!',
      enabled: true,
    },
    {
      text: '干嘛戳我呀？',
      enabled: true,
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      text: '啊，好喜欢呢~',
      enabled: true,
    },
    {
      text: '主人的手好温暖啊~',
      enabled: true,
    },
    {
      text: '哈哈，牵手让我感到快乐~',
      enabled: true,
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      text: '让我们保持纯洁的友谊不好吗？',
      enabled: true,
    },
    {
      text: '喂，你是要作死吗?',
      enabled: true,
    },
    {
      text: '主人的手又不听指挥了吗?',
      enabled: true,
    },
    {
      text: '讨厌~会痒的啦~!',
      enabled: true,
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      text: '不可以这样欺负我啦！快把手拿开！',
      enabled: true,
    },
    {
      text: '幺幺零吗？这里有个变态一直在摸我！',
      enabled: true,
    },
    {
      text: '再摸的话我可要报警了',
      enabled: true,
    },
    {
      text: '干嘛戳我呀！还能不能愉快地聊天了!',
      enabled: true,
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      text: '是不小心碰到的吧...',
      enabled: true,
    },
    {
      text: '干嘛动我呀，小心我咬你哦！',
      enabled: true,
    },
    {
      text: '醒醒，我们之间没有结果的!',
      enabled: true,
    },
    {
      text: '讨厌！我可要生气啦！',
      enabled: true,
    },
  ],
  enabled: true,
};

interface TouchAction {
  text: string;
  motion?: string;
  emotion?: string;
  enabled: boolean;
}

interface TouchStore {
  actionConfig: TouchActionConfig;
  createTouchAction: (area: TouchAreaEnum, action: TouchAction) => void;
}

const createTouchStore: StateCreator<TouchStore, [['zustand/devtools', never]]> = (set, get) => ({
  actionConfig: DEFAULT_TOUCH_ACTION_CONFIG,
  createTouchAction: (area, action) => {
    const { actionConfig } = get();
    const actions = actionConfig[area];
    actions.push(action);
    set({ actionConfig: { ...actionConfig, [area]: actions } });
  },
});

export const useTouchStore = create<TouchStore>()(
  persist(
    devtools(createTouchStore, {
      name: 'TOUCH_STORE',
    }),
    {
      name: 'vidol-chat-touch-storage', // name of the item in the storage (must be unique)
    },
  ),
);
