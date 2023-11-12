import { DEFAULT_TTS } from '@/features/constants/ttsParam';
import { getLocalAgentList } from '@/services/agent';
import { create } from 'zustand';
import { Agent } from './type';

interface AgentStore {
  loading: boolean;
  activateAgent: (identifier: string) => void;
  deactivateAgent: () => void;
  currentIdentifier: string;
  agentList: Agent[];
  fetchAgentList: () => void;
}

export const useAgentStore = create<AgentStore>()((set) => ({
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
}));

export const DEFAULT_AGENT_ITEM: Agent = {
  name: '',
  description: '',
  homepage: '',
  model: '',
  cover: '',
  avatar: '',
  readme: '',
  tts: DEFAULT_TTS,
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
