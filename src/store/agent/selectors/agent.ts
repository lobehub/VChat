import { Agent } from '@/types/agent';
import { AgentStore } from '../index';

const showSideBar = (s: AgentStore) => !!s.currentIdentifier;

const currentAgentItem = (s: AgentStore): Agent | undefined => {
  const { currentIdentifier, localAgentList } = s;
  const currentAgent = localAgentList.find((item) => item.agentId === currentIdentifier);
  if (!currentAgent) return undefined;

  return currentAgent;
};

const subscribed = (s: AgentStore) => (agentId: string) => {
  const { localAgentList } = s;
  const index = localAgentList.findIndex((item) => item.agentId === agentId);

  return index !== -1;
};

export const agentListSelectors = {
  showSideBar,
  currentAgentItem,
  subscribed,
};
