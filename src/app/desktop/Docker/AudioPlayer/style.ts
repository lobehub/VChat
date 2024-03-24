import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
  container: css`
    box-sizing: content-box;
    height: 64px;
  `,
  player: css`
    display: flex;
    align-items: center;
  `,
  left: css`
    display: flex;
    align-items: center;
  `,
  top: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  name: css`
    justify-content: flex-start;
  `,
  right: css`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
}));

export { useStyles };
