import { createStyles } from 'antd-style';
import { rgba } from 'polished';

const DIALOG_WIDTH = 720;

export const useStyles = createStyles(({ css, token }) => ({
  dialog: css`
    width: ${DIALOG_WIDTH}px;
    backdrop-filter: saturate(180%) blur(10px);
    background-color: ${rgba(token.colorBgLayout, 0.8)};
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
    padding: ${token.paddingSM}px;
    margin-bottom: ${token.marginSM}px;
    position: fixed;
    left: 50%;
    margin-left: ${-DIALOG_WIDTH / 2}px;
    bottom: 64px;
  `,
}));
