import { DEFAULT_TTS } from '@/features/constants/ttsParam';
import { buildUrl } from '@/utils/buildUrl';
import { ChatMessage } from '@lobehub/ui';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { StateCreator } from 'zustand/vanilla';
import { Agent } from './type';

const DEFAULT_AGENT: Agent = {
  name: 'Sample_A',
  description: '默认角色 A',
  homepage: 'https://hub.vroid.com/en/characters/7939147878897061040/models/2292219474373673889',
  model: buildUrl('/AvatarSample_A.vrm'),
  avatar: '',
  cover: '',
  readme: `AvatarSample_Bは、VRoid Studioに付属されているサンプルモデルの１つです。
  良識の範囲内で、本モデルに設定されているVRoid Hubの利用条件に沿って利用することができます。
  VRoid Hub連携アプリや、外部サービス等でぜひご活用ください。
  なお、本モデルはCC0ライセンスではありません、著作権は放棄はしておりませんので予めご了承ください。
  本モデルの利用条件は、以下ヘルプ記事をご覧ください。
  vroid.pixiv.help/hc/ja/articles/4402394424089
  
  AvatarSample_B is one of the sample models included in VRoid Studio.
  It can be used in accordance with its VRoid Hub conditions of use, within reason.
  Feel free to use this model in applications linked to VRoid Hub and on external services.
  Please note that this model is not under the CC0 license and its copyright has not been waived.
  To learn more about this model's conditions of use, consult the following Help article.
  vroid.pixiv.help/hc/en-us/articles/4402394424089`,
  tts: DEFAULT_TTS,
};

interface Session {
  agent: Agent;
  messages: ChatMessage[];
}

interface SessionStore {
  currentSession: Session | null;
  sessionList: Session[];
  switchSession: (agent: Agent) => void;
}

const createSessonStore: StateCreator<SessionStore, [['zustand/devtools', never]]> = (
  set,
  get,
) => ({
  currentSession: null,
  sessionList: [],
  switchSession: (agent) => {
    const { sessionList } = get();
    const targetSession = sessionList.find((session) => session.agent.dirname === agent.dirname);
    if (!targetSession) {
      const session = {
        agent,
        messages: [],
      };
      set({ sessionList: [...sessionList, session], currentSession: session });
    } else {
      set({ currentSession: targetSession });
    }
  },
});

export const useSessionStore = create<SessionStore>()(
  persist(
    devtools(createSessonStore, {
      name: 'VIDOL_SESSION_STORE',
    }),
    {
      name: 'vidol-chat-session-storage', // name of the item in the storage (must be unique)
    },
  ),
);
