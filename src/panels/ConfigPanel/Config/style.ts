import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  container: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
  `,

  content: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    flex-grow: 1;
  `,
}));
