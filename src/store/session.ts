import { Viewer } from '@/features/vrmViewer/viewer';
import { create } from 'zustand';
import { Agent } from './type';

interface SessionStore {
  currentAgent: Agent | null;
  viewer: any;
  setCurrentAgent: (agent: Agent) => void;
}

export const useSessionStore = create<SessionStore>()((set) => ({
  currentAgent: null,
  viewer: new Viewer(),
  setCurrentAgent: (agent) => {
    set({ currentAgent: agent });
  },
}));
