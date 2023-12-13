import { useDanceStore } from '@/store/dance';
import { useMarketStore } from '@/store/market';
import { GradientButton } from '@lobehub/ui';
import { Card, List } from 'antd';
import { useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

const { Meta } = Card;

const DanceList = () => {
  const { danceList, fetchDanceList, activateDance, loading } = useDanceStore();
  const [setMarketPanelOpen, setTab] = useMarketStore((s) => [s.setMarketPanelOpen, s.setTab]);

  useEffect(() => {
    fetchDanceList();
  }, [fetchDanceList]);

  return (
    <>
      <Flexbox style={{ marginBottom: 12 }} horizontal align="center" distribution="space-between">
        <h2>舞蹈列表</h2>
        <GradientButton
          onClick={() => {
            setMarketPanelOpen(true);
            setTab('dance');
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
        dataSource={danceList}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              // eslint-disable-next-line @next/next/no-img-element,
              cover={
                <img src={item.thumb} alt="thumb" height={108} style={{ objectFit: 'cover' }} />
              }
              onClick={() => {
                activateDance(item.name);
              }}
            >
              <Meta title={item.name} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default DanceList;
