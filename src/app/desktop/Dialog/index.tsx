import ChatItem from '@/panels/ChatPanel/ChatBot/ChatList/ChatItem';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useStyles } from './style';

const Dialog = () => {
  const { styles } = useStyles();
  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s));
  const lastAgentChatIndex = currentChats.findLastIndex((item) => item.role === 'assistant');
  return lastAgentChatIndex !== -1 ? (
    <div className={styles.dialog}>
      <ChatItem
        id={currentChats[lastAgentChatIndex].id}
        index={lastAgentChatIndex}
        showTitle={true}
        type="block"
      />
    </div>
  ) : null;
};

export default Dialog;
