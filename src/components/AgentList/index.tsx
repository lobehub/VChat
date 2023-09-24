import { getAgentList } from '@/services/agent';
import { useAgentStore } from '@/store/agent';
import { useRequest } from 'ahooks';
import { Card, List, Typography } from 'antd';

const { Text } = Typography;

const { Meta } = Card;

const AgentList = () => {
  const { setCurrentAgent, agentList, setAgentList } = useAgentStore();

  const { loading, run } = useRequest(getAgentList, {
    onSuccess: (data) => {
      setAgentList(data);
    },
  });

  return (
    <List
      loading={loading}
      grid={{ gutter: 12, column: 5 }}
      dataSource={agentList}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            // eslint-disable-next-line @next/next/no-img-element,
            cover={<img src={item.cover} alt="cover" />}
            onClick={() => {
              setCurrentAgent(item);
            }}
          >
            <Meta
              title={item.cnName}
              description={
                <Text style={{ width: 200 }} ellipsis={{ tooltip: item.description }}>
                  {item.description}
                </Text>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default AgentList;
