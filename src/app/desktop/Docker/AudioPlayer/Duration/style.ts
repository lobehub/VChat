import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  duration: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  counter: css`
    font-size: 12px;
  `,
}));

export { useStyles };
