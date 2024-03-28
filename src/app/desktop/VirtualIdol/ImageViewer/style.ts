import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  content: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 128px);
  `,
}));
