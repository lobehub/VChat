import { DEFAULT_AGENTS } from '@/constants/agent';
import { deleteLocalAgent } from '@/services/agent';
import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useConfigStore } from '@/store/config';
import { useDanceStore } from '@/store/dance';
import { useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Popconfirm, Space, Tag, message } from 'antd';
import { memo } from 'react';
import { Center } from 'react-layout-kit';
import { useStyles } from './style';

const Header = () => {
  const { styles, theme } = useStyles();
  const [deactivateAgent, fetchLocalAgentList] = useAgentStore((s) => [
    s.deactivateAgent,
    s.fetchLocalAgentList,
  ]);
  const [setRolePanelOpen, setTab] = useConfigStore((s) => [s.setRolePanelOpen, s.setTab]);
  const setIsPlaying = useDanceStore((s) => s.setIsPlaying);
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));
  const switchSession = useSessionStore((s) => s.switchSession);

  const { avatar, name, description, agentId, homepage } = currentAgent || {};

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
    <Center className={styles.container} gap={16}>
      <Avatar
        avatar={avatar}
        background={theme.colorFillTertiary}
        className={styles.avatar}
        size={100}
      />
      <div className={styles.title}>
        {name}
        <Tag color="#108ee9" style={{ marginLeft: 8 }}>
          <a href={homepage} target="_blank">
            主页
          </a>
        </Tag>
      </div>
      <div className={styles.desc}>{description}</div>
      <Space>
        <Button
          onClick={() => {
            if (!currentAgent) return;
            switchSession(currentAgent.agentId);
            setIsPlaying(false);
            setTab('chat');
          }}
          type={'primary'}
        >
          开始聊天
        </Button>
        <Button onClick={openPanel}>编辑</Button>
        {DEFAULT_AGENTS.findIndex((item) => item.agentId === agentId) === -1 ? (
          <Popconfirm
            title="确定删除？"
            description="确定删除本地角色文件吗？"
            onConfirm={() => run(agentId)}
            okText="确定"
            cancelText="取消"
          >
            <Button loading={loading} danger>
              删除
            </Button>
          </Popconfirm>
        ) : null}
      </Space>
    </Center>
  );
};

export default memo(Header);
