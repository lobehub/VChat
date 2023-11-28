import { DraggablePanel } from '@lobehub/ui';
import classNames from 'classnames';
import { useState } from 'react';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import { useStyles } from './style';

interface ChatBotProps {
  style?: React.CSSProperties;
  className?: string;
}

const ChatBot = (props: ChatBotProps) => {
  const { style, className } = props;
  const [expand, setExpand] = useState<boolean>(false);
  const { styles } = useStyles();

  return (
    <div className={classNames(styles.chatbot, className)} style={style}>
      <ChatList style={{ flex: 1, overflow: 'scroll' }} />
      <DraggablePanel expandable={false} fullscreen={expand} minHeight={200} placement="bottom">
        <ChatInput expand={expand} onExpandChange={(expand) => setExpand(expand)} />
      </DraggablePanel>
    </div>
  );
};

export default ChatBot;
