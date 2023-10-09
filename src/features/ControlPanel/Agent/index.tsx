import AgentCard from '@/components/AgentCard';
import AgentIndex from '@/components/AgentIndex';
import AgentList from '@/components/AgentList';
import { useAgentStore } from '@/store/agent';
import { ActionIcon, GridBackground, TabsNav } from '@lobehub/ui';
import { Space } from 'antd';
import { createStyles } from 'antd-style';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import styled from 'styled-components';

const View = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 500px;
`;

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
    <View>
      <div style={{ paddingLeft: 24, paddingRight: 24, flexGrow: 1 }}>
        <Center>
          <h1 className={styles.title}>Select Your Virtual Idol</h1>
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
                /* @ts-ignore */
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
    </View>
  );
};

export default Agent;
