import { useConfigStore } from '@/store/config';
import { useDanceStore } from '@/store/dance';
import { useMarketStore } from '@/store/market';
import { GradientButton } from '@lobehub/ui';
import { Card, List } from 'antd';
import { Flexbox } from 'react-layout-kit';

const { Meta } = Card;

const DanceList = () => {
  const [danceList, activateDance] = useDanceStore((s) => [s.danceList, s.activateDance]);
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
  const [setTab] = useMarketStore((s) => [s.setTab]);

  return (
    <>
      <Flexbox style={{ marginBottom: 12 }} horizontal align="center" distribution="space-between">
        <h2>订阅列表</h2>
        <GradientButton
          onClick={() => {
            openPanel('market');
            setTab('dance');
          }}
          glow
          size="middle"
        >
          + 订阅舞蹈
        </GradientButton>
      </Flexbox>
      <List
        grid={{ gutter: 8, column: 4 }}
        dataSource={danceList}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={
                // eslint-disable-next-line @next/next/no-img-element,
                <img src={item.thumb} alt="thumb" height={108} style={{ objectFit: 'cover' }} />
              }
              onClick={() => {
                activateDance(item.danceId);
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
