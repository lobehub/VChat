import styled from 'styled-components';
import ChatBot from './ChatBot';
import SessionList from './SessionList';

const View = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 500px;
`;

interface ChatProps {
  style?: React.CSSProperties;
  className?: string;
}

const Chat = (props: ChatProps) => {
  const { style, className } = props;

  return (
    <View style={style} className={className}>
      <SessionList />
      <ChatBot />
    </View>
  );
};

export default Chat;
