import { useConfigStore } from '@/store/config';
import { useDanceStore } from '@/store/dance';
import { GradientButton } from '@lobehub/ui';
import { Card, List } from 'antd';
import { Flexbox } from 'react-layout-kit';

const { Meta } = Card;

const DanceList = () => {
  const [danceList, activateDance] = useDanceStore((s) => [s.danceList, s.activateDance]);
  const [setPanel] = useConfigStore((s) => [s.setPanel]);

  return (
    <>
      <Flexbox style={{ marginBottom: 12 }} horizontal align="center" distribution="space-between">
        <h2>舞蹈列表</h2>
        <GradientButton
          onClick={() => {
            setPanel('market', { open: true });
          }}
          glow
          size="middle"
        >
          打开商店
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
