import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, cx, css }, { isHover }: { isHover: boolean }) => ({
  vrm: cx(
    css`
      position: relative;
      width: 100vw;
      height: calc(100vh - 64px);
      transition: background-color 100ms ${token.motionEaseOut};
    `,
  ),
  loading: css`
    position: absolute;
    top: 50%;
    left: 50%;
  `,
}));

export { useStyles };
