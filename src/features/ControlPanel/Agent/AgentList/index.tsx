import { agentListSelectors, useAgentStore } from '@/store/agent';
import { useMarketStore } from '@/store/market';
import { Agent } from '@/types/agent';
import { GradientButton } from '@lobehub/ui';
import { Card, List, Typography } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

const { Text } = Typography;
const { Meta } = Card;

interface AgentListProps {
  title: string;
  loading: boolean;
  dataSource: Agent[];
}

const AgentList = (props: AgentListProps) => {
  const { title, loading, dataSource } = props;
  const [activateAgent, showAgentSidebar] = useAgentStore((s) => [
    s.activateAgent,
    agentListSelectors.showSideBar(s),
  ]);
  const [setMarketPanelOpen, setTab] = useMarketStore((s) => [s.setMarketPanelOpen, s.setTab]);

  return (
    <>
      <Flexbox style={{ marginBottom: 12 }} horizontal align="center" distribution="space-between">
        <h2>{title}</h2>
        <GradientButton
          onClick={() => {
            setMarketPanelOpen(true);
            setTab('agent');
          }}
          glow
          size="middle"
        >
          + 加好友
        </GradientButton>
      </Flexbox>
      <List
        loading={loading}
        grid={{ gutter: 8, column: showAgentSidebar ? 3 : 4 }}
        dataSource={dataSource}
        renderItem={(item) => {
          const { cover, name, description } = item.meta;
          return (
            <List.Item>
              <Card
                hoverable
                // eslint-disable-next-line @next/next/no-img-element,
                cover={<img src={cover} alt="cover" />}
                onClick={() => {
                  activateAgent(item.agentId);
                }}
              >
                <Meta
                  title={name}
                  description={
                    <Text style={{ width: 200 }} ellipsis={{ tooltip: description }}>
                      {description}
                    </Text>
                  }
                />
              </Card>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default memo(AgentList);
