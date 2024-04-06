import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  actions: css``,
  author: css`
    font-size: 12px;
  `,
  avatar: css`
    flex: none;
  `,
  container: css`
    height: 100%;
    overflow-y: auto;
  `,
  date: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
  desc: css`
    color: ${token.colorTextDescription};
    text-align: center;
  `,
  footer: css`
    white-space: break-spaces;
    padding: 16px 16px 24px;
  `,
  header: css`
    position: relative;
    padding: 16px 16px 24px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,

  title: css`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    display: flex;
    align-items: center;
  `,
}));
