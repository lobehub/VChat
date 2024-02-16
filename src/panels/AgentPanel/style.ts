import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  content: css`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    flex-grow: 1;
  `,
}));
