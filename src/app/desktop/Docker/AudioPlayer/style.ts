import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    width: 420px;
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
    flex-grow: 2;
    margin-left: ${token.marginXS}px;
  `,
  name: css`
    width: 108px;
    font-size: ${token.fontSizeSM}px;
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
