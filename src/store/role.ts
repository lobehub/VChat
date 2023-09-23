import { Viewer } from '@/features/vrmViewer/viewer';
import { create } from 'zustand';

// 查找个人与商业使用的角色列表 https://hub.vroid.com/models?is_other_users_available=1&personal_commercial_use=profit
const roleList = [
  {
    name: 'Lilia',
    cnName: '莉莉娅',
    description: '莉莉娅很爱笑',
    homepage: 'https://hub.vroid.com/characters/864745176177452480/models/2583417406859875501',
    path: 'https://raw.githubusercontent.com/v-idol/shell/master/models/Lilia.vrm',
    cover:
      'https://vroid-hub.pximg.net/c/300x400_a2_g5/images/full_body_images/3131203/198169237182913944.png',
  },
  {
    name: 'MimiMechanism',
    cnName: '米米机制',
    description: '米米是个小孩子',
    homepage: 'https://hub.vroid.com/characters/5322942975009642877/models/6809135692840126882',
    path: 'https://raw.githubusercontent.com/v-idol/shell/master/models/MimiMechanism.vrm',
    cover:
      'https://vroid-hub.pximg.net/c/300x400_a2_g5/images/full_body_images/1016787/6999405960554410569.png',
  },
  {
    name: 'Klee',
    cnName: '可莉',
    description: '可莉是一个喜欢用小炸弹摧毁东西的蒙德小女孩，努力为这个小孩子买一些原石吧！',
    homepage: 'https://hub.vroid.com/characters/6754344924159738240/models/62850599208016204',
    path: 'https://raw.githubusercontent.com/v-idol/shell/master/models/Klee.vrm',
    cover:
      'https://vroid-hub.pximg.net/c/300x400_a2_g5/images/full_body_images/3664315/3633882022449211095.png',
  },
  {
    name: 'Bronya',
    cnName: '布洛妮娅',
    description: '布洛妮娅是崩坏星穹铁道中的角色',
    homepage: 'https://hub.vroid.com/characters/8492290223992997626/models/1864405023120034389',
    path: 'https://raw.githubusercontent.com/v-idol/shell/master/models/Bronya.vrm',
    cover:
      'https://vroid-hub.pximg.net/c/300x400_a2_g5/images/full_body_images/3664315/8781249395944970405.png',
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
