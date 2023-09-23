import { Viewer } from '@/features/vrmViewer/viewer';
import { create } from 'zustand';

const roleList = [
  {
    name: 'Lilia',
    cnName: '莉莉娅',
    description: '莉莉娅很爱笑',
    homepage: 'https://hub.vroid.com/characters/864745176177452480/models/2583417406859875501',
    modelPath:
      'https://dg3rfg6exbkmv.cloudfront.net/c/s=2583417406859875501/model_basis_files/3131203/7651863496365432110.vrm',
    cover:
      'https://vroid-hub.pximg.net/c/300x400_a2_g5/images/portrait_images/3131203/198169237182913944.png',
  },
  {
    name: 'MimiMechanism',
    cnName: '米米机制',
    description: '米米是个小孩子',
    homepage: 'https://hub.vroid.com/characters/5322942975009642877/models/6809135692840126882',
    modelPath:
      'https://dg3rfg6exbkmv.cloudfront.net/c/s=6809135692840126882/model_basis_files/1016787/4714753979551182783.vrm',
    cover:
      'https://vroid-hub.pximg.net/c/300x400_a2_g5/images/portrait_images/1016787/6999405960554410569.png',
  },
];

interface RoleStore {
  currentRole: any;
  viewer: any;
  roleList: any[];
  setCurrentRole: (role: string) => void;
}

export const useAgentStore = create<RoleStore>()((set) => ({
  currentRole: roleList[0],
  roleList,
  viewer: new Viewer(),
  setCurrentRole: (role: string) => {
    set({ currentRole: role });
  },
}));
