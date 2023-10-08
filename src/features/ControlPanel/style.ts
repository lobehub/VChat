import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  box: css`
    backdrop-filter: saturate(180%) blur(10px);
    background-color: ${token.colorFillTertiary};
    border: 1px solid #999;
    display: flex;
    border-radius: ${token.borderRadius}px;
    overflow-y: scroll;
    position: absolute;
    top: 25%;
    left: 25%;
    width: 1024px;
    height: 800px;
  `,
}));
