import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSessionStore } from '@/store/session';
import { ActionIcon, ChatInputArea, DraggablePanel, Icon, TokenTag } from '@lobehub/ui';
import { Button } from 'antd';
import { useTheme } from 'antd-style';
import classNames from 'classnames';
import { Archive, Eraser, Mic } from 'lucide-react';
import { useState } from 'react';
import ChatList from './ChatList';
import { useStyles } from './style';

interface ChatBotProps {
  style?: React.CSSProperties;
  className?: string;
}

const ChatBot = (props: ChatBotProps) => {
  const { style, className } = props;
  const [expand, setExpand] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { styles } = useStyles();
  const theme = useTheme();
  const { sendMessage, chatLoadingId } = useSessionStore();
  const { isRecording, toggleRecord } = useSpeechRecognition({
    onMessage: (result, isFinal) => {
      setMessage(result);
      if (isFinal) {
        sendMessage(result);
        setMessage('');
      }
    },
  });

  return (
    <div className={classNames(styles.chatbot, className)} style={style}>
      <ChatList style={{ flex: 1, overflow: 'scroll' }} />
      <DraggablePanel expandable={false} fullscreen={expand} minHeight={200} placement="bottom">
        <ChatInputArea
          actions={
            <>
              {/* @ts-ignore */}
              <ActionIcon icon={Eraser} />
              {/* @ts-ignore */}
              <ActionIcon icon={Mic} onClick={toggleRecord} loading={isRecording} />
              <TokenTag maxValue={5000} value={1000} />
            </>
          }
          value={message}
          style={{ background: theme.colorBgContainer }}
          expand={expand}
          onInputChange={(value) => {
            setMessage(value);
          }}
          /* @ts-ignore */
          footer={<Button icon={<Icon icon={Archive} />} />}
          minHeight={200}
          onExpandChange={setExpand}
          onSend={(value) => {
            sendMessage(value);
          }}
          placeholder="请输入内容开始聊天"
        />
      </DraggablePanel>
    </div>
  );
};

export default ChatBot;
