import { ActionIcon, ChatInputArea, DraggablePanel, Icon, TokenTag } from '@lobehub/ui';
import { Button } from 'antd';
import { Archive, Eraser, Languages } from 'lucide-react';
import { useState } from 'react';
import ChatList from './ChatList';
import { useStyles } from './style';

const ChatBot = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const { styles } = useStyles();
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
              <TokenTag maxValue={5000} value={1000} />
            </>
          }
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
