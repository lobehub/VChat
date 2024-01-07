import { handleSpeakAi } from '@/services/chat';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { ErrorTypeEnum } from '@/types/api';
import {
  ActionIconGroup,
  ChatMessage,
  ChatList as LobeChatList,
  ChatListProps as LobeChatListProps,
  RenderAction,
  useChatListActionsBar,
} from '@lobehub/ui';
import { ActionEvent, ActionIconGroupItems } from '@lobehub/ui/es/ActionIconGroup';
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
  const [updateMessage, regenerateMessage, deleteMessage] = useSessionStore((s) => [
    s.updateMessage,
    s.regenerateMessage,
    s.deleteMessage,
  ]);
  const { copy, regenerate, divider, del, edit } = useChatListActionsBar({
    edit: '编辑',
    delete: '删除',
    regenerate: '重新生成',
    copy: '复制',
  });
  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s), isEqual);

  const tts = {
    icon: Play,
    key: 'tts',
    label: '语音合成',
  } as ActionIconGroupItems;

  const AssistantActionsBar: RenderAction = ({ onActionClick, id }) => (
    <ActionIconGroup
      dropdownMenu={[tts, regenerate, copy, divider, del]}
      items={[regenerate, edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );

  const userActionsBar: RenderAction = ({ onActionClick, id }) => (
    <ActionIconGroup
      dropdownMenu={[copy, divider, del]}
      items={[edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );

  const renderActions: LobeChatListProps['renderActions'] = {
    assistant: AssistantActionsBar,
    user: userActionsBar,
  };

  const renderErrorMessages: LobeChatListProps['renderErrorMessages'] = {
    [ErrorTypeEnum.API_KEY_MISSING]: {
      Render: ({ error }: ChatMessage) => <div>{error.message}</div>,
    },
    [ErrorTypeEnum.OPENAI_API_ERROR]: {
      Render: ({ error }: ChatMessage) => <div>{error.message}</div>,
    },
    [ErrorTypeEnum.INTERNAL_SERVER_ERROR]: {
      Render: ({ error }: ChatMessage) => <div>{error.message}</div>,
    },
  };

  const onActionsClick = (action: ActionEvent, message: ChatMessage) => {
    const { key } = action;
    const { content, id } = message;
    if (key === 'tts') {
      handleSpeakAi(content);
    } else if (key === 'regenerate') {
      regenerateMessage(id);
    } else if (key === 'del') {
      deleteMessage(id);
    }
  };

  const renderMessages: LobeChatListProps['renderMessages'] = {
    default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
  };

  return (
    <div style={style} className={className}>
      <LobeChatList
        data={currentChats || []}
        showTitle={true}
        type="chat"
        renderActions={renderActions}
        renderMessages={renderMessages}
        renderErrorMessages={renderErrorMessages}
        onActionsClick={onActionsClick}
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
