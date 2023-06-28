import { ActionIcon, ChatInputArea, DraggablePanel, Icon, TokenTag } from '@lobehub/ui';
import { Button } from 'antd';
import { Archive, Eraser, Languages, Mic } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from 'antd-style';
import ChatList from './ChatList';
import { useStyles } from './style';

const ChatBot = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const { styles } = useStyles();
  const theme = useTheme();
  return (
    <div className={styles.chatbot}>
      <div style={{ flex: 1, overflow: 'scroll' }}>
        <ChatList />
      </div>
      <DraggablePanel expandable={false} fullscreen={expand} minHeight={200} placement="bottom">
        <ChatInputArea
          actions={
            <>
              <ActionIcon icon={Languages} />
              <ActionIcon icon={Eraser} />
              <ActionIcon icon={Mic} />
              <TokenTag maxValue={5000} value={1000} />
            </>
          }
          style={{ background: theme.colorBgContainer }}
          expand={expand}
          footer={<Button icon={<Icon icon={Archive} />} />}
          minHeight={200}
          onExpandChange={setExpand}
          onSend={(value) => {
            console.log('value', value);
          }}
        />
      </DraggablePanel>
    </div>
  );
};

export default ChatBot;
