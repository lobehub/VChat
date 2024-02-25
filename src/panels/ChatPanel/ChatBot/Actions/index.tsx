import { ChatListProps } from '@lobehub/ui';
import AssistantActionsBar from './Assistant';
import UserActionsBar from './User';

export const renderActions: ChatListProps['renderActions'] = {
  assistant: AssistantActionsBar,
  user: UserActionsBar,
};
