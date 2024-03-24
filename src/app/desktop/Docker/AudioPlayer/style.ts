import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    height: 64px;
  `,
  player: css`
    display: flex;
    align-items: center;
  `,
  spin: css`
    @keyframes rotate-animation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    animation: rotate-animation 20s linear infinite;
  `,
  info: css`
    display: flex;
    align-items: center;
  `,
  content: css`
    display: flex;
    flex-direction: column;
    margin-left: ${token.marginMD}px;
  `,
  name: css`
    width: 140px;
    justify-content: flex-start;
  `,
  controller: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  right: css`
    display: flex;
    align-items: center;
  `,
}));

export { useStyles };
