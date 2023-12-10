import { agentListSelectors, useAgentStore } from '@/store/agent';
import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { PropsWithChildren, memo, useState } from 'react';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

const SideBar = ({ children }: PropsWithChildren) => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const [showAgentSidebar, activateAgent, deactivateAgent] = useAgentStore((s) => [
    agentListSelectors.showSideBar(s),
    s.activateAgent,
    s.deactivateAgent,
  ]);

  return (
    <DraggablePanel
      className={styles.content}
      expand={showAgentSidebar}
      minWidth={240}
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
      {children}
    </DraggablePanel>
  );
};

export default memo(SideBar);
