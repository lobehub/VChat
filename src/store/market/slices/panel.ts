import { MarketStore } from '@/store/market';
import { StateCreator } from 'zustand/vanilla';

export type tabType = 'agent' | 'dance';

export interface PanelStore {
  tab: tabType;
  setTab: (tab: tabType) => void;
}

export const createPanelStore: StateCreator<
  MarketStore,
  [['zustand/devtools', never]],
  [],
  PanelStore
> = (set, get) => {
  return {
    tab: 'agent',
    setTab: (tab) => set({ tab }),
  };
};
