import { useAgentStore } from '@/store/agent';
import { Agent } from '@/types/agent';
import { Card, List, Typography } from 'antd';
import { memo } from 'react';

const { Text } = Typography;

const { Meta } = Card;

interface AgentListProps {
  title: string;
  loading: boolean;
  dataSource: Agent[];
}

const AgentList = (props: AgentListProps) => {
  const { title, loading, dataSource } = props;
  const [activateAgent] = useAgentStore((s) => [s.activateAgent]);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <h2>{title}</h2>
      </div>
      <List
        loading={loading}
        grid={{ gutter: 8, column: 4 }}
        dataSource={dataSource}
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
    </>
  );
};

export default memo(AgentList);
