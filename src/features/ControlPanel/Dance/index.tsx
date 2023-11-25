import { useDanceStore } from '@/store/dance';
import { ActionIcon, GridBackground, TabsNav } from '@lobehub/ui';
import { Space } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';
import AudioPlayer from './AudioPlayer';
import DanceIndex from './DanceIndex';
import DanceInfoCard from './DanceInfoCard';
import DanceList from './DanceList';

const useStyles = createStyles(({ css }) => ({
  container: css`
    position: relative;
    display: flex;
    padding-bottom: 96px;
    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
  content: css`
    padding-left: 24px;
    padding-right: 24px;
    flex-grow: 1;
    overflow-y: auto;
  `,
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 36px;
    font-weight: 800;
  `,
}));

interface DanceProps {
  style?: React.CSSProperties;
  className?: string;
}

const Dance = (props: DanceProps) => {
  const { style, className } = props;
  const [tab, setTab] = useState('installed');
  const { danceList, fetchDanceList, loading } = useDanceStore();
  const { theme, styles } = useStyles();
  return (
    <div style={style} className={classNames(className, styles.container)}>
      <div className={styles.content}>
        <Center>
          <h1 className={styles.title}>找到你心仪的舞蹈</h1>
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
                label: '我的舞蹈',
              },
              {
                key: 'index',
                label: '在线列表',
              },
            ]}
          />
          {tab === 'installed' ? (
            <Space>
              共 {danceList.length} 项{' '}
              <ActionIcon
                /* @ts-ignore */
                icon={Loader2Icon}
                loading={loading}
                title="重新加载"
                onClick={() => fetchDanceList()}
              />
            </Space>
          ) : null}
        </Flexbox>
        {tab === 'installed' ? <DanceList /> : null}
        {tab === 'index' ? <DanceIndex /> : null}
      </div>
      <DanceInfoCard />
      <AudioPlayer
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default Dance;
