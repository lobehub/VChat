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
      background: ${token.colorBgContainer};
    }
  `,
  selected: css`
    background: ${token.colorBgElevated};
  `,
  avatar: css``,
  title: css`
    margin-top: 8px;
  `,
}));
