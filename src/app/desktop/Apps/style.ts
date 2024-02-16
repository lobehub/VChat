import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  apps: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-template-rows: repeat(auto-fill, 102px);
    grid-auto-flow: column;
    height: 100%;
  `,
}));
