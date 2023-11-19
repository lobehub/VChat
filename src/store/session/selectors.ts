import { Session } from '@/types/session';
import { SessionStore } from './index';

const currentSession = (s: SessionStore): Session | undefined => {
  const { activeId, sessionList } = s;
  const currentSession = sessionList.find((item) => item.agent.dirname === activeId);

  return currentSession;
};

export const sessionSelectors = {
  currentSession,
};
