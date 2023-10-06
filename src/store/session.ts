import { Viewer } from '@/features/vrmViewer/viewer';
import { buildUrl } from '@/utils/buildUrl';
import { create } from 'zustand';
import { Agent } from './type';

const DEFAULT_AGENT: Agent = {
  name: 'Sample_A',
  description: '默认角色 A',
  homepage: 'https://hub.vroid.com/characters/8492290223992997626/models/1864405023120034389',
  model: buildUrl('/AvatarSample_A.vrm'),
  avatar: '',
  cover: '',
};

interface SessionStore {
  currentAgent: Agent | null;
  viewer: Viewer;
  setCurrentAgent: (agent: Agent) => void;
  startDance: (buffer: ArrayBuffer) => void;
  stopDance: () => void;
}

export const useSessionStore = create<SessionStore>()((set) => ({
  currentAgent: DEFAULT_AGENT,
  viewer: new Viewer(),
  setCurrentAgent: (agent) => {
    set({ currentAgent: agent });
  },
  startDance(buffer) {
    this.viewer.model?.dance(buffer);
  },
  stopDance() {
    this.viewer.model?.stopDance();
  },
}));
