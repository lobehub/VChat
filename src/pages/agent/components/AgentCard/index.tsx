import { agentListSelectors, useAgentStore } from '@/store/agent';
import { Avatar } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Typography } from 'antd';
import { useRef } from 'react';
import { Flexbox } from 'react-layout-kit';
import SideBar from './SideBar';

import { useStyles } from './style';
const { Paragraph } = Typography;

const AgentCard = () => {
  const { styles, theme } = useStyles();
  const ref = useRef(null);
  const isHovering = useHover(ref);
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));

  const { avatar, cnName, description } = currentAgent;

  return (
    <div>
      <SideBar>
        <Flexbox className={styles.inner} gap={8} ref={ref}>
          <Avatar
            animation={isHovering}
            avatar={avatar}
            background={theme.colorFillTertiary}
            className={styles.avatar}
            size={56}
          />
          <Paragraph className={styles.title} ellipsis={{ rows: 1, tooltip: cnName }}>
            {cnName}
          </Paragraph>
          <Paragraph className={styles.desc} ellipsis={{ rows: 2, tooltip: description }}>
            {description}
          </Paragraph>
        </Flexbox>
      </SideBar>
    </div>
  );
};

export default AgentCard;
