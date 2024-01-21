import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: row;
    background-color: ${token.colorBgContainer};
    height: 100%;
    width: 100%;
    flex-grow: 1;
    position: relative;
  `,
}));
