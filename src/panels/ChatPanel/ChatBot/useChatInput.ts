import { useSessionStore } from '@/store/session';
import { useCallback, useState } from 'react';

const useChatInput = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [messageInput, sendMessage, setMessageInput] = useSessionStore((s) => [
    s.messageInput,
    s.sendMessage,
    s.setMessageInput,
  ]);
  const onSend = useCallback(() => {
    const store = useSessionStore.getState();
    sendMessage(store.messageInput);
    setMessageInput('');
  }, []);

  return { messageInput, onSend, setMessageInput, expand, setExpand };
};

export default useChatInput;
