import { Setting, tabType } from '@/types/setting';

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
      openai: {
        apikey: '',
        endpoint: '',
      },
    },

    model: 'gpt-3.5-turbo',
  },
};

export { initialState };
