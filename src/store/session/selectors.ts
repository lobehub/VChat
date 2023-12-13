import { agentListSelectors, useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';
import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';
import { SessionStore } from './index';

const currentSession = (s: SessionStore): Session | undefined => {
  const { activeId, sessionList } = s;
  const currentSession = sessionList.find((item) => item.agentId === activeId);

  return currentSession;
};

const sessionListIds = (s: SessionStore): string[] => {
  const { sessionList } = s;
  return sessionList.map((item) => item.agentId);
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

const previousChats = (s: SessionStore, id: string): ChatMessage[] => {
  const chatList = currentChats(s);
  const index = chatList.findIndex((item) => item.id === id);
  if (index === -1) return [];
  return chatList.slice(0, index);
};

const currentChatsString = (s: SessionStore): string => {
  const session = currentSession(s);
  const agent = currentAgent(s);
  if (!session || !agent) return '';

  const { messages } = session;
  return messages
    ?.map((message) => {
      return message.content;
    })
    .join(' ');
};

const currentSystemRole = (s: SessionStore): string => {
  const agent = currentAgent(s);
  if (!agent) return '';
  return agent.systemRole;
};

const currentAgent = (s: SessionStore): Agent | undefined => {
  const session = currentSession(s);
  if (!session) return undefined;

  const agentList = agentListSelectors.getAgentList(useAgentStore.getState());
  const { agentId } = session;
  const currentAgent = agentList.find((item) => item.agentId === agentId);
  return currentAgent;
};

export const sessionSelectors = {
  currentSession,
  sessionListIds,
  currentChats,
  currentAgent,
  currentChatsString,
  currentSystemRole,
  previousChats,
};
