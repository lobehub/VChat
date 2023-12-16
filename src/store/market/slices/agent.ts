import { AGENT_INDEX_URL } from '@/constants/common';
import { MarketStore } from '@/store/market';
import { Agent } from '@/types/agent';
import { StateCreator } from 'zustand/vanilla';

export interface AgentStore {
  currentAgentId: string;
  agentList: Agent[];
  agentIndexUrl: string;
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
    agentList: [],
    agentIndexUrl: AGENT_INDEX_URL,
    activateAgent: (identifier) => {
      set({ currentAgentId: identifier });
    },
    deactivateAgent: () => {
      set({ currentAgentId: undefined });
    },
  };
};
