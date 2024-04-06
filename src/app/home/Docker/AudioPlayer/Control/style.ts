import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  back: css`
    cursor: pointer;
    margin-right: ${token.marginSM}px;
  `,
  control: css`
    display: flex;
    justify-content: center;
    align-items: center;
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
