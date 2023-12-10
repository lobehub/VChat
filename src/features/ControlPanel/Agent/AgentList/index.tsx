import { useAgentStore } from '@/store/agent';
import { Card, List, Typography } from 'antd';
import { memo, useLayoutEffect } from 'react';

const { Text } = Typography;

const { Meta } = Card;

const AgentList = () => {
  const [agentList, activateAgent, loading, fetchAgentList] = useAgentStore((s) => [
    s.agentList,
    s.activateAgent,
    s.loading,
    s.fetchAgentList,
  ]);

  // const { loading } = useRequest(getLocalAgentList, {
  //   onSuccess: (data) => {
  //     setAgentList(data.agents);
  //   },
  // });

  useLayoutEffect(() => {
    fetchAgentList();
  }, [fetchAgentList]);

  return (
    <List
      loading={loading}
      grid={{ gutter: 8, column: 4 }}
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

export default memo(AgentList);
