import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    box-sizing: content-box;
    width: 640px;
    height: 64px;
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
