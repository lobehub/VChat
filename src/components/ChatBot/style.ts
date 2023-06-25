import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  chatbot: css`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px);
  `,
}));

export { useStyles };
