import { INITIAL_COORDINATES, INITIAL_Z_INDEX } from '@/constants/common';
import { Config, PanelConfig } from '@/types/config';

export interface ConfigState {
  config: Config;
  panel: PanelConfig;
}

const initialState: ConfigState = {
  panel: {
    global: {
      open: false,
      coordinates: INITIAL_COORDINATES,
      zIndex: INITIAL_Z_INDEX,
    },
    agent: {
      open: false,
      coordinates: INITIAL_COORDINATES,
      zIndex: INITIAL_Z_INDEX,
    },
    role: {
      open: false,
      coordinates: INITIAL_COORDINATES,
      zIndex: INITIAL_Z_INDEX,
    },
    dance: {
      open: false,
      coordinates: INITIAL_COORDINATES,
      zIndex: INITIAL_Z_INDEX,
    },
    live: {
      open: false,
      coordinates: INITIAL_COORDINATES,
      zIndex: INITIAL_Z_INDEX,
    },
    // 默认打开聊天窗口
    chat: {
      open: true,
      coordinates: INITIAL_COORDINATES,
      zIndex: INITIAL_Z_INDEX,
    },
    market: {
      open: false,
      coordinates: INITIAL_COORDINATES,
      zIndex: INITIAL_Z_INDEX,
    },
    config: {
      open: false,
      coordinates: INITIAL_COORDINATES,
      zIndex: INITIAL_Z_INDEX,
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
