import { danceListSelectors, useDanceStore } from '@/store/dance';
import { marketStoreSelectors, useMarketStore } from '@/store/market';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, List } from 'antd';
import { memo } from 'react';

const { Meta } = List.Item;

const DanceList = () => {
  const [activateDance, danceList, danceLoading, showDanceSidebar] = useMarketStore((s) => [
    s.activateDance,
    s.danceList,
    s.danceLoading,
    marketStoreSelectors.showDanceSideBar(s),
  ]);
  const [subscribed] = useDanceStore((s) => [danceListSelectors.subscribed(s)]);
  return (
    <List
      grid={{ gutter: 8, column: showDanceSidebar ? 3 : 4 }}
      dataSource={danceList}
      loading={danceLoading}
      renderItem={(item) => {
        const isSubscribed = subscribed(item.danceId);
        return (
          <List.Item style={{ position: 'relative' }}>
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

export default memo(DanceList);
