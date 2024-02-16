import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  application: css`
    width: 80px;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    padding: 16px;
  `,
  avatar: css``,
  title: css`
    margin-top: 8px;
  `,
}));
