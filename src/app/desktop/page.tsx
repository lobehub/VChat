'use client';

import Background from '@/app/desktop/Background';
import Header from '@/app/desktop/Header';
import LivePanel from '@/app/desktop/LivePanel';
import Docker from './Docker';

const Desktop = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <Header />
      <div style={{ height: 'calc(100vh - 64px)' }}>
        <LivePanel />
      </div>
      <Docker />
      <Background />
    </div>
  );
};

export default Desktop;
