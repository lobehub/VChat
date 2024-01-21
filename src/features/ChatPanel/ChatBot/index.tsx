import { DraggablePanel } from '@lobehub/ui';
import classNames from 'classnames';
import { memo, useState } from 'react';
import ChatHeader from './ChatHeader';
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
      <ChatHeader />
      <ChatList style={{ flex: 1, overflow: 'auto' }} />
      <DraggablePanel expandable fullscreen={expand} minHeight={200} placement="bottom">
        <ChatInput expand={expand} onExpandChange={(expand) => setExpand(expand)} />
      </DraggablePanel>
    </div>
  );
};

export default memo(ChatBot);
