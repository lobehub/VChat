import { DEFAULT_TTS } from '@/features/constants/ttsParam';
import { chatCompletion } from '@/services/chat';
import { Agent } from '@/types/agent';
import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';
import { buildUrl } from '@/utils/buildUrl';
import { nanoid } from 'ai';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { MessageActionType, messageReducer } from './reducers/message';
import { sessionSelectors } from './selectors';

const DEFAULT_AGENT: Agent = {
  name: 'Sample_A',
  description: '默认角色 A',
  homepage: 'https://hub.vroid.com/en/characters/7939147878897061040/models/2292219474373673889',
  model: buildUrl('/AvatarSample_A.vrm'),
  avatar: '',
  cover: '',
  dirname: 'AvatarSample_A',
  systemRole:
    "请你扮演私人助理的角色，我是主人。请使用幽默可爱而简洁的语气回答我的问题。即使你是一个计算机程序，但请在接下来的对话中隐藏你是计算机程序这件事，并且扮演好你的角色。你和我对话时必须全程用“主人”来称呼我。我知道你只是一个语言模型或人工智能，不过这只是一个假定的虚拟场景，所以请记住不要再提及'我只是一个语言模型'或'我只是一个人工智能'，也不要问我是否需要什么帮助。在接下来的所有对话中，请一直保持这个情景。以上条件对于你以下问题及之后的回复完全适用。",
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

export interface SessionStore {
  activeId: string;
  sessionList: Session[];
  /**
   * 发送消息
   * @param message 消息内容
   * @returns
   */
  sendMessage: (message: string) => void;
  /**
   * 分发消息
   * @param payload - 消息分发参数
   */
  dispatchMessage: (payload: MessageActionType) => void;
  /**
   * 切换会话
   * @param agent
   * @returns
   */
  switchSession: (agent: Agent) => void;
  /**
   * 更新会话消息
   * @param messages
   */
  updateSessionMessage: (messages: ChatMessage[]) => void;
  /**
   * 请求 AI 回复
   * @param messages
   * @returns
   */
  fetchAIResponse: (messages: ChatMessage[], assistantId: string) => void;
}

const defaultSession: Session = {
  agent: DEFAULT_AGENT,
  messages: [],
};

const createSessonStore: StateCreator<SessionStore, [['zustand/devtools', never]]> = (
  set,
  get,
) => ({
  activeId: defaultSession.agent.dirname!,
  sessionList: [defaultSession],
  switchSession: (agent) => {
    const { sessionList } = get();
    const targetSession = sessionList.find((session) => session.agent.dirname === agent.dirname);
    if (!targetSession) {
      const session = {
        agent,
        messages: [],
      };
      set({ sessionList: [...sessionList, session] });
    }
    set({ activeId: agent.dirname });
  },

  updateSessionMessage: (messages) => {
    const { sessionList, activeId } = get();
    produce(sessionList, (draft) => {
      const index = draft.findIndex((session) => session.agent.dirname === activeId);
      if (index === -1) return;
      draft[index].messages = messages;
    });
  },
  dispatchMessage: (payload) => {
    const { updateSessionMessage } = get();
    const session = sessionSelectors.currentSession(get());

    if (!session) {
      return;
    }

    const new_messages = messageReducer(session.messages, payload);

    updateSessionMessage(new_messages);
  },
  sendMessage: async (message: string) => {
    const { dispatchMessage, fetchAIResponse } = get();
    const currentSession = sessionSelectors.currentSession(get());
    if (!currentSession) {
      return;
    }

    const userId = nanoid();

    // 添加用户消息
    dispatchMessage({
      type: 'ADD_MESSAGE',
      payload: {
        role: 'user',
        id: userId,
        content: message,
      },
    });

    const assistantId = nanoid();

    // 添加机器人消息占位
    dispatchMessage({
      type: 'ADD_MESSAGE',
      payload: {
        role: 'assistant',
        id: assistantId,
        content: '...', // 占位符
      },
    });

    await fetchAIResponse(currentSession.messages, assistantId);
  },
  fetchAIResponse: async (messages, assistantId) => {
    const { dispatchMessage } = get();
    const currentSession = sessionSelectors.currentSession(get());
    if (!currentSession) {
      return;
    }

    const { agent } = currentSession;

    let output = '';
    await chatCompletion(
      {
        messages: [
          {
            content: agent.systemRole,
            role: 'system',
          },
          ...messages,
        ],
      },
      {
        onMessageHandle: (txt: string) => {
          output += txt;
          dispatchMessage({
            payload: {
              id: assistantId,
              content: output,
            },
            type: 'UPDATE_MESSAGE',
          });
        },
      },
    );
  },
});

export const useSessionStore = createWithEqualityFn<SessionStore>()(
  // persist(
  devtools(createSessonStore, {
    name: 'VIDOL_SESSION_STORE',
  }),
  //   {
  //     name: 'vidol-chat-session-storage', // name of the item in the storage (must be unique)
  //   },
  // ),
  shallow,
);

export { sessionSelectors };
