import { DEFAULT_AGENT } from '@/constants/defaultAgent';
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
import { MessageActionType, messageReducer } from './reducers/message';
import { sessionSelectors } from './selectors';

export interface SessionStore {
  /**
   * 当前会话 ID
   */
  activeId: string;
  /**
   * 会话列表
   */
  sessionList: Session[];
  /**
   * 聊天加载中的消息 ID
   */
  chatLoadingId: string | undefined;
  /**
   * 语音加载中的消息 ID
   */
  voiceLoading: boolean;
  /**
   *  设置语音加载中的消息 ID
   * @param voiceLoading
   * @returns
   */
  setVoiceLoading: (voiceLoading: boolean) => void;
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
   * 清空历史消息
   */
  clearHistory: () => void;
  /**
   * 请求 AI 回复
   * @param messages
   * @returns
   */
  fetchAIResponse: (messages: ChatMessage[], assistantId: string) => void;
}

const defaultSession: Session = {
  agentId: DEFAULT_AGENT.agentId,
  messages: [],
};

const createSessonStore: StateCreator<SessionStore, [['zustand/devtools', never]]> = (
  set,
  get,
) => ({
  activeId: defaultSession.agentId,
  sessionList: [defaultSession],
  chatLoadingId: undefined,
  voiceLoading: false,
  messageInput: '',
  setMessageInput: (messageInput) => {
    set({ messageInput });
  },
  setVoiceLoading: (voiceLoading) => {
    set({ voiceLoading });
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

  updateSessionMessages: (messages) => {
    const { sessionList, activeId } = get();
    const sessions = produce(sessionList, (draft) => {
      const index = draft.findIndex((session) => session.agentId === activeId);
      if (index === -1) return;
      draft[index].messages = messages;
    });
    set({ sessionList: sessions });
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
        content,
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
        content: '...', // 占位符
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
        // 语音合成
        receivedMessage += txt;
        // 文本切割
        const sentenceMatch = receivedMessage.match(/^(.+[。．！？\n]|.{10,}[、,])/);
        if (sentenceMatch && sentenceMatch[0]) {
          const sentence = sentenceMatch[0];
          sentences.push(sentence);
          receivedMessage = receivedMessage.slice(sentence.length).trimStart();

          if (
            !sentence.replace(
              /^[\s\[\(\{「［（【『〈《〔｛«‹〘〚〛〙›»〕》〉』】）］」\}\)\]]+$/g,
              '',
            )
          ) {
            return;
          }
          handleSpeakAi(sentence);
        }

        // 对话更新
        aiMessage += txt;

        dispatchMessage({
          payload: {
            id: assistantId,
            content: aiMessage,
          },
          type: 'UPDATE_MESSAGE',
        });
      },
      onMessageError: () => {
        // TODO: 错误处理
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
      name: 'vidol-chat-session-storage', // name of the item in the storage (must be unique)
    },
  ),
  shallow,
);

export { sessionSelectors };
