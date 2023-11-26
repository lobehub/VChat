import { speakCharacter } from '@/features/messages/speakCharacter';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { useViewerStore } from '@/store/viewer';
import {
  ActionIcon,
  ChatInputArea,
  DraggablePanel,
  Icon,
  ChatList as LobeChatList,
  TokenTag,
} from '@lobehub/ui';
import { Button } from 'antd';
import { useTheme } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { Archive, Eraser, Mic } from 'lucide-react';
import { useState } from 'react';
import ScrollArchor from './ScrollArchor';
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
  const currentChats = useSessionStore((s) => sessionSelectors.currentChats(s), isEqual);
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s), isEqual);
  const { viewer } = useViewerStore();
  const { isRecording, toggleRecord } = useSpeechRecognition({
    onMessage: (result, isFinal) => {
      setMessage(result);
      if (isFinal) {
        sendMessage(result);
      }
    },
  });

  return (
    <div className={classNames(styles.chatbot, className)} style={style}>
      <div style={{ flex: 1, overflow: 'scroll' }}>
        <LobeChatList
          data={currentChats || []}
          showTitle={true}
          type="chat"
          // @ts-ignore
          // renderActions={ActionsBar}
          renderMessages={{
            default: ({ id, editableContent }) => <div id={id}>{editableContent}</div>,
          }}
          onActionsClick={({ key }, { content }) => {
            if (key === 'regenerate') {
              speakCharacter(
                {
                  emotion: 'aa',
                  tts: {
                    ...currentAgent?.tts,
                    message: content,
                  },
                },
                viewer,
              );
            }
          }}
          loadingId={chatLoadingId}
        />
        <ScrollArchor />
      </div>
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
