import { getAgentList } from '@/services/agent';
import { useAgentStore } from '@/store/agent';
import { ActionIcon } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Card, List, Space, Typography } from 'antd';
import { Loader2Icon } from 'lucide-react';

const { Text } = Typography;

const { Meta } = Card;

const Agent = () => {
  const { setCurrentAgent, agentList, setAgentList } = useAgentStore();

  const { loading, run } = useRequest(getAgentList, {
    onSuccess: (data) => {
      setAgentList(data);
    },
  });

  return (
    <div style={{ paddingLeft: 24, paddingRight: 24 }}>
      <Space style={{ marginTop: 12, marginBottom: 12 }}>
        角色列表
        <ActionIcon icon={Loader2Icon} onClick={run} loading={loading} title="重新加载" />
      </Space>
      <List
        loading={loading}
        grid={{ gutter: 12, column: 4 }}
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
    </div>
  );
};

export default Agent;
