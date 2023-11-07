import { deleteLocalAgent } from '@/services/agent';
import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useDanceStore } from '@/store/dance';
import { useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Popconfirm, Space, message } from 'antd';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

import { useConfigStore } from '@/store/config';
import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles, theme } = useStyles();
  const { deactivateAgent, fetchAgentList } = useAgentStore();
  const { setRolePanelOpen } = useConfigStore();
  const { setIsPlaying } = useDanceStore();
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));
  const { setCurrentAgent } = useSessionStore();

  const { avatar, name, description, dirname } = currentAgent;

  const { loading, run } = useRequest((dirname) => deleteLocalAgent(dirname), {
    manual: true,
    onSuccess: (data) => {
      const { success, errorMessage } = data;
      if (success) {
        message.success('删除成功');
        deactivateAgent();
        // retrive list
        fetchAgentList();
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
      <div className={styles.title}>{name}</div>
      <div className={styles.desc}>{description}</div>
      <Space>
        <Button
          onClick={() => {
            setCurrentAgent(currentAgent);
            setIsPlaying(false);
          }}
          type={'primary'}
        >
          加载
        </Button>
        <Button onClick={openPanel} type={'primary'}>
          编辑
        </Button>
        {dirname ? (
          <Popconfirm
            title="确定删除？"
            description="确定删除本地角色文件吗？"
            onConfirm={() => run(dirname)}
            okText="确定"
            cancelText="取消"
          >
            <Button loading={loading}>删除</Button>
          </Popconfirm>
        ) : null}
      </Space>
    </Center>
  );
});

export default Header;
