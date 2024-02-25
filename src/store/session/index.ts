import { LOADING_FLAG } from '@/constants/common';
import { chatCompletion, handleSpeakAi } from '@/services/chat';
import { ChatMessage } from '@/types/chat';
import { Session } from '@/types/session';
import { fetchSEE } from '@/utils/fetch';
import { nanoid } from 'ai';
import { produce } from 'immer';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { initialState } from './initialState';
import { MessageActionType, messageReducer } from './reducers/message';
import { sessionSelectors } from './selectors';

const SESSION_STORAGE_KEY = 'vidol-chat-session-storage';

export interface SessionStore {
  /**
   * 当前会话 ID
   */
  activeId: string;
  /**
   * 当前视频 ID
   */
  liveId?: string;
  /**
   * 会话列表
   */
  sessionList: Session[];
  /**
   * 聊天加载中的消息 ID
   */
  chatLoadingId: string | undefined;
  /**
   * 语音开关
   */
  voiceOn: boolean;
  /**
   * 触发语音开关
   */
  toogleVoice: () => void;
  /**
   * 设置视频 ID
   */
  setLiveId: (liveId?: string) => void;
  /**
   * 当前消息输入
   */
  messageInput: string;
  /**
   * 设置消息输入
   * @param messageInput
   */
  setMessageInput: (messageInput: string) => void;
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
  switchSession: (agentId: string) => void;
  /**
   * 更新会话消息
   * @param messages
   */
  updateSessionMessages: (messages: ChatMessage[]) => void;
  /**
   * 更新消息
   * @returns
   */
  updateMessage: (id: string, content: string) => void;
  /**
   *  删除消息
   */
  deleteMessage: (id: string) => void;
  /**
   * 重新生成消息
   * @returns
   */
  regenerateMessage: (id: string) => void;
  /**
   * 清空历史消息
   */
  clearHistory: () => void;
  /**
   *  清空会话
   */
  clearSessions: () => void;
  /**
   * 请求 AI 回复
   * @param messages
   * @returns
   */
  fetchAIResponse: (messages: ChatMessage[], assistantId: string) => void;
}

const createSessonStore: StateCreator<SessionStore, [['zustand/devtools', never]]> = (
  set,
  get,
) => ({
  ...initialState,
  setMessageInput: (messageInput) => {
    set({ messageInput });
  },
  toogleVoice: () => {
    const { voiceOn } = get();
    set({ voiceOn: !voiceOn });
  },
  setLiveId: (liveId?: string) => {
    set({ liveId });
  },
  switchSession: (agentId) => {
    const { sessionList } = get();
    const targetSession = sessionList.find((session) => session.agentId === agentId);
    if (!targetSession) {
      const session = {
        agentId: agentId,
        messages: [],
      };
      set({ sessionList: [...sessionList, session] });
    }
    set({ activeId: agentId });
  },
  clearHistory: () => {
    const { updateSessionMessages } = get();
    updateSessionMessages([]);
  },
  clearSessions: () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    set({ ...initialState });
  },

  updateSessionMessages: (messages) => {
    const { sessionList, activeId } = get();
    const sessions = produce(sessionList, (draft) => {
      const index = draft.findIndex((session) => session.agentId === activeId);
      if (index === -1) return;
      draft[index].messages = messages;
    });
    set({ sessionList: sessions });
  },
  deleteMessage: (id) => {
    const { dispatchMessage } = get();
    dispatchMessage({
      payload: {
        id,
      },
      type: 'DELETE_MESSAGE',
    });
  },
  regenerateMessage: (id) => {
    const { dispatchMessage, fetchAIResponse } = get();
    const currentSession = sessionSelectors.currentSession(get());
    if (!currentSession) {
      return;
    }

    const previousChats = sessionSelectors.previousChats(get(), id);

    // 添加机器人消息占位
    dispatchMessage({
      type: 'UPDATE_MESSAGE',
      payload: {
        id: id,
        key: 'content',
        value: '...', // 占位符
      },
    });

    fetchAIResponse(previousChats, id);
  },
  dispatchMessage: (payload) => {
    const { updateSessionMessages } = get();
    const session = sessionSelectors.currentSession(get());

    if (!session) {
      return;
    }

    const messages = messageReducer(session.messages, payload);

    updateSessionMessages(messages);
  },
  updateMessage: (id, content) => {
    const { dispatchMessage } = get();
    dispatchMessage({
      payload: {
        id,
        key: 'content',
        value: content,
      },
      type: 'UPDATE_MESSAGE',
    });
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

    const currentChats = sessionSelectors.currentChats(get());

    const assistantId = nanoid();

    // 添加机器人消息占位
    dispatchMessage({
      type: 'ADD_MESSAGE',
      payload: {
        role: 'assistant',
        id: assistantId,
        content: LOADING_FLAG, // 占位符
      },
    });

    await fetchAIResponse(currentChats, assistantId);
  },
  fetchAIResponse: async (messages, assistantId) => {
    const { dispatchMessage } = get();
    const currentSession = sessionSelectors.currentSession(get());
    const currentAgent = sessionSelectors.currentAgent(get());

    if (!currentSession || !currentAgent) {
      return;
    }

    set({ chatLoadingId: assistantId });

    const fetcher = () => {
      return chatCompletion({
        messages: [
          {
            content: currentAgent.systemRole,
            role: 'system',
          },
          ...messages,
        ],
      });
    };

    let receivedMessage = '';
    let aiMessage = '';
    const sentences = [];

    await fetchSEE(fetcher, {
      onMessageUpdate: (txt: string) => {
        const { voiceOn } = get();

        if (voiceOn) {
          // 语音合成
          receivedMessage += txt;
          // 文本切割
          const sentenceMatch = receivedMessage.match(/^(.+[。．！？~\n]|.{10,}[、,])/);
          if (sentenceMatch && sentenceMatch[0]) {
            const sentence = sentenceMatch[0];
            sentences.push(sentence);
            receivedMessage = receivedMessage.slice(sentence.length).trimStart();

            if (
              !sentence.replace(/^[\s\[(「［（【『〈《〔｛«‹〘〚〛〙›»〕》〉』】）］」})\]]+$/g, '')
            ) {
              return;
            }
            handleSpeakAi(sentence);
          }
        }

        // 对话更新
        aiMessage += txt;

        dispatchMessage({
          payload: {
            id: assistantId,
            key: 'content',
            value: aiMessage,
          },
          type: 'UPDATE_MESSAGE',
        });
      },
      onMessageError: (error) => {
        dispatchMessage({
          payload: {
            id: assistantId,
            key: 'error',
            value: error,
          },
          type: 'UPDATE_MESSAGE',
        });
      },
    });
    set({ chatLoadingId: undefined });
  },
});

export const useSessionStore = createWithEqualityFn<SessionStore>()(
  persist(
    devtools(createSessonStore, {
      name: 'VIDOL_SESSION_STORE',
    }),
    {
      name: SESSION_STORAGE_KEY, // name of the item in the storage (must be unique)
    },
  ),
  shallow,
);

export { sessionSelectors };
