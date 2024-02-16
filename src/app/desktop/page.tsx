'use client';

import Background from '@/app/desktop/Background';
import Header from '@/app/desktop/Header';
import Apps from './Apps';

const Desktop = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <Header />
      <div style={{ height: 'calc(100vh - 64px)' }}>
        <Apps />
      </div>
      <Background />
    </div>
  );
};

export default Desktop;
