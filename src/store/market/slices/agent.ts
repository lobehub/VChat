import { AGENT_INDEX_URL } from '@/constants/common';
import { getAgentIndex } from '@/services/agent';
import { MarketStore } from '@/store/market';
import { Agent } from '@/types/agent';
import { isEqual } from 'lodash-es';
import { StateCreator } from 'zustand/vanilla';

export interface AgentStore {
  currentAgentId: string;
  agentList: Agent[];
  agentIndexUrl: string;
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
    agentIndexUrl: AGENT_INDEX_URL,
    agentLoading: false,
    activateAgent: (identifier) => {
      set({ currentAgentId: identifier });
    },
    deactivateAgent: () => {
      set({ currentAgentId: undefined });
    },
    fetchAgentIndex: async () => {
      const { agentIndexUrl } = get();
      set({ agentLoading: true });
      try {
        const { agents = [] } = await getAgentIndex(agentIndexUrl);
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
