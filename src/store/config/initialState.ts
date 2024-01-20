import { Config, tabType } from '@/types/config';

export interface ConfigState {
  config: Config;
  tab: tabType;
  controlPanelOpen: boolean;
  rolePanelOpen: boolean;
  livePanelOpen: boolean;
}

const initialState: ConfigState = {
  tab: 'agent',
  controlPanelOpen: false,
  rolePanelOpen: false,
  livePanelOpen: false,
  config: {
    primaryColor: 'blue',
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
