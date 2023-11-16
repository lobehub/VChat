import { useConfigStore } from '@/store/config';
import { fetchSEE } from '@/utils/fetch';
import { ActionIcon, ChatInputArea, DraggablePanel, Icon, TokenTag } from '@lobehub/ui';
import { Button } from 'antd';
import { useTheme } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { Archive, Eraser, Languages, Mic } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
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
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const { styles } = useStyles();
  const theme = useTheme();
  const setting = useConfigStore((s) => s.setting, isEqual);

  const sendMessage = async (message: string) => {
    let output = '';
    const res = await fetchSEE(
      '/api/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: setting.model,
          endpoint: setting.endpoint,
          apiKey: setting.apikey,
          messages: [
            { role: 'system', content: '你是个有用的助手' },
            { role: 'user', content: message },
          ],
        }),
      },
      {
        onMessageHandle: (txt: string) => {
          output += txt;
          console.log(output);
        },
      },
    );
    return res;
  };

  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition>();

  const handleRecognitionResult = useCallback((event: SpeechRecognitionEvent) => {
    const text = event.results[0][0].transcript;
    setMessage(text);

    if (event.results[0].isFinal) {
      setMessage(text);
      sendMessage(text);
    }
  }, []);

  const handleRecognitionEnd = useCallback(() => {
    setIsRecording(false);
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.addEventListener('result', handleRecognitionResult);
    recognition.addEventListener('end', handleRecognitionEnd);

    setSpeechRecognition(recognition);
  }, [handleRecognitionResult, handleRecognitionEnd]);

  const handleRecord = () => {
    if (isRecording) {
      speechRecognition?.abort();
      setIsRecording(false);

      return;
    }

    speechRecognition?.start();
    setIsRecording(true);
  };
  return (
    <div className={classNames(styles.chatbot, className)} style={style}>
      <div style={{ flex: 1, overflow: 'scroll' }}>
        <ChatList />
      </div>
      <DraggablePanel expandable={false} fullscreen={expand} minHeight={200} placement="bottom">
        <ChatInputArea
          actions={
            <>
              {/* @ts-ignore */}
              <ActionIcon icon={Languages} />
              {/* @ts-ignore */}
              <ActionIcon icon={Eraser} />
              {/* @ts-ignore */}
              <ActionIcon icon={Mic} onClick={handleRecord} loading={isRecording} />
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
