import { ErrorTypeEnum } from '@/types/api';
import { ChatMessage } from '@lobehub/ui';
import { ChatListProps as LobeChatListProps } from '@lobehub/ui/es/ChatList';
import OpenAPIKey from './OpenAPIKey';

export const renderErrorMessages: LobeChatListProps['renderErrorMessages'] = {
  [ErrorTypeEnum.API_KEY_MISSING]: {
    Render: ({ id }: ChatMessage) => <OpenAPIKey id={id} />,
    config: {
      extraDefaultExpand: true,
      extraIsolate: true,
      type: 'warning',
    },
  },
  [ErrorTypeEnum.OPENAI_API_ERROR]: {
    Render: ({ error }: ChatMessage) => <div>{error.message}</div>,
  },
  [ErrorTypeEnum.INTERNAL_SERVER_ERROR]: {
    Render: ({ error }: ChatMessage) => <div>{error.message}</div>,
  },
};
