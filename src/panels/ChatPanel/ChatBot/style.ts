import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  header: css`
    padding: 16px 8px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    display: flex;
    width: 100%;
    justify-content: space-between;
  `,
  chatbot: css`
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  `,
}));

export { useStyles };
