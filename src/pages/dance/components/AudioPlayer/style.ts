import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  player: css`
    height: 64px;
    width: 100%;
  `,
  name: css`
    font-size: 24px;
    font-weight: 500;
  `,
}));

export { useStyles };
