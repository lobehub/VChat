import { useMarketStore } from '@/store/market';
import { Card, List, Typography } from 'antd';
import { memo } from 'react';

const { Text } = Typography;

const { Meta } = List.Item;

const AgentList = () => {
  const [activateAgent, agentList, agentLoading] = useMarketStore((s) => [
    s.activateAgent,
    s.agentList,
    s.agentLoading,
  ]);
  return (
    <List
      grid={{ gutter: 8, column: 4 }}
      dataSource={agentList}
      loading={agentLoading}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            // eslint-disable-next-line @next/next/no-img-element,
            cover={<img src={item.cover} alt="cover" />}
            onClick={() => {
              activateAgent(item.agentId);
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

export default memo(AgentList);
