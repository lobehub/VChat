import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  vrm: css`
    position: fixed;
    /* background-color: #fff; */
    width: 480px;
    z-index: 1048;
    height: 50vh;
    min-height: 480px;
    right: 0;
    bottom: 0;
  `,
  loading: css`
    position: absolute;
    top: 50%;
    left: 50%;
  `,
}));

export { useStyles };
