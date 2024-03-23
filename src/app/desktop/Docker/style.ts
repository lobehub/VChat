import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  docker: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    bottom: 0px;
    left: 0px;
  `,
  player: css``,
  apps: css``,
  sidebar: css``,
}));
