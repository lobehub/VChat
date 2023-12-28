import { danceListSelectors, useDanceStore } from '@/store/dance'; // 更改这里
import { marketStoreSelectors, useMarketStore } from '@/store/market';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Card, List } from 'antd';
import { memo } from 'react';

const { Meta } = List.Item;

const DanceList = () => {
  // 更改这里
  const [activateDance, danceList, danceLoading, showDanceSidebar] = useMarketStore((s) => [
    // 更改这里
    s.activateDance, // 更改这里
    s.danceList, // 更改这里
    s.danceLoading, // 更改这里
    marketStoreSelectors.showSideBar(s),
  ]);
  const [subscribed] = useDanceStore((s) => [danceListSelectors.subscribed(s)]); // 更改这里
  return (
    <List
      grid={{ gutter: 8, column: showDanceSidebar ? 3 : 4 }} // 更改这里
      dataSource={danceList} // 更改这里
      loading={danceLoading} // 更改这里
      renderItem={(item) => {
        const { avatar, name } = item?.meta;
        const isSubscribed = subscribed(item.danceId); // 更改这里
        return (
          <List.Item style={{ position: 'relative' }}>
            <Card
              hoverable
              // eslint-disable-next-line @next/next/no-img-element,
              cover={<img src={avatar} alt="cover" />}
              onClick={() => {
                activateDance(item.danceId); // 更改这里
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

export default memo(DanceList); // 更改这里
