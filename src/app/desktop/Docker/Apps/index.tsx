'use client';

import Application from '@/components/Application';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import { apps } from '../../page';
import { useStyles } from './style';

const Apps = () => {
  const [openPanel] = useConfigStore((s) => [s.openPanel]);
  const { styles } = useStyles();

  return (
    <div className={styles.apps}>
      {apps.map((app) => {
        return (
          <Application
            key={app.key}
            avatar={app.avatar}
            icon={app.icon}
            name={app.label}
            onClick={() => {
              if (app.component) {
                openPanel(app.key as PanelKey);
              } else if (app.link) {
                window.open(app.link);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default Apps;
