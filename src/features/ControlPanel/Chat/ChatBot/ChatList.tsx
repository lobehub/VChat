import { handleSpeakAi } from '@/services/chat';
import { sessionSelectors, useSessionStore } from '@/store/session';
import {
  ActionIconGroup,
  ChatList as LobeChatList,
  ChatListProps as LobeChatListProps,
  RenderAction,
} from '@lobehub/ui';
import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { isEqual } from 'lodash-es';
import { Play } from 'lucide-react';
import { memo } from 'react';
import ScrollArchor from './ScrollArchor';

interface ChatListProps {
  style?: React.CSSProperties;
  className?: string;
}

const ChatList = (props: ChatListProps) => {
  const { style, className } = props;
  const chatLoadingId = useSessionStore((s) => s.chatLoadingId);
  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s), isEqual);

  const tts = {
    icon: Play,
    key: 'tts',
    label: '文字转语音',
  } as ActionIconGroupItems;

  const AssistantActionsBar: RenderAction = ({ onActionClick }) => (
    <ActionIconGroup dropdownMenu={[]} items={[tts]} onActionClick={onActionClick} type="ghost" />
  );

  const renderActions: LobeChatListProps['renderActions'] = {
    assistant: AssistantActionsBar,
  };

  return (
    <div style={style} className={className}>
      <LobeChatList
        data={currentChats || []}
        showTitle={true}
        type="chat"
        // @ts-ignore
        renderActions={renderActions}
        renderMessages={{
          default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
        }}
        onActionsClick={({ key }, { content }) => {
          if (key === 'tts') {
            handleSpeakAi(content);
          }
        }}
        loadingId={chatLoadingId}
      />
      <ScrollArchor />
    </div>
  );
};

export default memo(ChatList);
