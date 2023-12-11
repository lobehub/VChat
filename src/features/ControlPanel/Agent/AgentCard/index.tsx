import AgentInfo from '@/components/AgentInfo';
import { deleteLocalAgent } from '@/services/agent';
import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useConfigStore } from '@/store/config';
import { useDanceStore } from '@/store/dance';
import { useSessionStore } from '@/store/session';
import { DraggablePanel } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Popconfirm, message } from 'antd';
import { createStyles } from 'antd-style';
import { memo, useState } from 'react';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

const Header = () => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const [showAgentSidebar, activateAgent, deactivateAgent, fetchLocalAgentList] = useAgentStore(
    (s) => [
      agentListSelectors.showSideBar(s),
      s.activateAgent,
      s.deactivateAgent,
      s.fetchLocalAgentList,
    ],
  );
  const [setRolePanelOpen, setTab] = useConfigStore((s) => [s.setRolePanelOpen, s.setTab]);
  const setIsPlaying = useDanceStore((s) => s.setIsPlaying);
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));
  const switchSession = useSessionStore((s) => s.switchSession);

  const { agentId } = currentAgent || {};

  const { loading, run } = useRequest((agentId) => deleteLocalAgent(agentId), {
    manual: true,
    onSuccess: (data) => {
      const { success, errorMessage } = data;
      if (success) {
        message.success('删除成功');
        deactivateAgent();
        // retrive list
        fetchLocalAgentList();
      } else {
        message.error(errorMessage);
      }
    },
  });

  function openPanel() {
    setRolePanelOpen(true);
  }

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
      <AgentInfo
        agent={currentAgent}
        actions={[
          <Button
            key="chat"
            onClick={() => {
              if (!currentAgent) return;
              switchSession(currentAgent.agentId);
              setIsPlaying(false);
              setTab('chat');
            }}
            type={'primary'}
          >
            开始聊天
          </Button>,
          <Button onClick={openPanel} key="edit">
            编辑
          </Button>,
          <Popconfirm
            title="确定删除？"
            description="确定删除本地角色文件吗？"
            onConfirm={() => run(agentId)}
            okText="确定"
            key="delete"
            cancelText="取消"
          >
            <Button loading={loading} danger>
              删除
            </Button>
          </Popconfirm>,
        ]}
      />
    </DraggablePanel>
  );
};

export default memo(Header);
