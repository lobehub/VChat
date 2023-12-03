import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { handleStopSpeakAi } from '@/services/chat';
import { useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import { ActionIcon, ChatInputArea, TokenTag } from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { useTheme } from 'antd-style';
import { isEqual } from 'lodash-es';
import { AudioLines, Eraser, Mic } from 'lucide-react';

interface ChatBotProps {
  style?: React.CSSProperties;
  className?: string;
  expand: boolean;
  onExpandChange: (expand: boolean) => void;
}

const ChatInput = (props: ChatBotProps) => {
  const { style, className, onExpandChange, expand } = props;
  const [sendMessage, clearHistory, setMessageInput] = useSessionStore((s) => [
    s.sendMessage,
    s.clearHistory,
    s.setMessageInput,
  ]);
  const messageInput = useSessionStore((s) => s.messageInput);
  const voiceLoading = useSessionStore((s) => s.voiceLoading);
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

  const theme = useTheme();

  const usedTokens = useCalculateToken();

  return (
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
            <ActionIcon icon={Eraser} title="删除历史消息" />
          </Popconfirm>
          {/* @ts-ignore */}
          <ActionIcon icon={Mic} onClick={toggleRecord} loading={isRecording} title="语音识别" />
          {/* @ts-ignore */}
          <ActionIcon
            icon={AudioLines}
            onClick={handleStopSpeakAi}
            loading={voiceLoading}
            title="语音合成"
          />
          <TokenTag
            maxValue={
              OPENAI_MODEL_LIST.find((item) => item.name === setting.model)?.maxToken || 4096
            }
            value={usedTokens}
          />
        </>
      }
      value={messageInput}
      className={className}
      style={{ background: theme.colorBgContainer, ...style }}
      expand={expand}
      onInputChange={(value) => {
        setMessageInput(value);
      }}
      text={{
        send: '发送',
      }}
      /* @ts-ignore */
      minHeight={200}
      onExpandChange={onExpandChange}
      onSend={(value) => {
        sendMessage(value);
      }}
      placeholder="请输入内容开始聊天"
    />
  );
};

export default ChatInput;
