import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  application: css`
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    padding: 16px;
    border-radius: 2px;
    user-select: none;
    cursor: pointer;
    &:hover {
      background: ${token.colorBgTextHover};
    }
  `,
}));
