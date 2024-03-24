import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  control: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  back: css`
    cursor: pointer;
    margin-right: ${token.marginSM}px;
  `,
  forward: css`
    cursor: pointer;
    margin-left: ${token.marginSM}px;
  `,
  playPause: css`
    cursor: pointer;
  `,
}));

export { useStyles };
