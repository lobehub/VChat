import { Viewer } from '@/features/vrmViewer/viewer';
import { buildUrl } from '@/utils/buildUrl';
import { create } from 'zustand';
import { Agent } from './type';

const DEFAULT_AGENT = {
  name: 'Sample_B',
  cnName: 'Sample_B',
  description: '默认角色 B',
  homepage: 'https://hub.vroid.com/characters/8492290223992997626/models/1864405023120034389',
  path: buildUrl('/AvatarSample_B.vrm'),
  avatar: '',
  cover: '',
};

interface SessionStore {
  currentAgent: Agent | null;
  viewer: any;
  setCurrentAgent: (agent: Agent) => void;
}

export const useSessionStore = create<SessionStore>()((set) => ({
  currentAgent: DEFAULT_AGENT,
  viewer: new Viewer(),
  setCurrentAgent: (agent) => {
    set({ currentAgent: agent });
  },
}));
