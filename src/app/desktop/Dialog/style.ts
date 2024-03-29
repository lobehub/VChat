import { createStyles } from 'antd-style';
import { rgba } from 'polished';

const DIALOG_WIDTH = 800;

export const useStyles = createStyles(({ css, token }) => ({
  dialog: css`
    width: ${DIALOG_WIDTH}px;
    //backdrop-filter: saturate(180%) blur(10px);
    // background-color: ${rgba(token.colorBgLayout, 0.8)};
    position: fixed;
    left: 50%;
    margin-left: ${-DIALOG_WIDTH / 2}px;
    bottom: 64px;
  `,
}));
