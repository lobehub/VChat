import { create } from 'zustand';
import { Agent } from './type';

interface AgentStore {
  activateAgent: (identifier: string) => void;
  deactivateAgent: () => void;
  currentIdentifier: string;
  agentList: any[];
  setAgentList: (agentList: any[]) => void;
}

export const useAgentStore = create<AgentStore>()((set) => ({
  currentIdentifier: '',
  agentList: [],
  setAgentList: (agentList) => {
    set({ agentList: agentList });
  },
  activateAgent: (identifier) => {
    set({ currentIdentifier: identifier });
  },
  deactivateAgent: () => {
    set({ currentIdentifier: undefined }, false);
  },
}));

export const DEFAULT_AGENT_ITEM: Agent = {
  name: '',
  description: '',
  homepage: '',
  model: '',
  cover: '',
  avatar: '',
};

const showSideBar = (s: AgentStore) => !!s.currentIdentifier;

const currentAgentItem = (s: AgentStore): Agent => {
  const { agentList, currentIdentifier } = s;
  const currentAgent = agentList.find((item) => item.name === currentIdentifier);
  if (!currentAgent) return DEFAULT_AGENT_ITEM;

  return currentAgent;
};

export const agentListSelectors = {
  showSideBar,
  currentAgentItem,
};
