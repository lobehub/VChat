import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { AgentStore, createAgentStore } from './slices/agent';
import { PanelStore, createPanelStore } from './slices/panel';

export type MarketStore = PanelStore & AgentStore;

const createStore: StateCreator<MarketStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...createAgentStore(...parameters),
  ...createPanelStore(...parameters),
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
