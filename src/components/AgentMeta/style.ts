import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    align-items: center;
  `,
  content: css`
    margin-left: ${token.marginSM}px;
    line-height: 1;
  `,
  title: css`
    font-size: ${token.fontSize}px;
    line-height: 18px;
    font-weight: bold;
  `,
  desc: css`
    line-height: 18px;
    width: 480px;
    font-size: ${token.fontSizeSM}px;
    color: ${token.colorTextDescription};
  `,
}));
