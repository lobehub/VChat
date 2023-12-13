import { useAgentStore } from '@/store/agent';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { List, Typography } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import { memo } from 'react';

const { Text } = Typography;

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    &:hover {
      cursor: pointer;
    }
  `,
  active: css`
    background-color: ${token.controlItemBgActiveHover};
  `,
}));

interface SessionListProps {
  filter?: string;
}

const SessionList = (props: SessionListProps) => {
  const { filter } = props;
  const [switchSession] = useSessionStore((s) => [s.switchSession]);
  const sessionListIds = useSessionStore((s) => sessionSelectors.sessionListIds(s), isEqual);
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s), isEqual);
  const getAgentById = useAgentStore((s) => s.getAgentById);
  const { styles } = useStyles();

  // TODO: 滚动到当前 agent

  return (
    <List
      dataSource={sessionListIds.filter((agentId) => {
        const agent = getAgentById(agentId);
        return !filter || agent?.name?.includes(filter) || agent?.description?.includes(filter);
      })}
      renderItem={(agentId) => {
        const agent = getAgentById(agentId);
        return (
          <List.Item
            onClick={() => switchSession(agentId)}
            className={classNames(styles.listItem, {
              [styles.active]: agentId === currentAgent?.agentId,
            })}
            style={{ padding: 12 }}
          >
            <List.Item.Meta
              avatar={<Avatar src={agent?.avatar} />}
              title={agent?.name}
              description={<Text ellipsis>{agent?.description}</Text>}
            />
          </List.Item>
        );
      }}
    />
  );
};

export default memo(SessionList);
