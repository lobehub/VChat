import { TabsNav } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import Awake from './Awake';
import Model from './Model';
import Order from './Order';

const useStyles = createStyles(({ css }) => ({
  container: css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
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

interface VoiceProps {
  style?: React.CSSProperties;
  className?: string;
}

const Voice = (props: VoiceProps) => {
  const { theme, styles } = useStyles();
  const { style, className } = props;
  const [tab, setTab] = useState('awake');

  return (
    <div style={style} className={classNames(className, styles.container)}>
      <div style={{ paddingLeft: 24, paddingRight: 24, flexGrow: 1 }}>
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
                key: 'awake',
                label: '语音唤醒',
              },
              {
                key: 'order',
                label: '语音命令',
              },
              {
                key: 'model',
                label: '语言模型',
              },
            ]}
          />
        </Flexbox>
        {tab === 'awake' ? <Awake /> : null}
        {tab === 'order' ? <Order /> : null}
        {tab === 'model' ? <Model /> : null}
      </div>
    </div>
  );
};

export default Voice;
