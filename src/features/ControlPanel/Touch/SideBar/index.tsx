import { createStyles } from 'antd-style';
import { ReactNode, memo } from 'react';
import AreaList from './AreaList';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

// eslint-disable-next-line react/display-name
const SideBar = memo<{ children?: ReactNode }>(({ children }) => {
  return <AreaList />;
});

export default SideBar;
