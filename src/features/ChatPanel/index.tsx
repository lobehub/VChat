import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import classNames from 'classnames';
import { memo } from 'react';
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
  const [setChatPanelOpen] = useConfigStore((s) => [s.setChatPanelOpen]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setChatPanelOpen(false)}
      title="对话列表"
    >
      <div style={style} className={classNames(className, styles.content)}>
        <SideBar />
        <ChatBot />
      </div>
    </Panel>
  );
};

export default memo(ChatPanel);