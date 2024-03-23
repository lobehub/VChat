import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(({ css, token }) => ({
  docker: css`
    display: flex;
    justify-content: space-between;
    backdrop-filter: saturate(180%) blur(10px);
    background-color: ${rgba(token.colorBgLayout, 0.8)};
    border-top: 1px solid ${token.colorSplit};
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
