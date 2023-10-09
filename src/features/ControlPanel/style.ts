import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  box: css`
    backdrop-filter: saturate(180%) blur(10px);
    background-color: ${token.colorFillTertiary};
    border: 1px solid #999;
    display: flex;
    flex-direction: column;
    border-radius: ${token.borderRadius}px;
    position: absolute;
    top: 25%;
    left: 25%;
    width: 1024px;
    height: 800px;
  `,
  header: css`
    border-bottom: 1px solid #999;
    height: 36px;
    width: 100%;
  `,
  content: css`
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    flex-grow: 1;
  `,
  container: css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  `,
}));
