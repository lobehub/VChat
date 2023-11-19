import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';
import { SessionStore } from './index';

const currentSession = (s: SessionStore): Session | undefined => {
  const { activeId, sessionList } = s;
  const currentSession = sessionList.find((item) => item.agent.dirname === activeId);

  return currentSession;
};

export const DEFAULT_USER_AVATAR = '😀';

const currentChats = (s: SessionStore): ChatMessage[] => {
  const session = currentSession(s);
  if (!session) return [];
  const { messages, agent } = session;
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

export const sessionSelectors = {
  currentSession,
  currentChats,
};
