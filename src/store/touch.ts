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
  [TouchAreaEnum.Arm]: [],
  [TouchAreaEnum.Leg]: [],
  [TouchAreaEnum.Chest]: [],
  [TouchAreaEnum.Belly]: [],
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
