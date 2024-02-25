import { Config, PanelConfig } from '@/types/config';

export interface ConfigState {
  config: Config;
  panel: PanelConfig;
}

const INITIAL_COORDINATES = { x: 360, y: 360 };

const initialState: ConfigState = {
  panel: {
    agent: {
      open: false,
      coordinates: INITIAL_COORDINATES,
    },
    role: {
      open: false,
      coordinates: INITIAL_COORDINATES,
    },
    dance: {
      open: false,
      coordinates: INITIAL_COORDINATES,
    },
    live: {
      open: false,
      coordinates: INITIAL_COORDINATES,
    },
    // 默认打开聊天窗口
    chat: {
      open: true,
      coordinates: INITIAL_COORDINATES,
    },
    market: {
      open: false,
      coordinates: INITIAL_COORDINATES,
    },
    config: {
      open: false,
      coordinates: INITIAL_COORDINATES,
    },
  },

  config: {
    primaryColor: 'blue',
    backgroundEffect: 'sakura',
    languageModel: {
      openAI: {
        apikey: '',
        endpoint: '',
        model: 'gpt-3.5-turbo',
      },
    },
  },
};

export { initialState };
