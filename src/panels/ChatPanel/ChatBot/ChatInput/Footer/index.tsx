import { ChatSendButton } from '@lobehub/ui';
import useChatInput from '../../useSendMessage';

const Footer = () => {
  const onSend = useChatInput();
  return <ChatSendButton texts={{ send: '发送', warp: '换行' }} onSend={onSend} />;
};

export default Footer;
