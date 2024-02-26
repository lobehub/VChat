import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  canvas: css`
    pointer-events: none;
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%) scale(1.5);
    width: 600px;
    height: 400px;
    opacity: 0.2;
    filter: blur(69px);
    will-change: transform;
    background: linear-gradient(
      135deg,
      ${token.purple} 0%,
      ${token.blue} 30%,
      ${token.red} 70%,
      ${token.cyan} 100%
    );
    background-size: 200% 200%;
    animation: glow 10s ease infinite;

    @keyframes glow {
      0% {
        background-position: 0 -100%;
      }

      50% {
        background-position: 200% 50%;
      }

      100% {
        background-position: 0 -100%;
      }
    }
  `,
}));
