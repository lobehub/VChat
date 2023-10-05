import { getAgentIndex } from '@/services/agent';
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

interface AgentIndexProps {
  reloadAgentList: () => void;
}

const AgentIndex = (props: AgentIndexProps) => {
  const { reloadAgentList } = props;
  const [agentList, setAgentList] = useState<AgentIndexItem[]>([]);

  const { loading } = useRequest(getAgentIndex, {
    onSuccess: (data) => {
      setAgentList(data.agents);
    },
  });

  return (
    <List
      loading={loading}
      dataSource={agentList}
      renderItem={(item) => (
        <List.Item
          actions={[
            <DownloadButton url={item.url} key={item.name} reloadAgentList={reloadAgentList} />,
          ]}
        >
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
