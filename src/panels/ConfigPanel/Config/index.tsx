import { TabsNav } from '@lobehub/ui';
import classNames from 'classnames';
import { memo, useState } from 'react';
import CommonConfig from './common';
import OpenAIConfig from './model/openai';
import { useStyles } from './style';

interface ConfigProps {
  style?: React.CSSProperties;
  className?: string;
}

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [tab, setTab] = useState('common');

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
              key: 'common',
              label: '通用设置',
            },
            {
              key: 'languageModel',
              label: '语言模型',
            },
          ]}
        />
      </div>
      <div className={styles.content}>
        {tab === 'languageModel' ? <OpenAIConfig /> : null}
        {tab === 'common' ? <CommonConfig /> : null}
      </div>
    </div>
  );
};

export default memo(Config);
