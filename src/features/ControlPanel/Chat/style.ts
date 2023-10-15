import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  chatbot: css`
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  `,
}));

export { useStyles };
