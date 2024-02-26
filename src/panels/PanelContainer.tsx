'use client';

import Panel from '@/components/Panel';
import { FOCUS_Z_INDEX, INITIAL_Z_INDEX } from '@/constants/common';
import { useConfigStore } from '@/store/config';
import { PanelKey } from '@/types/config';
import { PropsWithChildren } from 'react';

interface PanelContainerProps {
  style?: React.CSSProperties;
  className?: string;
  panelKey: PanelKey;
  title?: string;
}

const PanelContainer = (props: PropsWithChildren<PanelContainerProps>) => {
  const { style, className, panelKey, title, children } = props;
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      zIndex={panel[panelKey].zIndex}
      onFocus={() => setPanel(panelKey, { zIndex: FOCUS_Z_INDEX })}
      onBlur={() => setPanel(panelKey, { zIndex: INITIAL_Z_INDEX })}
      coordinates={panel[panelKey].coordinates}
      onCoordinatesChange={(coordinates) => setPanel(panelKey, { coordinates })}
      onClose={() => setPanel(panelKey, { open: false })}
      title={title}
    >
      {children}
    </Panel>
  );
};

export default PanelContainer;
