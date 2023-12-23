import { Setting, tabType } from '@/types/config';
import { produce } from 'immer';
import { isEqual, merge } from 'lodash-es';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { ConfigState, initialState } from './initialState';
import { configSelectors } from './selectors/config';

export interface ConfigAction {
  setTab: (tab: tabType) => void;
  setControlPanelOpen: (open: boolean) => void;
  setRolePanelOpen: (open: boolean) => void;
  setSetting: (setting: Partial<Setting>) => void;
  setOpenAISetting: (setting: Partial<Setting['languageModel']['openAI']>) => void;
}

export interface ConfigStore extends ConfigState, ConfigAction {}

const createStore: StateCreator<ConfigStore, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,
  setTab: (tab) => set({ tab }),
  setControlPanelOpen: (open) => set({ controlPanelOpen: open }),
  setRolePanelOpen: (open) => set({ rolePanelOpen: open }),

  setSetting: (setting) => {
    const prevSetting = get().setting;
    const nextSetting = produce(prevSetting, (draftState) => {
      merge(draftState, setting);
    });
    if (isEqual(prevSetting, nextSetting)) return;
    set({ setting: nextSetting });
  },
  setOpenAISetting: (setting) => {
    get().setSetting({ languageModel: { openAI: setting } });
  },
});

export const useConfigStore = createWithEqualityFn<ConfigStore>()(
  persist(
    devtools(createStore, {
      name: 'VIDOL_CONFIG_STORE',
    }),
    {
      name: 'vidol-chat-config-storage', // name of the item in the storage (must be unique)
    },
  ),
  shallow,
);

export { configSelectors };
