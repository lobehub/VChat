import { create } from 'zustand';

interface ConfigStore {
  openAiKey: string;
}

export const useConfigStore = create<ConfigStore>()((set) => ({
  openAiKey: '',
}));
