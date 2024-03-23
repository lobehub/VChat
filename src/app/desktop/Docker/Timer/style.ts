import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  timer: css`
    display: flex;
  `,
  time: css`
    font-size: 24px;
    font-weight: bold;
  `,
  date: css`
    font-size: 12px;
  `,
}));
