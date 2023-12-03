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
  const updateMessage = useSessionStore((s) => s.updateMessage);
  const [voiceLoading, setVoiceLoading] = useSessionStore((s) => [
    s.voiceLoading,
    s.setVoiceLoading,
  ]);
  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s), isEqual);

  const tts = {
    icon: Play,
    key: 'tts',
    label: '语音合成',
  } as ActionIconGroupItems;

  const AssistantActionsBar: RenderAction = ({ onActionClick, id }) => (
    <ActionIconGroup dropdownMenu={[tts]} items={[]} onActionClick={onActionClick} type="ghost" />
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
        onMessageChange={(id, content) => {
          updateMessage(id, content);
        }}
        text={{
          cancel: '取消',
          confirm: '确认',
          edit: '编辑',
          delete: '删除',
          regenerate: '重新生成',
          copy: '复制',
          copySuccess: '复制成功',
        }}
        loadingId={chatLoadingId}
      />
      <ScrollArchor />
    </div>
  );
};

export default memo(ChatList);
