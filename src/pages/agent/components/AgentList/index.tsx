import { useAgentStore } from '@/store/agent';
import { Card, List, Typography } from 'antd';

const { Text } = Typography;

const { Meta } = Card;

interface AgentListProps {
  loading: boolean;
}

const AgentList = (props: AgentListProps) => {
  const { loading = false } = props;
  const { agentList, activateAgent } = useAgentStore();

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
              activateAgent(item.name);
            }}
          >
            <Meta
              title={item.name}
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
