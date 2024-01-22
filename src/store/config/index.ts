import { Config, tabType } from '@/types/config';
import { produce } from 'immer';
import { isEqual, merge } from 'lodash-es';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { ConfigState, initialState } from './initialState';
import { configSelectors } from './selectors/config';

export interface ConfigAction {
  setTab: (tab: tabType) => void;
  setControlPanelOpen: (open: boolean) => void;
  setRolePanelOpen: (open: boolean) => void;
  setLivePanelOpen: (open: boolean) => void;
  setChatPanelOpen: (open: boolean) => void;
  setDancePanelOpen: (open: boolean) => void;
  setConfig: (config: Partial<Config>) => void;
  setOpenAIConfig: (config: Partial<Config['languageModel']['openAI']>) => void;
}

export interface ConfigStore extends ConfigState, ConfigAction {}

const createStore: StateCreator<ConfigStore, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,
  setTab: (tab) => set({ tab }),
  setControlPanelOpen: (open) => set({ controlPanelOpen: open }),
  setRolePanelOpen: (open) => set({ rolePanelOpen: open }),
  setLivePanelOpen: (open) => set({ livePanelOpen: open }),
  setChatPanelOpen: (open) => set({ chatPanelOpen: open }),
  setDancePanelOpen: (open) => set({ dancePanelOpen: open }),

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
  devtools(createStore, {
    name: 'VIDOL_CONFIG_STORE',
  }),
  shallow,
);

export { configSelectors };
