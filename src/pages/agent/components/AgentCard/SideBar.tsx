import { agentListSelectors, useAgentStore } from '@/store/agent';
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
  const [showAgentSidebar, activateAgent, deactivateAgent] = useAgentStore((s) => [
    agentListSelectors.showSideBar(s),
    s.activateAgent,
    s.deactivateAgent,
  ]);

  return (
    <DraggablePanel
      className={styles.drawer}
      classNames={{
        content: styles.content,
      }}
      expand={showAgentSidebar}
      minWidth={400}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useAgentStore.getState().currentIdentifier);
          deactivateAgent();
        } else if (tempId) {
          activateAgent(tempId);
        }
      }}
      placement={'right'}
    >
      <DraggablePanelContainer
        style={{
          flex: 'none',
          height: 'calc(100vh - 64px)',
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
