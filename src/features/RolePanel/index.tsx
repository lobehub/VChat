import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import { TabsNav } from '@lobehub/ui';
import { useState } from 'react';
import Info from './Info';
import Role from './Role';
import Voice from './Voice';

import { useStyles } from './style';

interface RolePanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const RolePanel = (props: RolePanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [tab, setTab] = useState('info');
  const { setRolePanelOpen } = useConfigStore();

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setRolePanelOpen(false)}
      defaultCoordinates={{
        x: 320,
        y: 250,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <TabsNav
            activeKey={tab}
            onChange={(key) => {
              setTab(key);
            }}
            items={[
              {
                key: 'info',
                label: '基本信息',
              },
              {
                key: 'role',
                label: '角色设定',
              },
              {
                key: 'voice',
                label: '语音',
              },
            ]}
          />
        </div>
        <div className={styles.content}>
          {tab === 'info' ? <Info /> : null}
          {tab === 'role' ? <Role /> : null}
          {tab === 'voice' ? <Voice /> : null}
        </div>
      </div>
    </Panel>
  );
};

export default RolePanel;
