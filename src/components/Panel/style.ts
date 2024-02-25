import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  box: css`
    backdrop-filter: saturate(180%) blur(10px);
    background-color: ${token.colorBgContainer};
    border: 1px solid #999;
    display: flex;
    flex-direction: column;
    border-radius: ${token.borderRadius}px;
    position: fixed;
    width: 900px;
  `,
  header: css`
    border-bottom: 1px solid #999;
    height: 32px;
    cursor: move;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  swtich: css`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,
  title: css`
    flex: 1;
    text-align: center;
    font-weight: bold;
  `,
  extra: css`
    flex: 1;
  `,

  container: css`
    display: flex;
    height: 640px;
    flex-direction: row;
    flex-grow: 1;
  `,
  button: css`
    border-radius: 8px;
    width: 14px;
    height: 14px;
    margin-left: ${token.marginXS}px;
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
    height: 100%;
    width: 100%;
    flex-grow: 1;
  `,
}));
