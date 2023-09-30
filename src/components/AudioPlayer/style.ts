import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    position: fixed;
    bottom: 0;
    border-top: 1px solid ${token.colorBorderSecondary};
    left: 64px;
    backdrop-filter: saturate(180%) blur(10px);
    background-color: ${token.colorFillTertiary};
    width: calc(100vw - 64px);
    z-index: 12;
    height: 96px;
  `,
  player: css`
    display: flex;
    align-items: center;
  `,
  top: css`
    display: flex;

    align-items: center;
    justify-content: space-between;
  `,
  name: css`
    flex: 1;
    justify-content: flex-start;
  `,
  control: css`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
  right: css`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  volume: css`
    display: flex;
    align-items: center;
  `,
}));

export { useStyles };
