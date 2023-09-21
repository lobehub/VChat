import { Viewer } from '@/features/vrmViewer/viewer';
import { buildUrl } from '@/utils/buildUrl';
import { create } from 'zustand';

interface RoleStore {
  currentRole: string;
  viewer: any;
  setCurrentRole: (role: string) => void;
}

export const useAgentStore = create<RoleStore>()((set) => ({
  currentRole: buildUrl('/AvatarSample_B.vrm'),
  viewer: new Viewer(),
  setCurrentRole: (role: string) => {
    set({ currentRole: buildUrl(`/${role}.vrm`) });
  },
}));
