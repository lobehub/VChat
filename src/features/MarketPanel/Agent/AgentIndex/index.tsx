import { DEFAULT_AGENTS } from '@/constants/agent';
import { useMarketStore } from '@/store/market';
import { Card, List, Typography } from 'antd';
import { memo } from 'react';
import DownloadButton from '../AgentCard/DownloadButton';

const { Text } = Typography;

const { Meta } = List.Item;

const AgentIndex = () => {
  const activateAgent = useMarketStore((s) => s.activateAgent);
  return (
    <List
      grid={{ gutter: 8, column: 4 }}
      dataSource={DEFAULT_AGENTS}
      renderItem={(item) => (
        <List.Item actions={[<DownloadButton url={item.model} key={item.name} />]}>
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

export default memo(AgentIndex);
