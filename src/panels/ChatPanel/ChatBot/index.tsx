import ScrollArcher from '@/panels/ChatPanel/ChatBot/ScrollArcher';
import { BackBottom } from '@lobehub/ui';
import classNames from 'classnames';
import { memo, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput/index';
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
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }} ref={ref} id="chat-list">
        <ChatList />
        <ScrollArcher />
        <BackBottom target={ref} text={'返回底部'} />
      </div>
      <ChatInput />
    </div>
  );
};

export default memo(ChatBot);
