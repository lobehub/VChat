import { deleteLocalAgent } from '@/services/agent';
import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles, theme } = useStyles();
  const { deactivateAgent } = useAgentStore();
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
      } else {
        message.error(errorMessage);
      }
    },
  });

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
      <Button
        block
        onClick={() => {
          setCurrentAgent(currentAgent);
        }}
        type={'primary'}
      >
        加载角色
      </Button>
      {dirname ? (
        <Button
          block
          onClick={() => {
            run(dirname);
          }}
          loading={loading}
        >
          删除
        </Button>
      ) : null}
    </Center>
  );
});

export default Header;
