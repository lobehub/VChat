import { downloadGithubAgent, getAgentIndex } from '@/services/agent';
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
  const [agentList, setAgentList] = useState<AgentIndexItem[]>([]);

  const { loading } = useRequest(getAgentIndex, {
    onSuccess: (data) => {
      setAgentList(data.agents);
    },
  });

  const { loading: downloading } = useRequest(downloadGithubAgent);

  return (
    <List
      loading={loading}
      dataSource={agentList}
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
