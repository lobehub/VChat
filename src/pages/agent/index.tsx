import { useAgentStore } from '@/store/agent';
import { Card, List } from 'antd';

const { Meta } = Card;

const Agent = () => {
  const { setCurrentAgent, agentList } = useAgentStore();
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 12 }}>角色列表(所使用的模型均符合 Vroid 个人商业用途规范)</div>
      <List
        grid={{ gutter: 16, column: 4 }}
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
              <Meta title={item.cnName} description={item.description} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Agent;
