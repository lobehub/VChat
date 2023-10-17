import { create } from 'zustand';

export type tabType = 'agent' | 'config' | 'dance' | 'chat' | 'voice';

interface ConfigStore {
  openAiKey: string;
  tab: tabType;
  setTab: (tab: tabType) => void;
  controlPanelOpen: boolean;
  setControlPanelOpen: (open: boolean) => void;
}

export const useConfigStore = create<ConfigStore>()((set) => ({
  tab: 'agent',
  controlPanelOpen: false,
  setTab: (tab) => set({ tab }),
  setControlPanelOpen: (open) => set({ controlPanelOpen: open }),
  openAiKey: '',
}));
