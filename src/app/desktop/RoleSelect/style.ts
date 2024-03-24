import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  roleSelect: css`
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fill, 64px);
    grid-template-rows: repeat(auto-fill, 64px);
    grid-auto-flow: row;
    position: fixed;
    left: 0;
    top: 64px;
    height: calc(100vh - 64px - 56px);
    overflow: auto;
    margin: 64px;
  `,
  active: css`
    border: 2px solid ${token.colorPrimary};
  `,
}));
