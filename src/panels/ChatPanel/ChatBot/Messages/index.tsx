import { ChatListProps as LobeChatListProps } from '@lobehub/ui/es/ChatList';
import { DefaultMessage } from './Default';

export const renderMessages: LobeChatListProps['renderMessages'] = {
  default: DefaultMessage,
};
