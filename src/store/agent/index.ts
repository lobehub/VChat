import { DEFAULT_AGENTS } from '@/constants/agent';
import { getLocalAgentList } from '@/services/agent';
import { Agent } from '@/types/agent';
import { isEqual } from 'lodash-es';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface AgentStore {
  loading: boolean;
  activateAgent: (identifier: string) => void;
  deactivateAgent: () => void;
  currentIdentifier: string;
  localAgentList: Agent[];
  fetchLocalAgentList: () => void;
  getAgentById: (id: string) => Agent | undefined;
}

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  persist(
    (set, get) => ({
      currentIdentifier: '',
      loading: false,
      localAgentList: [],
      fetchLocalAgentList: async () => {
        set({ loading: true });
        const { data = [] } = await getLocalAgentList();
        set({ loading: false });

        const { localAgentList } = get();
        if (isEqual(localAgentList, data)) return;
        set({ localAgentList: data });
      },
      activateAgent: (identifier) => {
        set({ currentIdentifier: identifier });
      },
      deactivateAgent: () => {
        set({ currentIdentifier: undefined });
      },
      getAgentById: (id: string): Agent | undefined => {
        const agentList = getAgentList(get());
        const currentAgent = agentList.find((item) => item.agentId === id);
        if (!currentAgent) return undefined;

        return currentAgent;
      },
    }),
    {
      name: 'vidol-chat-agent-storage',
    },
  ),
  shallow,
);

const showSideBar = (s: AgentStore) => !!s.currentIdentifier;

const currentAgentItem = (s: AgentStore): Agent | undefined => {
  const { currentIdentifier } = s;
  const agentList = getAgentList(s);
  const currentAgent = agentList.find((item) => item.agentId === currentIdentifier);
  if (!currentAgent) return undefined;

  return currentAgent;
};

const getAgentList = (s: AgentStore): Agent[] => {
  const { localAgentList = [] } = s;
  return [...localAgentList, ...DEFAULT_AGENTS];
};

export const agentListSelectors = {
  showSideBar,
  currentAgentItem,
  getAgentList,
};
