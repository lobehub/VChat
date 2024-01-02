import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { memo } from 'react';
import ActionList from './ActionList';
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
