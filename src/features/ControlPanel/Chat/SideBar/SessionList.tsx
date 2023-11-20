import { useAgentStore } from '@/store/agent';
import { sessionSelectors, useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { List, Typography } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { isEqual } from 'lodash-es';

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

const SessionList = () => {
  const { sessionList, switchSession } = useSessionStore();
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s), isEqual);
  const getAgentById = useAgentStore((s) => s.getAgentById);
  const { styles } = useStyles();

  // TODO: 滚动到当前 agent

  return (
    <List
      dataSource={sessionList}
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
              description={
                <Text style={{ width: 200 }} ellipsis>
                  {agent?.description}
                </Text>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};

export default SessionList;
