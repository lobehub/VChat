import { getLocalAgentList } from '@/services/agent';
import { Agent } from '@/types/agent';
import { create } from 'zustand';

interface AgentStore {
  loading: boolean;
  activateAgent: (identifier: string) => void;
  deactivateAgent: () => void;
  currentIdentifier: string;
  agentList: Agent[];
  fetchAgentList: () => void;
  getAgentById: (id: string) => Agent | undefined;
}

export const useAgentStore = create<AgentStore>()((set, get) => ({
  currentIdentifier: '',
  loading: false,
  agentList: [],
  fetchAgentList: async () => {
    set({ loading: true });
    const res = await getLocalAgentList();
    set({ agentList: res.data, loading: false });
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
}));

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
