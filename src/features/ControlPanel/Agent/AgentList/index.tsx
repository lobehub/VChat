import { useAgentStore } from '@/store/agent';
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
  const [activateAgent] = useAgentStore((s) => [s.activateAgent]);
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
          打开商店
        </GradientButton>
      </Flexbox>
      <List
        loading={loading}
        grid={{ gutter: 8, column: 4 }}
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
                  activateAgent(name);
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
