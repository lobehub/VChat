import { useSessionStore } from '@/store/session';
import { useCallback } from 'react';

const useChatInput = () => {
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

  return { messageInput, onSend };
};

export default useChatInput;
