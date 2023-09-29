import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { Button } from 'antd';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles, theme } = useStyles();
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));
  const { setCurrentAgent } = useSessionStore();

  const { avatar, cnName, description } = currentAgent;

  return (
    <Center className={styles.container} gap={16}>
      <Avatar
        avatar={avatar}
        background={theme.colorFillTertiary}
        className={styles.avatar}
        size={100}
      />
      <div className={styles.title}>{cnName}</div>
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
    </Center>
  );
});

export default Header;
