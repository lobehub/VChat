import { handleSpeakAi, handleStopSpeakAi } from '@/services/chat';
import { sessionSelectors, useSessionStore } from '@/store/session';
import {
  ActionIconGroup,
  ChatList as LobeChatList,
  ChatListProps as LobeChatListProps,
  RenderAction,
} from '@lobehub/ui';
import { ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
import { isEqual } from 'lodash-es';
import { Pause, Play } from 'lucide-react';
import { memo } from 'react';
import ScrollArchor from './ScrollArchor';

interface ChatListProps {
  style?: React.CSSProperties;
  className?: string;
}

const ChatList = (props: ChatListProps) => {
  const { style, className } = props;
  const chatLoadingId = useSessionStore((s) => s.chatLoadingId);
  const [voiceLoading, setVoiceLoading] = useSessionStore((s) => [
    s.voiceLoading,
    s.setVoiceLoading,
  ]);
  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s), isEqual);

  const tts = {
    icon: voiceLoading ? Pause : Play,
    key: 'tts',
    label: '文字转语音',
  } as ActionIconGroupItems;

  const AssistantActionsBar: RenderAction = ({ onActionClick, id }) => (
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
            if (voiceLoading) {
              handleStopSpeakAi();
              setVoiceLoading(false);
            } else {
              setVoiceLoading(true);
              handleSpeakAi(
                content,
                () => {},
                () => {
                  setVoiceLoading(false);
                },
              );
            }
          }
        }}
        loadingId={chatLoadingId}
      />
      <ScrollArchor />
    </div>
  );
};

export default memo(ChatList);
