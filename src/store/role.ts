import { Viewer } from '@/features/vrmViewer/viewer';
import { create } from 'zustand';

interface RoleStore {
  currentRole: string;
  viewer: any;
  setCurrentRole: (role: string) => void;
}

export const useAgentStore = create<RoleStore>()((set) => ({
  currentRole: 'https://raw.githubusercontent.com/v-idol/shell/master/src/lilia/model.vrm',
  viewer: new Viewer(),
  setCurrentRole: (role: string) => {
    set({ currentRole: role });
  },
}));
