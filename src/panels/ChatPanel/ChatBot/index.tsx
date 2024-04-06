import classNames from 'classnames';
import { memo } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from '../../../features/ChatInput';
import ChatList from './ChatList';
import { useStyles } from './style';

interface ChatBotProps {
  className?: string;
  style?: React.CSSProperties;
}

const ChatBot = (props: ChatBotProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <div className={classNames(styles.chatbot, className)} style={style}>
      <ChatHeader />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <ChatList />
      </div>
      <ChatInput />
    </div>
  );
};

export default memo(ChatBot);
