import { FOCUS_Z_INDEX } from '@/constants/common';
import { Config, Panel, PanelKey } from '@/types/config';
import { produce } from 'immer';
import { isEqual, merge } from 'lodash-es';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { ConfigState, initialState } from './initialState';
import { configSelectors } from './selectors/config';

export interface ConfigAction {
  setPanel: (panel: PanelKey, config: Partial<Panel>) => void;
  setConfig: (config: Partial<Config>) => void;
  setOpenAIConfig: (config: Partial<Config['languageModel']['openAI']>) => void;
}

export interface ConfigStore extends ConfigState, ConfigAction {}

const createStore: StateCreator<ConfigStore, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,
  setPanel: (panel, config) => {
    const prevSetting = get().panel[panel];
    const nextSetting = produce(prevSetting, (draftState) => {
      merge(draftState, config);
      if (config.open) draftState.zIndex = FOCUS_Z_INDEX;
    });

    if (isEqual(prevSetting, nextSetting)) return;
    set((state) => ({
      panel: {
        ...state.panel,
        [panel]: nextSetting,
      },
    }));
  },

  setConfig: (config) => {
    const prevSetting = get().config;
    const nextSetting = produce(prevSetting, (draftState) => {
      merge(draftState, config);
    });
    if (isEqual(prevSetting, nextSetting)) return;
    set({ config: nextSetting });
  },
  setOpenAIConfig: (config) => {
    get().setConfig({ languageModel: { openAI: config } });
  },
});

export const useConfigStore = createWithEqualityFn<ConfigStore>()(
  persist(
    devtools(createStore, {
      name: 'VIDOL_CONFIG_STORE',
    }),
    { name: 'vidol-chat-config-storage' },
  ),
  shallow,
);

export { configSelectors };
