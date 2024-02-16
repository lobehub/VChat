import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  apps: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, 110px);
    grid-template-rows: repeat(auto-fill, 110px);
    grid-auto-flow: column;
    height: 100%;
  `,
}));
