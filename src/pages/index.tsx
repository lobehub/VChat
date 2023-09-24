import { getAgentList } from '@/services/agent';
import { useAgentStore } from '@/store/agent';
import { useRequest } from 'ahooks';
import { Button, Card, List } from 'antd';

const { Meta } = Card;

const Agent = () => {
  const { setCurrentAgent, agentList, setAgentList } = useAgentStore();

  const { loading, run } = useRequest(getAgentList, {
    onSuccess: (data) => {
      setAgentList(data);
    },
  });

  return (
    <div style={{ padding: 24 }}>
      <List
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            角色列表
            <Button type="primary" onClick={run} size="small">
              重新加载角色列表
            </Button>
          </div>
        }
        loading={loading}
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
