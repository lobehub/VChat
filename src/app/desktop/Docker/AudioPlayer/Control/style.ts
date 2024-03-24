import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  control: css`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
}));

export { useStyles };
