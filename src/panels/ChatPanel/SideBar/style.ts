import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  date: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
  desc: css`
    color: ${token.colorTextDescription};
    text-align: center;
  `,
  header: css`
    padding: 16px 8px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
    display: flex;
    width: 100%;
    justify-content: space-between;
  `,

  title: css`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  `,
}));
