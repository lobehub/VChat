import { MarketStore } from '@/store/market';
import { StateCreator } from 'zustand/vanilla';

export type tabType = 'agent' | 'dance';

export interface PanelStore {
  tab: tabType;
  marketPanelOpen: boolean;
  setTab: (tab: tabType) => void;
  setMarketPanelOpen: (open: boolean) => void;
}

export const createPanelStore: StateCreator<
  MarketStore,
  [['zustand/devtools', never]],
  [],
  PanelStore
> = (set, get) => {
  return {
    tab: 'agent',
    marketPanelOpen: false,
    setTab: (tab) => set({ tab }),
    setMarketPanelOpen: (open) => set({ marketPanelOpen: open }),
  };
};
