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
    height: 32px;
    padding: 10px;
    width: 100%;
    display: flex;
  `,
  button: css`
    border-radius: 8px;
    width: 12px;
    height: 12px;
    cursor: pointer;
  `,
  close: css`
    background-color: ${token['red-7']};
  `,
  min: css`
    background-color: ${token['yellow-7']};
  `,
  max: css`
    background-color: ${token['green-7']};
  `,

  content: css`
    display: flex;
    flex-direction: row;
    overflow-y: auto;
    width: 100%;
    flex-grow: 1;
  `,
  container: css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  `,
}));
