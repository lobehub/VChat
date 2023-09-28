import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  player: css`
    position: fixed;
    bottom: 0;
    left: 64px;
    width: calc(100vw - 64px);
    height: 96px;
  `,
  top: css`
    width: 100%;
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
