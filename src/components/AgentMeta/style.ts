import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    align-items: center;
  `,
  content: css`
    margin-left: ${token.marginSM}px;
  `,
  desc: css`
    width: 480px;
    line-height: 18px;
    color: ${token.colorTextDescription};
  `,
  title: css`
    line-height: 18px;
    font-size: ${token.fontSize}px;
    font-weight: bold;
  `,
}));
