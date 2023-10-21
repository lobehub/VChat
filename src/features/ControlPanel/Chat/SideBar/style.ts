import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  author: css`
    font-size: 12px;
  `,

  avatar: css`
    flex: none;
  `,
  header: css`
    padding: 16px 8px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
  date: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
  desc: css`
    color: ${token.colorTextDescription};
    text-align: center;
  `,

  title: css`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  `,
}));
