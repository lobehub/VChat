import { createStyles } from 'antd-style';
import classNames from 'classnames';
import ChatBot from './ChatBot';
import SessionList from './SessionList';

const useStyles = createStyles(({ css }) => ({
  container: css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
}));

interface ChatProps {
  style?: React.CSSProperties;
  className?: string;
}

const Chat = (props: ChatProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <div style={style} className={classNames(className, styles.container)}>
      <SessionList />
      <ChatBot />
    </div>
  );
};

export default Chat;
