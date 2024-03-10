import { renderErrorMessages } from '@/panels/ChatPanel/ChatBot/Error';
import { handleSpeakAi } from '@/services/chat';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { ChatMessage, ChatList as LobeChatList } from '@lobehub/ui';
import { ActionEvent } from '@lobehub/ui/es/ActionIconGroup';
import { isEqual } from 'lodash-es';
import { memo } from 'react';
import { renderActions } from './Actions';
import { renderMessages } from './Messages';

const ChatList = () => {
  const [chatLoadingId, updateMessage, regenerateMessage, deleteMessage] = useSessionStore((s) => [
    s.chatLoadingId,
    s.updateMessage,
    s.regenerateMessage,
    s.deleteMessage,
  ]);

  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s), isEqual);

  const onActionsClick = (action: ActionEvent, message: ChatMessage) => {
    const { key } = action;
    const { content, id } = message;
    if (key === 'tts') {
      handleSpeakAi(content);
    } else if (key === 'regenerate') {
      regenerateMessage(id);
      deleteMessage(id);
    } else if (key === 'del') {
      deleteMessage(id);
    }
  };

  return (
    <LobeChatList
      data={currentChats}
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
  );
};

export default memo(ChatList);
