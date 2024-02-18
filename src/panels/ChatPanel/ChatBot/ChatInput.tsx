import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useCalculateToken } from '@/hooks/useCalculateToken';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { toogleVoice } from '@/services/chat';
import { configSelectors, useConfigStore } from '@/store/config';
import { useSessionStore } from '@/store/session';
import {
  ActionIcon,
  ChatInputActionBar,
  ChatInputArea,
  ChatSendButton,
  TokenTag,
} from '@lobehub/ui';
import { Popconfirm } from 'antd';
import { isEqual } from 'lodash-es';
import { EarIcon, EarOffIcon, Eraser, Maximize2, Mic, Minimize2 } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

interface ChatInputProps {
  style?: React.CSSProperties;
  className?: string;
  expand: boolean;
  setExpand: (expand: boolean) => void;
}

const INITIAL_INPUT_HEIGHT = 200;

const ChatInput = (props: ChatInputProps) => {
  const { style, className, setExpand, expand } = props;
  const [voiceOn, messageInput, sendMessage, clearHistory, setMessageInput] = useSessionStore(
    (s) => [s.voiceOn, s.messageInput, s.sendMessage, s.clearHistory, s.setMessageInput],
  );
  const [inputHeight, setInputHeight] = useState(INITIAL_INPUT_HEIGHT);
  const config = useConfigStore((s) => configSelectors.currentOpenAIConfig(s), isEqual);

  const handleMessageInput = useCallback(
    (result: string, isFinal: boolean) => {
      setMessageInput(result);
      if (isFinal) {
        sendMessage(result);
        setMessageInput('');
      }
    },
    [sendMessage, setMessageInput],
  );

  const { isRecording, toggleRecord } = useSpeechRecognition({
    onMessage: handleMessageInput,
  });

  const usedTokens = useCalculateToken();

  const handleSizeChange = useCallback(
    (_: any, size: any) => {
      if (!size) return;
      setInputHeight(typeof size.height === 'string' ? Number.parseInt(size.height) : size.height);
    },
    [setInputHeight],
  );

  const onSend = () => {
    sendMessage(messageInput);
    setMessageInput('');
  };

  return (
    <ChatInputArea
      bottomAddons={<ChatSendButton texts={{ send: '发送', warp: '换行' }} onSend={onSend} />}
      topAddons={
        <ChatInputActionBar
          leftAddons={
            <>
              <Popconfirm
                title="确定删除历史消息？"
                description="该操作不可逆，请谨慎操作"
                onConfirm={clearHistory}
                okText="确定"
                cancelText="取消"
              >
                <ActionIcon icon={Eraser} title="删除历史消息" />
              </Popconfirm>
              <ActionIcon
                icon={Mic}
                onClick={toggleRecord}
                loading={isRecording}
                title="语音识别"
              />
              {/* @ts-ignore */}
              <ActionIcon
                icon={voiceOn ? EarIcon : EarOffIcon}
                onClick={toogleVoice}
                title={voiceOn ? '关闭语音合成' : '开启语音合成'}
              />
              <TokenTag
                maxValue={
                  OPENAI_MODEL_LIST.find((item) => item.name === config?.model)?.maxToken || 4096
                }
                value={usedTokens}
              />
            </>
          }
          rightAddons={
            <>
              <ActionIcon
                icon={expand ? Minimize2 : Maximize2}
                onClick={() => {
                  setExpand(!expand);
                }}
              />
            </>
          }
        />
      }
      value={messageInput}
      onInput={(value) => setMessageInput(value)}
      className={className}
      style={style}
      expand={expand}
      onSizeChange={handleSizeChange}
      setExpand={setExpand}
      heights={{ minHeight: INITIAL_INPUT_HEIGHT, inputHeight }}
      onSend={onSend}
      placeholder="请输入内容开始聊天"
    />
  );
};

export default memo(ChatInput);
