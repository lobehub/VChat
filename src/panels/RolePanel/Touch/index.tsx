import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { memo } from 'react';
import ActionList from './ActionList';
import SideBar from './SideBar';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    position: relative;
    display: flex;
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    width: 100%;
    min-height: 500px;
  `,
}));

interface TouchProps {
  style?: React.CSSProperties;
  className?: string;
}

const Touch = (props: TouchProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <div style={style} className={classNames(className, styles.container)}>
      <SideBar />
      <ActionList />
    </div>
  );
};

export default memo(Touch);
