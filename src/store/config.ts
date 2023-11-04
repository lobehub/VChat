import { create } from 'zustand';

export type tabType = 'agent' | 'config' | 'dance' | 'chat' | 'voice';

interface ConfigStore {
  openAiKey: string;
  tab: tabType;
  setTab: (tab: tabType) => void;
  controlPanelOpen: boolean;
  rolePanelOpen: boolean;
  setControlPanelOpen: (open: boolean) => void;
  setRolePanelOpen: (open: boolean) => void;
}

export const useConfigStore = create<ConfigStore>()((set) => ({
  tab: 'agent',
  controlPanelOpen: false,
  rolePanelOpen: false,
  setTab: (tab) => set({ tab }),
  setControlPanelOpen: (open) => set({ controlPanelOpen: open }),
  setRolePanelOpen: (open) => set({ rolePanelOpen: open }),
  openAiKey: '',
}));
