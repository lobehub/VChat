import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useMarketStore } from '@/store/market';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, List } from 'antd';
import { memo } from 'react';

const { Meta } = List.Item;

const AgentList = () => {
  const [activateAgent, agentList, agentLoading] = useMarketStore((s) => [
    s.activateAgent,
    s.agentList,
    s.agentLoading,
  ]);
  const [subscribed] = useAgentStore((s) => [agentListSelectors.subscribed(s)]);
  return (
    <List
      grid={{ gutter: 8, column: 4 }}
      dataSource={agentList}
      loading={agentLoading}
      renderItem={(item) => {
        const { avatar, name } = item?.meta;
        const isSubscribed = subscribed(item.agentId);
        return (
          <List.Item style={{ position: 'relative' }}>
            <Card
              hoverable
              // eslint-disable-next-line @next/next/no-img-element,
              cover={<img src={avatar} alt="cover" />}
              onClick={() => {
                activateAgent(item.agentId);
              }}
            >
              <Meta title={name} />
            </Card>
            {isSubscribed ? (
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ position: 'absolute', right: 8, top: 8, fontSize: 24 }}
              />
            ) : null}
          </List.Item>
        );
      }}
    />
  );
};

export default memo(AgentList);
