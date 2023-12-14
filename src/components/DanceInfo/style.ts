import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    height: 100%;
    overflow-y: auto;
  `,
  header: css`
    position: relative;
    padding: 16px 16px 24px;
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
  footer: css`
    white-space: break-spaces;
    padding: 16px 16px 24px;
  `,
  author: css`
    font-size: 12px;
  `,
  avatar: css`
    flex: none;
  `,
  date: css`
    font-size: 12px;
    color: ${token.colorTextDescription};
  `,
  desc: css`
    color: ${token.colorTextDescription};
    text-align: center;
  `,
  actions: css``,

  title: css`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    display: flex;
    align-items: center;
  `,
}));
