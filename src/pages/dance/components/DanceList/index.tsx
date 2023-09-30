import { getDanceList } from '@/services/dance';
import { useDanceStore } from '@/store/dance';
import { useRequest } from 'ahooks';
import { Card, List, Typography } from 'antd';

const { Text } = Typography;

const { Meta } = Card;

const AgentList = () => {
  const { danceList, setDanceList, activateDance } = useDanceStore();

  const { loading, run } = useRequest(getDanceList, {
    onSuccess: (data) => {
      setDanceList(data);
    },
  });

  return (
    <List
      loading={loading}
      grid={{ gutter: 12, column: 5 }}
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

export default AgentList;
