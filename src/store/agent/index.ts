import { DEFAULT_AGENTS } from '@/constants/agent';
import { Agent } from '@/types/agent';
import { produce } from 'immer';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { agentListSelectors } from './selectors/agent';

export interface AgentStore {
  loading: boolean;
  activateAgent: (identifier: string) => void;
  deactivateAgent: () => void;
  currentIdentifier: string;
  localAgentList: Agent[];
  getAgentById: (agentId: string) => Agent | undefined;
  subscribe: (agent: Agent) => void;
  unsubscribe: (agentId: string) => void;
}

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  persist(
    (set, get) => ({
      currentIdentifier: '',
      loading: false,
      localAgentList: DEFAULT_AGENTS,
      activateAgent: (identifier) => {
        set({ currentIdentifier: identifier });
      },
      deactivateAgent: () => {
        set({ currentIdentifier: undefined });
      },
      subscribe: (agent) => {
        const { localAgentList } = get();

        const newList = produce(localAgentList, (draft) => {
          const index = draft.findIndex((item) => item.agentId === agent.agentId);

          if (index === -1) {
            draft.unshift(agent);
          }
        });
        set({ localAgentList: newList });
      },
      unsubscribe: (agentId) => {
        const { localAgentList } = get();
        const newList = produce(localAgentList, (draft) => {
          const index = draft.findIndex((item) => item.agentId === agentId);

          if (index !== -1) {
            draft.splice(index, 1);
          }
        });
        set({ localAgentList: newList });
      },
      getAgentById: (agentId: string): Agent | undefined => {
        const { localAgentList } = get();

        const currentAgent = localAgentList.find((item) => item.agentId === agentId);
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

export { agentListSelectors };
