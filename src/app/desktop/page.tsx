'use client';

import Background from '@/app/desktop/Background';
import Docker from '@/app/desktop/Docker';
import Header from '@/app/desktop/Header';

const Desktop = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <Header />
      <Docker />
      <Background />
    </div>
  );
};

export default Desktop;
