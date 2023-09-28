import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    position: fixed;
    bottom: 0;
    border-top: 1px solid ${token.colorBorderSecondary};
    left: 64px;
    width: calc(100vw - 64px);
    z-index: 12;
    height: 96px;
  `,
  player: css`
    display: flex;
    align-items: center;
  `,
  top: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  control: css`
    display: flex;
    align-items: center;
  `,
  volume: css`
    display: flex;
    align-items: center;
  `,
  name: css`
    font-size: 16px;
    font-weight: 500;
  `,
}));

export { useStyles };
