import ScrollArcher from '@/panels/ChatPanel/ChatBot/ScrollArcher';
import { BackBottom } from '@lobehub/ui';
import classNames from 'classnames';
import { memo, useRef } from 'react';
import ChatHeader from './ChatHeader';
import Index from './ChatInput';
import ChatList from './ChatList';
import { useStyles } from './style';

interface ChatBotProps {
  style?: React.CSSProperties;
  className?: string;
}

const ChatBot = (props: ChatBotProps) => {
  const { style, className } = props;
  const ref = useRef(null);
  const { styles } = useStyles();

  return (
    <div className={classNames(styles.chatbot, className)} style={style}>
      <ChatHeader />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }} id="chat-list">
        <div style={{ height: '100%', overflow: 'scroll' }} ref={ref}>
          <ChatList />
          <ScrollArcher />
        </div>
        <BackBottom target={ref} text={'返回底部'} />
      </div>
      <Index />
    </div>
  );
};

export default memo(ChatBot);
