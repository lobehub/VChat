import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  apps: css`
    width: 420px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 48px);
    grid-template-rows: repeat(auto-fill, 48px);
    grid-auto-flow: column;
  `,
}));
