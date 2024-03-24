import { Agent } from '@/types/agent';
import { produce } from 'immer';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { agentListSelectors } from './selectors/agent';

export interface AgentStore {
  activateAgent: (identifier: string) => void;
  deactivateAgent: () => void;
  currentIdentifier: string;
  subscribedList: Agent[];
  getAgentById: (agentId: string) => Agent | undefined;
  subscribe: (agent: Agent) => void;
  unsubscribe: (agentId: string) => void;
}

export const useAgentStore = createWithEqualityFn<AgentStore>()(
  persist(
    (set, get) => ({
      currentIdentifier: '',
      subscribedList: [],
      activateAgent: (identifier) => {
        set({ currentIdentifier: identifier });
      },
      deactivateAgent: () => {
        set({ currentIdentifier: undefined });
      },
      subscribe: (agent) => {
        const { subscribedList } = get();

        const newList = produce(subscribedList, (draft) => {
          const index = draft.findIndex((item) => item.agentId === agent.agentId);

          if (index === -1) {
            draft.unshift(agent);
          }
        });
        set({ subscribedList: newList });
      },
      unsubscribe: (agentId) => {
        const { subscribedList } = get();
        const newList = produce(subscribedList, (draft) => {
          const index = draft.findIndex((item) => item.agentId === agentId);

          if (index !== -1) {
            draft.splice(index, 1);
          }
        });
        set({ subscribedList: newList, currentIdentifier: newList[0]?.agentId });
      },
      getAgentById: (agentId: string): Agent | undefined => {
        const { subscribedList } = get();

        const currentAgent = subscribedList.find((item) => item.agentId === agentId);
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
