import { TabsNav } from '@lobehub/ui';
import classNames from 'classnames';
import { useState } from 'react';
import OpenAIConfig from './model/openai';
import { useStyles } from './style';

interface ConfigProps {
  style?: React.CSSProperties;
  className?: string;
}

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [tab, setTab] = useState('languageModel');

  return (
    <div style={style} className={classNames(styles.container, className)}>
      <div style={{ marginBottom: 12 }}>
        <TabsNav
          activeKey={tab}
          onChange={(key) => {
            setTab(key);
          }}
          items={[
            {
              key: 'languageModel',
              label: '语言模型',
            },
            {
              key: 'market',
              label: '商店设置',
            },
          ]}
        />
      </div>
      <div className={styles.content}>{tab === 'languageModel' ? <OpenAIConfig /> : null}</div>
    </div>
  );
};

export default Config;
