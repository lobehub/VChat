import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  header: css`
    padding: 16px 8px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `,
  voice: css`
    cursor: pointer;
    transition: color 0.3s;
  `,
  voiceOn: css`
    color: ${token.colorLinkActive};
  `,
  chatbot: css`
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  `,
}));

export { useStyles };
