import { getDanceIndex } from '@/services/dance';
import { useRequest } from 'ahooks';
import { List, Typography } from 'antd';
import { useState } from 'react';
import DownloadButton from './DownloadButton';

const { Text } = Typography;

const { Meta } = List.Item;

interface AgentIndexItem {
  name: string;
  url: string;
  description: string;
  created: string;
}

const AgentIndex = () => {
  const [danceList, setDanceList] = useState<AgentIndexItem[]>([]);

  const { loading } = useRequest(getDanceIndex, {
    onSuccess: (data) => {
      setDanceList(data.dances);
    },
  });

  return (
    <List
      loading={loading}
      dataSource={danceList}
      renderItem={(item) => (
        <List.Item actions={[<DownloadButton url={item.url} key={item.name} />]}>
          <Meta
            title={item.name}
            description={
              <Text style={{ width: 600 }} ellipsis={{ tooltip: item.description }}>
                {item.description}
              </Text>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default AgentIndex;
