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
  const [sessionList, switchSession] = useSessionStore((s) => [s.sessionList, s.switchSession]);
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s), isEqual);
  const getAgentById = useAgentStore((s) => s.getAgentById);
  const { styles } = useStyles();

  // TODO: 滚动到当前 agent

  return (
    <List
      dataSource={sessionList.filter((item) => {
        const agent = getAgentById(item.agentId);
        return !filter || agent?.name?.includes(filter) || agent?.description?.includes(filter);
      })}
      renderItem={(item) => {
        const agent = getAgentById(item.agentId);
        return (
          <List.Item
            onClick={() => switchSession(item.agentId)}
            className={classNames(styles.listItem, {
              [styles.active]: item.agentId === currentAgent?.agentId,
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
