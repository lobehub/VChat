import { useAgentStore } from '@/store/agent';
import { ActionIcon, GridBackground, TabsNav } from '@lobehub/ui';
import { Space } from 'antd';
import { createStyles } from 'antd-style';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';
import AgentCard from './components/AgentCard';
import AgentIndex from './components/AgentIndex';
import AgentList from './components/AgentList';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 56px;
    font-weight: 800;
  `,
}));

const Agent = () => {
  const { theme, styles } = useStyles();
  const [tab, setTab] = useState('installed');
  const { fetchAgentList, agentList, loading } = useAgentStore();

  return (
    <Flexbox flex={1} height={'calc(100vh - 64px)'} horizontal>
      <div style={{ paddingLeft: 24, paddingRight: 24, width: 1024, margin: ' 0 auto' }}>
        <Center>
          <h1 className={styles.title}>Find & Chat with Virtual Idol</h1>
          <GridBackground
            animation
            className={styles.background}
            colorFront={theme.colorText}
            random
          />
        </Center>
        <Flexbox
          style={{ marginBottom: 12 }}
          horizontal
          align="center"
          distribution="space-between"
        >
          <TabsNav
            activeKey={tab}
            onChange={(key) => {
              setTab(key);
            }}
            items={[
              {
                key: 'installed',
                label: '已下载',
              },
              {
                key: 'index',
                label: '在线列表',
              },
            ]}
          />
          {tab === 'installed' ? (
            <Space>
              共 {agentList.length} 项{' '}
              <ActionIcon
                icon={Loader2Icon}
                loading={loading}
                title="重新加载"
                onClick={fetchAgentList}
              />
            </Space>
          ) : null}
        </Flexbox>
        {tab === 'installed' ? <AgentList /> : null}
        {tab === 'index' ? <AgentIndex /> : null}
      </div>
      <AgentCard />
    </Flexbox>
  );
};

export default Agent;
