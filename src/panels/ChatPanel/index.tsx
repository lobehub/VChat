'use client';

import PanelContainer from '@/panels/PanelContainer';
import classNames from 'classnames';
import ChatBot from './ChatBot';
import SideBar from './SideBar';
import { useStyles } from './style';

interface ChatPanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const ChatPanel = (props: ChatPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <PanelContainer style={style} className={className} panelKey="chat" title="聊天">
      <div style={style} className={classNames(className, styles.content)}>
        <SideBar />
        <ChatBot />
      </div>
    </PanelContainer>
  );
};

export default ChatPanel;
