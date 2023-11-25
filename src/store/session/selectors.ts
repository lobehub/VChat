import { useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';
import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';
import { SessionStore } from './index';

const currentSession = (s: SessionStore): Session | undefined => {
  const { activeId, sessionList } = s;
  const currentSession = sessionList.find((item) => item.agentId === activeId);

  return currentSession;
};

export const DEFAULT_USER_AVATAR = '😀';

const currentChats = (s: SessionStore): ChatMessage[] => {
  const session = currentSession(s);
  const agent = currentAgent(s);
  if (!session || !agent) return [];

  const { messages } = session;
  return messages?.map((message) => {
    return {
      ...message,
      meta: {
        avatar: message.role === 'user' ? DEFAULT_USER_AVATAR : agent.avatar,
        title: message.role === 'user' ? '你' : agent.name,
        description: message.role === 'user' ? undefined : agent.description,
      },
    };
  });
};

const currentAgent = (s: SessionStore): Agent | undefined => {
  const session = currentSession(s);
  if (!session) return undefined;

  const { agentList } = useAgentStore.getState();
  const { agentId } = session;
  const currentAgent = agentList.find((item) => item.agentId === agentId);
  console.log('currentAgent', currentAgent);
  return currentAgent;
};

export const sessionSelectors = {
  currentSession,
  currentChats,
  currentAgent,
};
