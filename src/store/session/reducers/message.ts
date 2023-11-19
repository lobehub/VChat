import { ChatMessage } from '@/types/chat';
import { LLMRoleType } from '@/types/llm';
import { nanoid } from 'ai';
import { produce } from 'immer';

export interface AddMessageAction {
  type: 'ADD_MESSAGE';
  payload: {
    role: LLMRoleType;
    message: string;
  };
}

export interface UpdateMessageAction {
  type: 'UPDATE_MESSAGE';
  payload: ChatMessage;
}

export type MessageActionType = AddMessageAction | UpdateMessageAction;

export const messageReducer = (state: ChatMessage[], action: MessageActionType): ChatMessage[] => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return produce(state, (draft) => {
        const { role, message } = action.payload;
        draft.push({
          content: message,
          role,
          createAt: Date.now(),
          updateAt: Date.now(),
          id: nanoid(),
          meta: {},
        });
      });
    default: {
      return produce(state, () => []);
    }
  }
};
