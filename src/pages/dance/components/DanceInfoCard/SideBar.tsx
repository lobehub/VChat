import { danceListSelectors, useDanceStore } from '@/store/dance';
import { DraggablePanel, DraggablePanelBody, DraggablePanelContainer } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { ReactNode, memo, useState } from 'react';

const useStyles = createStyles(({ css, token, stylish }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  drawer: css`
    background: ${token.colorBgLayout};
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
  noScrollbar: stylish.noScrollbar,
}));

// eslint-disable-next-line react/display-name
const SideBar = memo<{ children?: ReactNode }>(({ children }) => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const [showDanceSidebar, activateDance, deactivateDance] = useDanceStore((s) => [
    danceListSelectors.showSideBar(s),
    s.activateDance,
    s.deactivateDance,
  ]);

  return (
    <DraggablePanel
      className={styles.drawer}
      classNames={{
        content: styles.content,
      }}
      expand={showDanceSidebar}
      minWidth={400}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useDanceStore.getState().currentIdentifier);
          deactivateDance();
        } else if (tempId) {
          activateDance(tempId);
        }
      }}
      placement={'right'}
    >
      <DraggablePanelContainer
        style={{
          flex: 'none',
          height: 'calc(100vh - 64px - 96px)',
          minWidth: 400,
        }}
      >
        <DraggablePanelBody
          className={styles.noScrollbar}
          style={{ padding: 0, position: 'relative' }}
        >
          {children}
        </DraggablePanelBody>
      </DraggablePanelContainer>
    </DraggablePanel>
  );
});

export default SideBar;
