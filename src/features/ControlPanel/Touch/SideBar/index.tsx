import { createStyles } from 'antd-style';
import { ReactNode, memo } from 'react';
import SessionList from './SessionList';

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
  return <SessionList />;
});

export default SideBar;
