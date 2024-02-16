import { Config, PanelConfig } from '@/types/config';

export interface ConfigState {
  config: Config;
  panel: PanelConfig;
}

const initialState: ConfigState = {
  panel: {
    agent: {
      open: false,
    },
    role: {
      open: false,
    },
    dance: {
      open: false,
    },
    live: {
      open: false,
    },
    chat: {
      open: false,
    },
    market: {
      open: false,
    },
    config: {
      open: false,
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
