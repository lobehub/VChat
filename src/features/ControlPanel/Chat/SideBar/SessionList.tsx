import { useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { List, Typography } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

const { Text } = Typography;

const useStyles = createStyles(({ css, token }) => ({
  listItem: css`
    &:hover {
      background-color: ${token.controlItemBgActiveHover};
      cursor: pointer;
    }
  `,
  active: css`
    background-color: ${token.colorPrimaryActive};
  `,
}));

const SessionList = () => {
  const { sessionList, setCurrentAgent, currentAgent } = useSessionStore();
  const { styles } = useStyles();

  // TODO: 滚动到当前 agent

  return (
    <List
      dataSource={sessionList}
      renderItem={(item) => (
        <List.Item
          onClick={() => setCurrentAgent(item.agent)}
          className={classNames(styles.listItem, {
            [styles.active]: item.agent.dirname === currentAgent?.dirname,
          })}
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
