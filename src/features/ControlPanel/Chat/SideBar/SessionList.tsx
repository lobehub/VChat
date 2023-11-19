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
  const currentSession = useSessionStore((s) => sessionSelectors.currentSession(s), isEqual);
  const { styles } = useStyles();

  // TODO: 滚动到当前 agent

  return (
    <List
      dataSource={sessionList}
      renderItem={(item) => (
        <List.Item
          onClick={() => switchSession(item.agent)}
          className={classNames(styles.listItem, {
            [styles.active]: item.agent.dirname === currentSession?.agent.dirname,
          })}
          style={{ padding: 12 }}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.agent.avatar} />}
            title={item.agent.name}
            description={
              <Text style={{ width: 200 }} ellipsis>
                {item.agent.description}
              </Text>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default SessionList;
