import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { ActionIcon, ChatInputArea, DraggablePanel, Icon, TokenTag } from '@lobehub/ui';
import { Button, Popconfirm } from 'antd';
import { useTheme } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
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
  const { sendMessage, clearHistory, setMessageInput, messageInput } = useSessionStore();
  const setting = useConfigStore((s) => s.setting, isEqual);
  const { isRecording, toggleRecord } = useSpeechRecognition({
    onMessage: (result, isFinal) => {
      setMessageInput(result);
      if (isFinal) {
        sendMessage(result);
        setMessageInput('');
      }
    },
  });

  const { styles } = useStyles();
  const theme = useTheme();

  const usedTokens = useCalculateToken();

  return (
    <div className={classNames(styles.chatbot, className)} style={style}>
      <ChatList style={{ flex: 1, overflow: 'scroll' }} />
      <DraggablePanel expandable={false} fullscreen={expand} minHeight={200} placement="bottom">
        <ChatInputArea
          actions={
            <>
              <Popconfirm
                title="确定删除历史消息？"
                description="该操作不可逆，请谨慎操作"
                onConfirm={clearHistory}
                okText="确定"
                cancelText="取消"
              >
                {/* @ts-ignore */}
                <ActionIcon icon={Eraser} />
              </Popconfirm>
              {/* @ts-ignore */}
              <ActionIcon icon={Mic} onClick={toggleRecord} loading={isRecording} />
              <TokenTag
                maxValue={
                  OPENAI_MODEL_LIST.find((item) => item.name === setting.model)?.maxToken || 4096
                }
                value={usedTokens}
              />
            </>
          }
          value={messageInput}
          style={{ background: theme.colorBgContainer }}
          expand={expand}
          onInputChange={(value) => {
            setMessageInput(value);
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
