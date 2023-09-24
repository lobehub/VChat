import { Viewer } from '@/features/vrmViewer/viewer';
import { create } from 'zustand';

interface SessionStore {
  currentAgent: any;
  viewer: any;
  setCurrentAgent: (role: string) => void;
}

export const useAgentStore = create<SessionStore>()((set) => ({
  currentAgent: null,
  viewer: new Viewer(),
  setCurrentAgent: (agent) => {
    set({ currentAgent: agent });
  },
}));
