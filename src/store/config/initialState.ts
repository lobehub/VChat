import { INITIAL_COORDINATES } from '@/constants/common';
import { Config, PanelConfig, PanelKey } from '@/types/config';

export interface ConfigState {
  config: Config;
  panel: PanelConfig;
  focusList: PanelKey[];
}

const initialState: ConfigState = {
  focusList: [],
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
    chat: {
      open: false,
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
    backgroundEffect: 'glow',
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
