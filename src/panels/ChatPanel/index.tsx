'use client';

import Panel from '@/components/Panel';
import { FOCUS_Z_INDEX, INITIAL_Z_INDEX } from '@/constants/common';
import { useConfigStore } from '@/store/config';
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
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      onFocus={() => setPanel('chat', { zIndex: FOCUS_Z_INDEX })}
      onBlur={() => setPanel('chat', { zIndex: INITIAL_Z_INDEX })}
      zIndex={panel.chat.zIndex}
      coordinates={panel.chat.coordinates}
      onCoordinatesChange={(coordinates) => setPanel('chat', { coordinates })}
      onClose={() => setPanel('chat', { open: false })}
      title="对话列表"
    >
      <div style={style} className={classNames(className, styles.content)}>
        <SideBar />
        <ChatBot />
      </div>
    </Panel>
  );
};

export default ChatPanel;
