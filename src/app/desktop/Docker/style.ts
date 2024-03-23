import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  docker: css`
    display: flex;
    justify-content: space-between;
    backdrop-filter: saturate(180%) blur(10px);
    background-color: ${token.colorBgMask};
    border-top: 1px solid #999;
    align-items: center;
    width: 100%;
    z-index: 100;
    padding: 0 24px;
    position: fixed;
    bottom: 0px;
    left: 0px;
  `,
  player: css``,
  apps: css``,
  sidebar: css``,
}));
