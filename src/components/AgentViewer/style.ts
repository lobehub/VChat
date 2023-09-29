import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, cx, css }, { isHover }: { isHover: boolean }) => ({
  vrm: cx(
    css`
      position: fixed;
      /* backdrop-filter: saturate(180%) blur(10px); */
      /* background-color: ${isHover ? token.colorFillTertiary : 'transparent'}; */
      width: 400px;
      z-index: 10;
      height: 60vh;
      min-height: 480px;
      right: 0;
      bottom: 0;
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
