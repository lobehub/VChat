import { useDanceStore } from '@/store/dance';
import { Card, List } from 'antd';
import { useEffect } from 'react';

const { Meta } = Card;

const DanceList = () => {
  const { danceList, fetchDanceList, activateDance, loading } = useDanceStore();

  useEffect(() => {
    fetchDanceList();
  }, [fetchDanceList]);

  return (
    <List
      loading={loading}
      grid={{ gutter: 8, column: 4 }}
      dataSource={danceList}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            // eslint-disable-next-line @next/next/no-img-element,
            cover={<img src={item.thumb} alt="thumb" height={108} style={{ objectFit: 'cover' }} />}
            onClick={() => {
              activateDance(item.name);
            }}
          >
            <Meta title={item.name} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default DanceList;
