import { buildUrl } from '@/utils/buildUrl';
import { Header as LobeHeader } from '@lobehub/ui';
import { Space } from 'antd';
import { memo } from 'react';

const Header = () => {
  return (
    <LobeHeader
      logo={
        <Space align="center" size={16}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={buildUrl('/logo.png')} width={48} height={48} alt="logo" />
          <span style={{ fontSize: 22, fontWeight: 'bolder' }}>Vidol.Chat</span>
        </Space>
      }
    />
  );
};

export default memo(Header);
