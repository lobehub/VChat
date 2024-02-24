import ActionBar from './ActionBar';

import useChatInput from '@/panels/ChatPanel/ChatBot/useChatInput';
import { useSessionStore } from '@/store/session';
import { ActionIcon, ChatInputActionBar, ChatInputArea, ChatSendButton } from '@lobehub/ui';
import { Maximize2, Minimize2 } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';

interface ChatInputProps {
  style?: React.CSSProperties;
  className?: string;
  expand: boolean;
  setExpand: (expand: boolean) => void;
}

const INITIAL_INPUT_HEIGHT = 200;

const ChatInput = (props: ChatInputProps) => {
  const { style, className, setExpand, expand } = props;
  const { onSend } = useChatInput();
  const [messageInput, setMessageInput] = useSessionStore((s) => [
    s.messageInput,
    s.setMessageInput,
  ]);
  const [inputHeight, setInputHeight] = useState(INITIAL_INPUT_HEIGHT);

  const handleSizeChange = useCallback(
    (_: any, size: any) => {
      if (!size) return;
      setInputHeight(typeof size.height === 'string' ? Number.parseInt(size.height) : size.height);
    },
    [setInputHeight],
  );

  const bottomAddons = useMemo(() => {
    return <ChatSendButton texts={{ send: '发送', warp: '换行' }} onSend={onSend} />;
  }, [onSend]);

  const topAddons = useMemo(() => {
    return (
      <ChatInputActionBar
        leftAddons={<ActionBar />}
        rightAddons={
          <ActionIcon
            icon={expand ? Minimize2 : Maximize2}
            onClick={() => {
              setExpand(!expand);
            }}
          />
        }
      />
    );
  }, [expand]);

  return (
    <ChatInputArea
      bottomAddons={bottomAddons}
      topAddons={topAddons}
      value={messageInput}
      onInput={(value) => setMessageInput(value)}
      className={className}
      style={style}
      expand={expand}
      onSizeChange={handleSizeChange}
      setExpand={setExpand}
      heights={{ minHeight: INITIAL_INPUT_HEIGHT, inputHeight }}
      // onSend={onSend}
      placeholder="请输入内容开始聊天"
    />
  );
};

export default memo(ChatInput);
