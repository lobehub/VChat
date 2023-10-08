import { create } from 'zustand';

export type tabType = 'agent' | 'config' | 'dance' | 'chat';

interface ConfigStore {
  openAiKey: string;
  tab: tabType;
  setTab: (tab: tabType) => void;
}

export const useConfigStore = create<ConfigStore>()((set) => ({
  tab: 'agent',
  setTab: (tab) => set({ tab }),
  openAiKey: '',
}));
