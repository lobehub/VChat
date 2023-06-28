import { ActionIcon, ChatInputArea, DraggablePanel, Icon, TokenTag } from '@lobehub/ui';
import { Button } from 'antd';
import { Archive, Eraser, Languages, Mic } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useTheme } from 'antd-style';
import ChatList from './ChatList';
import { useStyles } from './style';

const ChatBot = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('123');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const { styles } = useStyles();
  const theme = useTheme();

  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition>();

  const handleRecognitionResult = useCallback((event: SpeechRecognitionEvent) => {
    const text = event.results[0][0].transcript;
    setMessage(text);

    if (event.results[0].isFinal) {
      setMessage(text);
      // onChatProcessStart(text);
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
    <div className={styles.chatbot}>
      <div style={{ flex: 1, overflow: 'scroll' }}>
        <ChatList />
      </div>
      <DraggablePanel expandable={false} fullscreen={expand} minHeight={200} placement="bottom">
        <div>{message}</div>
        <ChatInputArea
          actions={
            <>
              <ActionIcon icon={Languages} />
              <ActionIcon icon={Eraser} />
              <ActionIcon icon={Mic} onClick={handleRecord} loading={isRecording} />
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
