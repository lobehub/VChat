import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  timer: css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `,
  time: css`
    font-size: 12px;
  `,
  date: css`
    font-size: 12px;
  `,
}));
