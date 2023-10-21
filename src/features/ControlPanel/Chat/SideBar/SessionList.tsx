import { useSessionStore } from '@/store/session';
import { Avatar } from '@lobehub/ui';
import { List, Typography } from 'antd';

const { Text } = Typography;

const SessionList = () => {
  const { sessionList, setCurrentAgent } = useSessionStore();

  return (
    <List
      dataSource={sessionList}
      renderItem={(item) => (
        <List.Item onClick={() => setCurrentAgent(item.agent)}>
          <List.Item.Meta
            avatar={<Avatar src={item.agent.avatar} />}
            title={item.agent.name}
            description={
              <Text style={{ width: 200 }} ellipsis={{ tooltip: item.agent.description }}>
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
