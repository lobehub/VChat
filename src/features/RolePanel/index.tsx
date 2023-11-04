import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import { TabsNav } from '@lobehub/ui';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import Awake from './Awake';
import Model from './Model';
import Order from './Order';

import { useStyles } from './style';

interface RolePanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const RolePanel = (props: RolePanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [tab, setTab] = useState('model');
  const { setRolePanelOpen } = useConfigStore();

  console.log('RolePanel', style, className);

  return (
    <Panel style={style} className={className} onClose={() => setRolePanelOpen(false)}>
      <div className={styles.content}>
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
                key: 'model',
                label: '语言模型',
              },
              {
                key: 'awake',
                label: '语音唤醒',
              },
              {
                key: 'order',
                label: '语音命令',
              },
            ]}
          />
        </Flexbox>
        {tab === 'awake' ? <Awake /> : null}
        {tab === 'order' ? <Order /> : null}
        {tab === 'model' ? <Model /> : null}
      </div>
    </Panel>
  );
};

export default RolePanel;
