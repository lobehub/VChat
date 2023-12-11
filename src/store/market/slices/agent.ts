import { MarketStore } from '@/store/market';
import { StateCreator } from 'zustand/vanilla';

export interface AgentStore {
  currentAgentId: string;
  activateAgent: (identifier: string) => void;
  deactivateAgent: () => void;
}

export const createAgentStore: StateCreator<
  MarketStore,
  [['zustand/devtools', never]],
  [],
  AgentStore
> = (set, get) => {
  return {
    currentAgentId: '',
    activateAgent: (identifier) => {
      set({ currentAgentId: identifier });
    },
    deactivateAgent: () => {
      set({ currentAgentId: undefined });
    },
  };
};
