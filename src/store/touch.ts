import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { StateCreator } from 'zustand/vanilla';
import { EmotionType, TouchAreaEnum } from './type';

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
      emotion: 'happy',
      enabled: true,
    },
    {
      text: '感觉又充满了力量呢!',
      emotion: 'happy',
      enabled: true,
    },
    {
      text: '哇塞，这个摸摸头的感觉好神奇!',
      emotion: 'happy',
      enabled: true,
    },
    {
      text: '摸摸头让我开心一整天!',
      emotion: 'happy',
      enabled: true,
    },
    {
      text: '听说被摸头是会长不高的呢!',
      emotion: 'sad',
      enabled: true,
    },
    {
      text: '干嘛戳我呀？',
      emotion: 'angry',
      enabled: true,
    },
  ],
  [TouchAreaEnum.Arm]: [
    {
      text: '啊，好喜欢呢~',
      emotion: 'happy',
      enabled: true,
    },
    {
      text: '主人的手好温暖啊~',
      emotion: 'relaxed',
      enabled: true,
    },
    {
      text: '哈哈，牵手让我感到快乐~',
      emotion: 'happy',
      enabled: true,
    },
  ],
  [TouchAreaEnum.Leg]: [
    {
      text: '让我们保持纯洁的友谊不好吗？',
      emotion: 'surprised',
      enabled: true,
    },
    {
      text: '喂，你是要作死吗?',
      emotion: 'angry',
      enabled: true,
    },
    {
      text: '主人的手又不听指挥了吗?',
      emotion: 'angry',
      enabled: true,
    },
    {
      text: '讨厌~会痒的啦~!',
      emotion: 'angry',
      enabled: true,
    },
  ],
  [TouchAreaEnum.Chest]: [
    {
      text: '不可以这样欺负我啦！快把手拿开！',
      emotion: 'angry',
      enabled: true,
    },
    {
      text: '幺幺零吗？这里有个变态一直在摸我！',
      emotion: 'angry',
      enabled: true,
    },
    {
      text: '再摸的话我可要报警了',
      emotion: 'angry',
      enabled: true,
    },
    {
      text: '干嘛戳我呀！还能不能愉快地聊天了!',
      emotion: 'surprised',
      enabled: true,
    },
  ],
  [TouchAreaEnum.Belly]: [
    {
      text: '是不小心碰到的吧...',
      emotion: 'surprised',
      enabled: true,
    },
    {
      text: '干嘛动我呀，小心我咬你哦！',
      emotion: 'angry',
      enabled: true,
    },
    {
      text: '醒醒，我们之间没有结果的!',
      emotion: 'relaxed',
      enabled: true,
    },
    {
      text: '讨厌！我可要生气啦！',
      emotion: 'relaxed',
      enabled: true,
    },
  ],
  enabled: true,
};

interface TouchAction {
  text: string;
  motion?: string;
  emotion: EmotionType;
  enabled: boolean;
}

interface TouchStore {
  currentTouchArea: TouchAreaEnum;
  setCurrentTouchArea: (area: TouchAreaEnum) => void;
  actionConfig: TouchActionConfig;
  createTouchAction: (area: TouchAreaEnum, action: TouchAction) => void;
}

const createTouchStore: StateCreator<TouchStore, [['zustand/devtools', never]]> = (set, get) => ({
  currentTouchArea: TouchAreaEnum.Head,
  setCurrentTouchArea(area) {
    set({ currentTouchArea: area });
  },
  actionConfig: DEFAULT_TOUCH_ACTION_CONFIG,
  createTouchAction: (area, action) => {
    const { actionConfig } = get();
    const actions = actionConfig[area];
    actions.push(action);
    set({ actionConfig: { ...actionConfig, [area]: actions } });
  },
});

export const useTouchStore = create<TouchStore>()(
  devtools(createTouchStore, {
    name: 'TOUCH_STORE',
  }),
);
