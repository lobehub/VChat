import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

export type tabType = 'agent' | 'dance' | 'config';

interface MarketStore {
  tab: tabType;
  setTab: (tab: tabType) => void;
  marketPanelOpen: boolean;
  setMarketPanelOpen: (open: boolean) => void;
}

const createStore: StateCreator<MarketStore, [['zustand/devtools', never]]> = (set, get) => ({
  tab: 'agent',
  marketPanelOpen: false,
  setTab: (tab) => set({ tab }),
  setMarketPanelOpen: (open) => set({ marketPanelOpen: open }),
});

export const useMarketStore = createWithEqualityFn<MarketStore>()(
  persist(
    devtools(createStore, {
      name: 'VIDOL_MARKET_STORE',
    }),
    {
      name: 'vidol-chat-market-storage', // name of the item in the storage (must be unique)
    },
  ),
  shallow,
);
