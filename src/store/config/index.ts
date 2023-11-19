import { produce } from 'immer';
import { isEqual, merge } from 'lodash-es';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

export type tabType = 'agent' | 'config' | 'dance' | 'chat' | 'voice' | 'touch';

interface Setting {
  apikey: string;
  endpoint: string;
  model?: string;
}

interface ConfigStore {
  setting: Setting;
  tab: tabType;
  setTab: (tab: tabType) => void;
  controlPanelOpen: boolean;
  rolePanelOpen: boolean;
  setControlPanelOpen: (open: boolean) => void;
  setRolePanelOpen: (open: boolean) => void;
  setSetting: (setting: Partial<Setting>) => void;
}

const createStore: StateCreator<ConfigStore, [['zustand/devtools', never]]> = (set, get) => ({
  tab: 'agent',
  controlPanelOpen: false,
  rolePanelOpen: false,
  setTab: (tab) => set({ tab }),
  setControlPanelOpen: (open) => set({ controlPanelOpen: open }),
  setRolePanelOpen: (open) => set({ rolePanelOpen: open }),
  setting: {
    apikey: '',
    endpoint: '',
    model: 'gpt-3.5-turbo',
  },
  setSetting: (setting) => {
    const prevSetting = get().setting;
    const nextSetting = produce(prevSetting, (draftState) => {
      merge(draftState, setting);
    });
    if (isEqual(prevSetting, nextSetting)) return;
    set({ setting: nextSetting });
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
