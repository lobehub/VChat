import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ReactNode, memo } from 'react';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

// eslint-disable-next-line react/display-name
const SideBar = memo<{ children?: ReactNode }>(({ children }) => {
  const { styles } = useStyles();

  return (
    <DraggablePanel className={styles.content} minWidth={240} mode={'fixed'} placement={'left'}>
      {children}
    </DraggablePanel>
  );
});

export default SideBar;
