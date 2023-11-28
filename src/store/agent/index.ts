import { DEFAULT_AGENT } from '@/constants/defaultAgent';
import { getLocalAgentList } from '@/services/agent';
import { Agent } from '@/types/agent';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface AgentStore {
  loading: boolean;
  activateAgent: (identifier: string) => void;
  deactivateAgent: () => void;
  currentIdentifier: string;
  agentList: Agent[];
  fetchAgentList: () => void;
  getAgentById: (id: string) => Agent | undefined;
}

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  persist(
    (set, get) => ({
      currentIdentifier: '',
      loading: false,
      agentList: [DEFAULT_AGENT],
      fetchAgentList: async () => {
        set({ loading: true });
        const res = await getLocalAgentList();
        set({ agentList: [...res.data, DEFAULT_AGENT], loading: false });
      },
      activateAgent: (identifier) => {
        set({ currentIdentifier: identifier });
      },
      deactivateAgent: () => {
        set({ currentIdentifier: undefined }, false);
      },
      getAgentById: (id: string): Agent | undefined => {
        const { agentList } = get();
        const currentAgent = agentList.find((item) => item.agentId === id);
        if (!currentAgent) return undefined;

        return currentAgent;
      },
    }),
    {
      name: 'vidol-agent',
    },
  ),
  shallow,
);

const showSideBar = (s: AgentStore) => !!s.currentIdentifier;

const currentAgentItem = (s: AgentStore): Agent | undefined => {
  const { agentList, currentIdentifier } = s;
  const currentAgent = agentList.find((item) => item.name === currentIdentifier);
  if (!currentAgent) return undefined;

  return currentAgent;
};

export const agentListSelectors = {
  showSideBar,
  currentAgentItem,
};
