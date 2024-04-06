import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  toolbar: css`
    position: absolute;
    display: flex;
    right: 24px;
    bottom: 50%;
  `,
  viewer: css`
    width: 100%;
    height: 100%;
    position: relative;
  `,
}));
