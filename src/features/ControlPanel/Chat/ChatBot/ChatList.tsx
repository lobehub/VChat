import { speakCharacter } from '@/features/messages/speakCharacter';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';
import { ChatList as LobeChatList } from '@lobehub/ui';
import { isEqual } from 'lodash-es';
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
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s), isEqual);
  const { viewer } = useViewerStore();
  console.log('render chatlist');

  return (
    <div style={style} className={className}>
      <LobeChatList
        data={currentChats || []}
        showTitle={true}
        type="chat"
        // @ts-ignore
        // renderActions={ActionsBar}
        renderMessages={{
          default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
        }}
        onActionsClick={({ key }, { content }) => {
          if (key === 'regenerate') {
            speakCharacter(
              {
                emotion: 'aa',
                tts: {
                  ...currentAgent?.tts,
                  message: content,
                },
              },
              viewer,
            );
          }
        }}
        loadingId={chatLoadingId}
      />
      <ScrollArchor />
    </div>
  );
};

export default memo(ChatList);
