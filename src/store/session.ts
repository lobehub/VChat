import { buildUrl } from '@/utils/buildUrl';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { StateCreator } from 'zustand/vanilla';
import { Agent } from './type';

const DEFAULT_AGENT: Agent = {
  name: 'Sample_A',
  description: '默认角色 A',
  homepage: 'https://hub.vroid.com/characters/8492290223992997626/models/1864405023120034389',
  model: buildUrl('/AvatarSample_A.vrm'),
  avatar: '',
  cover: '',
};

interface Session {
  agent: Agent;
  history: string[];
}

interface SessionStore {
  currentAgent: Agent | null;
  sessionList: Session[];
  setCurrentAgent: (agent: Agent) => void;
}

const createSessonStore: StateCreator<SessionStore, [['zustand/devtools', never]]> = (
  set,
  get,
) => ({
  currentAgent: DEFAULT_AGENT,
  sessionList: [],
  setCurrentAgent: (agent) => {
    const { sessionList } = get();
    if (!sessionList.find((session) => session.agent.dirname === agent.dirname)) {
      sessionList.push({
        agent,
        history: [],
      });
    }
    set({ currentAgent: agent });
  },
});

export const useSessionStore = create<SessionStore>()(
  devtools(createSessonStore, {
    name: 'SESSION_STORE',
  }),
);
