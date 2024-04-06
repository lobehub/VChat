import { createStyles } from 'antd-style';
import { rgba } from 'polished';

export const useStyles = createStyles(({ css, token }) => ({
  apps: css``,
  docker: css`
    display: flex;
    justify-content: space-between;
    backdrop-filter: saturate(180%) blur(10px);
    background-color: ${rgba(token.colorBgLayout, 0.8)};
    border-top: 1px solid ${token.colorSplit};
    align-items: center;
    width: 100%;
    z-index: 100;
    padding: 8px 12px;
  `,
  message: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  player: css``,
}));
