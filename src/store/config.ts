import { isEqual, merge } from 'lodash-es';
import { create } from 'zustand';

export type tabType = 'agent' | 'config' | 'dance' | 'chat' | 'voice' | 'touch';

interface Setting {
  OPENAI_API_KEY: string;
  endpoint?: string;
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

export const useConfigStore = create<ConfigStore>()((set, get) => ({
  tab: 'agent',
  controlPanelOpen: false,
  rolePanelOpen: false,
  setTab: (tab) => set({ tab }),
  setControlPanelOpen: (open) => set({ controlPanelOpen: open }),
  setRolePanelOpen: (open) => set({ rolePanelOpen: open }),
  setting: {
    OPENAI_API_KEY: '',
    endpoint: '',
    model: 'gpt-3.5-turbo',
  },
  setSetting: (setting) => {
    const prevSetting = get().setting;
    const nextSetting = merge(prevSetting, setting);
    if (isEqual(prevSetting, nextSetting)) return;
    set({ setting: nextSetting });
  },
}));
