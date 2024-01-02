import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { memo } from 'react';
import ChatBot from './ChatBot';
import SideBar from './SideBar';

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
      <SideBar />
      <ChatBot />
    </div>
  );
};

export default memo(Chat);
