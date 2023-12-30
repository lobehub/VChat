import { getAgentIndex } from '@/services/agent';
import { MarketStore } from '@/store/market';
import { Agent } from '@/types/agent';
import { isEqual } from 'lodash-es';
import { StateCreator } from 'zustand/vanilla';

export interface AgentStore {
  currentAgentId: string;
  agentList: Agent[];
  agentLoading: boolean;
  activateAgent: (identifier: string) => void;
  deactivateAgent: () => void;
  fetchAgentIndex: () => void;
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
    agentLoading: false,
    activateAgent: (identifier) => {
      set({ currentAgentId: identifier });
    },
    deactivateAgent: () => {
      set({ currentAgentId: undefined });
    },
    fetchAgentIndex: async () => {
      set({ agentLoading: true });
      try {
        const { agents = [] } = await getAgentIndex();
        const { agentList } = get();
        if (!isEqual(agentList, agents)) set({ agentList: agents });
      } catch (error) {
        set({ agentList: [] });
      } finally {
        set({ agentLoading: false });
      }
    },
  };
};
