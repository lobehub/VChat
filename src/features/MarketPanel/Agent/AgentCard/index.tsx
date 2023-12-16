import AgentInfo from '@/components/AgentInfo';
import { marketStoreSelectors, useMarketStore } from '@/store/market';
import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo, useState } from 'react';
import DownloadButton from './DownloadButton';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    height: 100% !important;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

const Header = () => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const [showAgentSidebar, activateAgent, deactivateAgent, currentAgentItem] = useMarketStore(
    (s) => [
      marketStoreSelectors.showSideBar(s),
      s.activateAgent,
      s.deactivateAgent,
      marketStoreSelectors.currentAgentItem(s),
    ],
  );

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      expand={showAgentSidebar}
      minWidth={240}
      mode={'fixed'}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useMarketStore.getState().currentAgentId);
          deactivateAgent();
        } else if (tempId) {
          activateAgent(tempId);
        }
      }}
      placement={'right'}
    >
      <AgentInfo
        agent={currentAgentItem}
        actions={[<DownloadButton url={currentAgentItem?.model} key="download" />]}
      />
    </DraggablePanel>
  );
};

export default memo(Header);
