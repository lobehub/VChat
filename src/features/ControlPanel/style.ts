import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  box: css`
    background: #fff;
    border: 1px solid #999;
    border-radius: 3px;
    width: 180px;
    height: 180px;
    margin: 10px;
    padding: 10px;
    float: left;
  `,
}));
