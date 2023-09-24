import { create } from 'zustand';

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

const showSideBar = (s: AgentStore) => !!s.currentIdentifier;

export const agentListSelectors = {
  showSideBar,
};
