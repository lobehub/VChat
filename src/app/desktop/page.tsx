'use client';

import Background from '@/app/desktop/Background';
import Dialog from '@/app/desktop/Dialog';
import Header from '@/app/desktop/Header';
import RoleSelect from '@/app/desktop/RoleSelect';
import VirtualIdol from '@/app/desktop/VirtualIdol';
import { apps } from '@/app/desktop/apps';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import Docker from './Docker';

const Desktop = () => {
  const [panel] = useConfigStore((s) => [s.panel]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <Header />
      <div style={{ height: 'calc(100vh - 64px - 64px)' }}>
        <VirtualIdol />
        {apps.map((app) => {
          const open = panel[app.key as PanelKey].open;
          const min = panel[app.key as PanelKey].min;
          const component = app.component;
          return open ? (
            <div key={app.key} style={{ display: min ? 'none' : 'flex' }}>
              {component}
            </div>
          ) : null;
        })}
      </div>
      <Docker />
      <RoleSelect />
      <Dialog />
      <Background />
    </div>
  );
};

export default Desktop;
