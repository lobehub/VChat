import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  vrm: css`
    height: calc(100vh - 64px);
    position: relative;
  `,
  loading: css`
    position: absolute;
    top: 50%;
    left: 50%;
  `,
}));

export { useStyles };
