import { ErrorTypeEnum } from '@/types/api';
import { ChatMessage } from '@lobehub/ui';
import { ChatListProps as LobeChatListProps } from '@lobehub/ui/es/ChatList';
import ApiError from './ApiError';
import OpenAPIKey from './OpenAPIKey';

export const renderErrorMessages: LobeChatListProps['renderErrorMessages'] = {
  [ErrorTypeEnum.API_KEY_MISSING]: {
    Render: OpenAPIKey,
    config: {
      extraDefaultExpand: true,
      extraIsolate: true,
      type: 'warning',
    },
  },
  [ErrorTypeEnum.OPENAI_API_ERROR]: {
    Render: ApiError,
    config: {
      extraDefaultExpand: true,
      extraIsolate: true,
      type: 'warning',
    },
  },
  [ErrorTypeEnum.INTERNAL_SERVER_ERROR]: {
    Render: ({ error }: ChatMessage) => <div>{error.message}</div>,
  },
};
