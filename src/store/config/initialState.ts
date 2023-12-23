import { Setting, tabType } from '@/types/config';

export interface ConfigState {
  setting: Setting;
  tab: tabType;
  controlPanelOpen: boolean;
  rolePanelOpen: boolean;
}

const initialState: ConfigState = {
  tab: 'agent',
  controlPanelOpen: false,
  rolePanelOpen: false,
  setting: {
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
