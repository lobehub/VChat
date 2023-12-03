import { ChatMessage } from '@/types/chat';
import { LLMRoleType } from '@/types/llm';
import { produce } from 'immer';

export interface AddMessageAction {
  type: 'ADD_MESSAGE';
  payload: {
    role: LLMRoleType;
    content: string;
    id: string;
  };
}

export interface UpdateMessageAction {
  type: 'UPDATE_MESSAGE';
  payload: {
    id: string;
    content: string;
  };
}

export interface DeleteMessageAction {
  type: 'DELETE_MESSAGE';
  payload: {
    id: string;
  };
}

export type MessageActionType = AddMessageAction | UpdateMessageAction | DeleteMessageAction;

export const messageReducer = (state: ChatMessage[], action: MessageActionType): ChatMessage[] => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return produce(state, (draft) => {
        const { role, content, id } = action.payload;
        draft.push({
          content,
          role,
          createAt: Date.now(),
          updateAt: Date.now(),
          id,
          meta: {},
        });
      });
    case 'UPDATE_MESSAGE':
      return produce(state, (draft) => {
        const { content, id } = action.payload;
        const message = draft.find((item) => item.id === id);
        if (!message) return;

        message.content = content;
        message.updateAt = Date.now();
      });
    case 'DELETE_MESSAGE':
      return produce(state, (draft) => {
        const { id } = action.payload;
        const index = draft.findIndex((item) => item.id === id);
        if (index === -1) return;
        draft.splice(index, 1);
      });
    default: {
      return produce(state, () => []);
    }
  }
};
